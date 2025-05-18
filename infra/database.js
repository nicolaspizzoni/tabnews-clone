import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  });
  //Comando assíncrono, precisa ir até o banco para realizar a conexão
  await client.connect();

  try {
    const res = await client.query(queryObject);
    return res;
  } catch (error) {
    console.error(error)
  } finally {
    await client.end();
  }
}

export default {
  query: query
}