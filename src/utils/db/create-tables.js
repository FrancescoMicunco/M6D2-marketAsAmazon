import fs from "fs-extra";
import path from "path";
import pool from './connect.js'


const createTables = async() => {
    try {
        const filePath = path.join(process.cwd(), "src/utils/db/tables.sql");
        console.log("THIS IS THE FILE PATH", filePath)
        const fileAsBuffer = await fs.readFile(filePath)
        const fileAsString = fileAsBuffer.toString();
        await pool.query(fileAsString);
        console.log("table created")

    } catch (error) {
        console.log(error)
    }
};

(async() => { await createTables(); })();