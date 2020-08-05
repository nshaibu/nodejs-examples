let qs = require('querystring');

exports.sindHTML = function(res, html) {  // send HTML response
	res.setHeader("Content-Type", "text/html");
	res.setHeader("Content-Length", Buffer.byteLength(html));
	res.end(html);
}

exports.parseReceivedData = function(req, callback) {  //Parse POST data
	let body = "";
	req.setEncoding("utf8");
	req.on("data", function (chunk) {body += chunk;});
	req.on("end", function () {
		let data = qs.parse(body);
		callback(data);
	})
}

exports.actionForm = function(id, path, label) { //Render form
	let html = `<form method='post' action='${path}'>
				<input type='hidden' name='id' value='${path}'>
				<input type='submit' value='${label}'>
				</form>`

	return html;
};

exports.add = function (db, req, res) {
	exports.parseReceivedData(req, function (work) {
		db.query(
			`insert into work (hours, date, description)
			 values (${work.hours}, ${work.date}, ${work.description})`,
			  function (err) {
			  	if (err) throw err;
			  	exports.show(db, res);
			  });
	});
};

exports.delete = function(db, req, res) {
	exports.parseReceivedData(req, function (work) {
		db.query(`delete from work where id = ${work.id}`, function (err) {
			if (err) throw err;
			exports.show(db, res);
		});
	});
};

exports.archive = function (db, req, res) {
	exports.parseReceivedData(req, function (work) {
		db.query(`update work set archived = 1 where id=${work.id}`, function (err) {
			if (err) throw err;
			exports.show(db, res);
		})
	});
};

exports.show = function (db, res, showArchived) {
	let query = `select * from work where archived=${showArchived?1:0} order by date desc`;
	db.query(query, function (err, rows) {
		if (err) throw err;
		let html = (showArchived) ? '' : '<a href="/archived">archived Work</a>';
		html += exports.workHitlistHtml(rows);
		html += exports.workFormHtml();
		exports.send(res, html); 
	});
};

exports.showArchived = function (db, res) {
	exports.show(db, res, true);
};

exports.workHitlistHtml = function(rows) {
	let html = '<table>';
	for (let i in rows) {
		html += '<tr>';
		html += '<td>' + rows[i].date + '</tr>';
		html += '<td>' + rows[i].hours + '</tr>';
		html += '<td>' + rows[i].description + '</tr>';
		if (!rows[i].archived) {
			html += '<td>' + exports.workArhiveForm(rows[i].id) + '</tr>';
		}
		html += '<td>' + exports.workDeleteForm(rows[i].id) + '</tr>';
		html += '</tr>';
	}
	html += '</table>';
	return html;
};

exports.workFormHtml = function() {
	let html = `<form method="post" action="/">
				<p>Date (YYYY-MM-DD): <br/> <input name='date' type='date'></p>
				<p>Hours worked: <br/> <input name='hours' type='text'></p>
				<p>Description: <br/><textarea name="description"></textarea></p>
				<input type='submit' value='add'>
				</form>`;
	return html;	
};

exports.workArhiveForm = function(id) {
	return exports.actionForm(id, '/archive', 'Archive');
};

exports.workDeleteForm = function (id) {
	return exports.actionForm(id, '/delete', 'Delete');
};
