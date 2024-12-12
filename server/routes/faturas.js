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

    router.get('/conta/:id_conta', (req, res) => {
        const idConta = req.params.id_conta;  // Obtém o id da conta da URL
    
        connection.query('SELECT * FROM faturas WHERE conta_id = ?', [idConta], (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao consultar as faturas', error: err });
          }
    
          if (results.length === 0) {
            return res.status(404).json({ message: 'Faturas não encontradas para essa conta' });
          }
    
          res.json(results);  // Retorna as faturas da conta em formato JSON
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
    
    // Rota para buscar uma fatura específica
    router.get('/:faturaId', (req, res) => {
      const faturaId = req.params.faturaId;
      connection.query('SELECT * FROM faturas WHERE id_fatura = ?', [faturaId], (err, result) => { 
          if (err) { 
              return res.status(500).json({ message: 'Erro ao consultar a fatura', error: err }); 
          } 
          if (result.length === 0) { 
              return res.status(404).json({ message: 'Fatura não encontrada' }); 
          } 
          res.json(result[0]); // Retorna a fatura em formato JSON
      });
    });

    // Rota para atualizar uma fatura existente
    router.put('/:id', (req, res) => {
      const { id } = req.params; // Obtém o ID da fatura a ser atualizada a partir dos parâmetros da URL
      const { mes_referente, valor_fatura, status_fatura, data_fechamento, data_vencimento, conta_id } = req.body; // Obtém os novos dados da fatura do corpo da requisição
      const query = 'UPDATE faturas SET mes_referente = ?, valor_fatura = ?, status_fatura = ?, data_fechamento = ?, data_vencimento = ?, conta_id = ? WHERE id_fatura = ?';

      connection.query(query, [mes_referente, valor_fatura, status_fatura, data_fechamento, data_vencimento, conta_id, id], (err, results) => {
          if (err) {
              console.error("Erro ao atualizar a fatura", err);  // Exibe o erro no console
              return res.status(500).json({ message: 'Erro ao atualizar a fatura', error: err });
          }
          if (results.affectedRows === 0) {
              return res.status(404).json({ message: 'Fatura não encontrada' }); // Caso nenhuma linha seja afetada, a fatura não foi encontrada
          }
          console.log("Fatura atualizada com sucesso", results); // Verifica o retorno do banco
          res.status(200).json({ message: 'Fatura atualizada com sucesso' });
      });
    });


  return router;
};