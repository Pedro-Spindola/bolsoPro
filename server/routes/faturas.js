const express = require('express');
const router = express.Router();

// Recebe a conexão como parâmetro
module.exports = (connection) => {

    // Rota para listar todas as faturas
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM faturas', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar as faturas', error: err });
        }
        res.json(results);  // Retorna as contas em formato JSON
        });
    });

    // Rota para adicionar uma nova conta
    router.post('/', (req, res) => {
        const { mes_referente, valor_fatura, status_fatura, data_fechamento, data_vencimento, conta_id } = req.body;
        const query = 'INSERT INTO faturas (mes_referente, valor_fatura, status_fatura, data_fechamento, data_vencimento, conta_id) VALUES (?, ?, ?, ?, ?, ?)';
    
        connection.query(query, [mes_referente, valor_fatura, status_fatura, data_fechamento, data_vencimento, conta_id], (err, results) => {
            if (err) {
                console.error("Erro ao adicionar a fatura", err);  // Exibe o erro no console'1
                return res.status(500).json({ message: 'Erro ao adicionar a fatura', error: err });
            }
            console.log("Resultado da inserção", results); // Verifica o retorno do banco
            res.status(201).json({ message: 'Fatura criada com sucesso', id: results.insertId });
        });
    }); 
    
  return router;
};