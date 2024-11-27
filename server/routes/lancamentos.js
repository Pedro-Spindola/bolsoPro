const express = require('express');
const router = express.Router();

// Recebe a conexão como parâmetro
module.exports = (connection) => {

    // Rota para listar todas as faturas
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM lancamentos', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar as lancamento', error: err });
        }
        res.json(results);  // Retorna as contas em formato JSON
        });
    });

    // Rota para adicionar uma nova conta
    router.post('/', (req, res) => {
        const { tipo_lancamento, descricao, valor, data_lancamento, quantidade_parcelas, id_conta, id_fatura, id_categoria, id_subcategoria } = req.body;
        const query = 'INSERT INTO lancamentos (tipo_lancamento, descricao, valor, data_lancamento, quantidade_parcelas, id_conta, id_fatura, id_categoria, id_subcategoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
        connection.query(query, [tipo_lancamento, descricao, valor, data_lancamento, quantidade_parcelas, id_conta, id_fatura, id_categoria, id_subcategoria], (err, results) => {
            if (err) {
                console.error("Erro ao adicionar a fatura", err);  // Exibe o erro no console'1
                return res.status(500).json({ message: 'Erro ao adicionar a lancamento', error: err });
            }
            console.log("Resultado da inserção", results); // Verifica o retorno do banco
            res.status(201).json({ message: 'Lancamento criada com sucesso', id: results.insertId });
        });
    }); 
    
  return router;
};