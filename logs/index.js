const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const logs = [];


const adicionarLog = (tipo) => {
  const dataHora = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  logs.push({
    id: uuidv4(),
    tipo_evento: tipo,
    data_hora: dataHora
  });
  console.log(`Log registrado: ${tipo} em ${dataHora}`);
};


app.post('/eventos', (req, res) => {
  const { tipo } = req.body;
  if (!tipo) {
    return res.status(400).send({ msg: 'Tipo de evento é obrigatório!' });
  }

  adicionarLog(tipo);
  res.status(200).send({ msg: 'Log registrado!' });
});


app.get('/logs', (req, res) => {
  res.status(200).send(logs);
});


app.listen(8000, () => {
  console.log('Microsserviço de logs ativo. Porta 8000');
});
