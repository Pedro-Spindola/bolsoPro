const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const contasRoutes = require('./routes/contas');
const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const faturasRoutes = require('./routes/faturas');
const lancamentosRoutes = require('./routes/lancamentos');

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1', // ou o host do seu banco de dados
  port: 3306,            // porta do MySQL, 3306 é a padrão
  user: 'Pedro', // seu usuário do MySQL
  password: 'Pedro99#', // sua senha do MySQL
  database: 'bolsoPro' // nome do seu banco de dados
});

app.use(cors({ origin: 'http://localhost:5173' }));

// Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

// Middleware para aceitar JSON
app.use(express.json());

// Usando as rotas de contas
app.use('/api/contas', contasRoutes(connection));
// Usando as rotas de categorias
app.use('/api/categorias', categoriasRoutes(connection));
// Usando as rotas de subcategorias
app.use('/api/subcategorias', subcategoriasRoutes(connection));
// Usando as rotas de faturas
app.use('/api/faturas', faturasRoutes(connection));
// Usando as rotas de lancamentos
app.use('/api/lancamentos', lancamentosRoutes(connection));

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
