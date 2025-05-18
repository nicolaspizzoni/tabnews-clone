import database from "infra/database"

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const queryServerVersion = await database.query("SHOW server_version;");
  const serverVersion = queryServerVersion.rows[0].server_version;

  const queryMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = queryMaxConnections.rows[0].max_connections;

  // const databaseName = req.query.databaseName;
  const databaseName = process.env.POSTGRES_DB;
  const queryOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName]
  });
  const openedConnections = queryOpenedConnections.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections
      }
    }
  })
}

export default status