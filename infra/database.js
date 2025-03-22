import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "local"
  });
  //Comando assíncrono, precisa ir até o banco para realizar a conexão
  await client.connect();

  const res = await client.query(queryObject);
  await client.end();
  return res;
}

export default {
  query: query
}