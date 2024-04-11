const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost', // Your MySQL host
  user: 'premiert_premierHydrogenadmin', // Your MySQL username
  password: '+gGGs[vL9CwW', // Your MySQL password
  database: 'premiert_hydrogenbus' // Your database name
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    } else {
      console.log('Connected to MySQL as ID ' + db.threadId);
    }
  });

  db.on('error', err => {
    console.error('MySQL error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnect if the connection is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect(); // Initial connection

module.exports = db;