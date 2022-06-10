const express = require('express');
const { getPessoas, getPessoaPorId, criarPessoa, deletarPessoaPorId } = require('./repository')

const app = express();

app.use(express.json());

app.get('/pessoas', async (req, res) => {
  const pessoas = await getPessoas();

  return res.json(pessoas);
});

app.get('/pessoas/:id', async (req, res) => {
  const { id } = req.params
  const pessoa = await getPessoaPorId(id);

  if (!pessoa) {
    return res.status(404).send({
      message: 'Pesosa não encontrada'
    });
  }

  return res.json(pessoa);
})

app.post('/pessoas', async (req, res) => {
  const { name , age } = req.body;

  const pessoa = await criarPessoa({ name, age })

  return res.json(pessoa);
})

app.delete('/pessoas/:id', async (req, res) => {
  const { id } = req.params;

  await deletarPessoaPorId(id);
  return res.status(204).send();
})

app.listen(3000, () => {
  console.log('Aplicação rodando');
})