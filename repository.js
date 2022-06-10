const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root'
});

client.connect();

async function getPessoas() {
  const { rows } = await client.query('SELECT * FROM pessoas');

  return rows;
}

async function getPessoaPorId(id) {
  const { rows } = await client.query('SELECT * from pessoas WHERE id = $1', [id]);

  return rows[0];
}

async function criarPessoa(pessoa) {
  const { rows } = await client.query('INSERT INTO pessoas (name, age) values ($1, $2)', [pessoa.name, pessoa.age])

  return rows[0];
}

async function deletarPessoaPorId(id) {
  await client.query('DELETE FROM pessoas where id = $1', [id]);
}

module.exports = {
  getPessoas,
  getPessoaPorId,
  criarPessoa,
  deletarPessoaPorId
}