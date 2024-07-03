const sqlite3 = require('sqlite3');

exports.db = new sqlite3.Database('./controllers/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos..');
});

