import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: parseInt(process.env.DB_PORT),
});

async function main() {
  const tablesResult = await pool.query(`
    SELECT tablename 
    FROM pg_catalog.pg_tables 
    WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
  `);
  
  for (const row of tablesResult.rows) {
    const table = row.tablename;
    console.log(`\nTable: ${table}`);
    const colsResult = await pool.query(`
      SELECT column_name, data_type, character_maximum_length, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1;
    `, [table]);
    for (const col of colsResult.rows) {
      console.log(`  ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'null' : 'not null'})`);
    }
  }
  process.exit(0);
}

main().catch(console.error);
