import fs from "fs-extra";
import path from "path";
import pool from './connect.js'

const createTables = async() => {
    try {
        const fileAsBuffer = await fs.readFile(path.join(process.cwd(), "src/utils/db/tables.sql"))
        const fileAsString = fileAsBuffer.toString();
        await pool.query(fileAsString);
        console.log("table created")

    } catch (error) {
        console.log("error creating tables")
    }
};

(async() => { await createTables(); })();