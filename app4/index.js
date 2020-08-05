let http = require('http');
let task = require('./lib/task');
let mysql = require('mysql');

let db = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: 'admin',
	database: 'timetrack'
});

let server = http.createServer(function (req, res) {
	switch(req.method) {
		case 'POST':
			switch(req.url) {
				case '/':
					task.add(db, req, res);
					break;
				case '/archive':
					task.archive(db, req, res);
					break;
				case '/delete':
					task.delete(db, req, res);
					break;
			}
			break;
		case 'GET':
			switch (req.url) {
				case '/':
					task.show(db, res);
					break;
				case '/archived':
					task.showArchived(db, res);
					break;
			}
			break;
	}
});

db.query("create table if not exists work ("
	+ "id int(10) not null auto_increment,"
	 + "hours decimal(5,2) default 0, "
	 + "date date,"
	 + "archived int(1) default 0,"
	 + "description longtext,"
	 + "primary key(id))",
	 function (err) {
	 	if (err) throw err;
	 	server.listen(4000, () => console.log("Server running on port 4000"));
	 });
