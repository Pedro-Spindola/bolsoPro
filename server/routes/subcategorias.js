const express = require('express');
const router = express.Router();

// Recebe a conexão como parâmetro
module.exports = (connection) => {

    // Rota para listar todas as subcategorias
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM subcategorias', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar as subcategorias', error: err });
        }
        res.json(results);  // Retorna as contas em formato JSON
        });
    });

  return router;
};