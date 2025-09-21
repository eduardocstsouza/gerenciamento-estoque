const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3001;


const swaggerDocument = YAML.load('./src/swagger.yaml');

const authRoutes = require('./routes/authRoutes');
const produtosRoutes = require('./routes/produtosRoutes')
const transacoesRoutes = require('./routes/transacoesRoutes')
const fornecedoresRoutes = require('./routes/fornecedoresRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('API de gerenciamento de estoque está rodando!');
});

app.use('/api', authRoutes);
app.use('/api', produtosRoutes);
app.use('/api', transacoesRoutes);
app.use('/api', fornecedoresRoutes);
app.use('/api', usuariosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});