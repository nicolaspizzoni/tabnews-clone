test("GET api/v1/status should return status code 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status?databaseName=local_database")
  expect(response.status).toBe(200)

  const responseBody = await response.json();
  expect(responseBody).toBeDefined();

  const updatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(updatedAt)

  const versionDatabase = responseBody.dependencies.database.version;
  expect(versionDatabase).toBe('16.0');

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toBe(100);

  const openedConnections = responseBody.dependencies.database.opened_connections;
  expect(openedConnections).toBe(1);
})

it("should test for SQL Injection", async () => {
  //Injeção SQL ao fechar primeira query e lançar nova fazendo o back levar 4s na requisição
  await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4) --")
})