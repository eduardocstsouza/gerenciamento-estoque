const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const authRoutes = require('./routes/authRoutes');
const produtosRoutes = require('./routes/produtosRoutes')
const transacoesRoutes = require('./routes/transacoesRoutes')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API de gerenciamento de estoque está rodando!');
});

app.use('/api', authRoutes);
app.use('/api', produtosRoutes);
app.use('/api', transacoesRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});