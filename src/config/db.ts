import mysql from 'mysql2/promise';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from './constants';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

(async () => {
    try {
        const { connection } = await pool.getConnection();
        console.info('db connected on', connection.config.host);
    } catch (error: any) {
        throw new Error(error.message);
    }
})();
export default pool;
