// connect to database
const pg = require('pg');

const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'to_do_app',
    max: 10,
    idleTimeoutMillis: 3000
});

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('connect', (error) => {
    console.log('error with postgresql pool', error);

});

module.exports = pool;