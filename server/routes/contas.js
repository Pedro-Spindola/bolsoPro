const express = require('express');
const router = express.Router();

// Recebe a conexão como parâmetro
module.exports = (connection) => {

    // Rota para listar todas as contas
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM contas', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar as contas', error: err });
        }
        res.json(results);  // Retorna as contas em formato JSON
        });
    });

    // Rota para adicionar uma nova conta
    router.post('/', (req, res) => {
        const { nome_banco, saldo_conta, investimento_conta, cartao_credito, limite_cartao, fechamento_cartao, vencimento_cartao } = req.body;
   
        const query = 'INSERT INTO contas (nome_banco, saldo_conta, investimento_conta, cartao_credito, limite_cartao, fechamento_cartao, vencimento_cartao) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
        connection.query(query, [nome_banco, saldo_conta, investimento_conta, cartao_credito, limite_cartao, fechamento_cartao, vencimento_cartao], (err, results) => {
            if (err) {
                console.error("Erro ao adicionar a conta", err);  // Exibe o erro no console'1
                return res.status(500).json({ message: 'Erro ao adicionar a conta', error: err });
            }
            console.log("Resultado da inserção", results); // Verifica o retorno do banco
            res.status(201).json({ message: 'Conta criada com sucesso', id: results.insertId });
        });
    });   

    router.put('/:id_conta', (req, res) => {
        const { id_conta } = req.params;
        const { nome_banco, saldo_conta, investimento_conta, cartao_credito, limite_cartao, fechamento_cartao, vencimento_cartao } = req.body;
    
        const query = 'UPDATE contas SET nome_banco = ?, saldo_conta = ?, investimento_conta = ?, cartao_credito = ?, limite_cartao = ?, fechamento_cartao = ?, vencimento_cartao = ? WHERE id_contas = ?';
        connection.query(query, [nome_banco, saldo_conta, investimento_conta, cartao_credito, limite_cartao, fechamento_cartao, vencimento_cartao, id_conta], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar conta', err);
                return res.status(500).json({ message: 'Erro ao atualizar conta', error: err });
            }
            res.status(200).json({ message: 'Conta atualizada com sucesso', results });
        });
    });    

  return router;
};

