import database from "infra/database"

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log("database return ", result.rows)
  res.status(200).json({ chave: "são acima da média" })
}

export default status