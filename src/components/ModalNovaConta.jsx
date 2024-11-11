import React, { useEffect, useState } from 'react';
import styles from "./ModalNovaConta.module.css"
import PropTypes from 'prop-types';

const ModalNovaConta = ({onClose}) => {

    const [isCartaoCreditoDisponivel, setIsCartaoCreditoDisponivel] = useState(false);
    const [saldo, setSaldo] = useState("");
    
    const [minhasContas, setMeusFilmes] = useState([])

    function adicionarNovaConta(NewCont){

        fetch('http://localhost:5000/contas', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(NewCont)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            setMeusFilmes([...minhasContas, data]);
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Função para formatar o valor no campo de input
    const handleChange = (event) => {
      let valor = event.target.value;
      valor = valor.replace(/\D/g, ""); // Remover todos os caracteres não numéricos, exceto vírgula

      if (valor.length > 2) {
        valor = valor.slice(0, -2) + "," + valor.slice(-2); // Adicionar a vírgula para separar os centavos
      }
      valor = valor.replace(/(\d)(?=(\d{3})+(\,|$))/g, "$1."); // Adicionar ponto para separar os milhares
      setSaldo(valor);
    };

    useEffect(() => {
        let limiteDisponivel = document.getElementById("limiteDisponivel");
        let dataFechamento = document.getElementById("dataDeFechamentoDaFatura");
        let dataVencimento = document.getElementById("dataDeVencimento");

        function limparInputs() {
            limiteDisponivel.value = "";
            dataFechamento.value = "";
            dataVencimento.value = "";
        };
        limparInputs();
    }, [isCartaoCreditoDisponivel]);

    const handleCheckboxChange = (event) => {
        setIsCartaoCreditoDisponivel(event.target.checked);
    };

    // Button Adicionar
    const handleSubmitNovaConta = (event) => {
        event.preventDefault();
        const nome = document.getElementById("nomeDaConta").value;
        const saldoDaConta = parseFloat(saldo.replace(/\./g, "").replace(",", "."));
        const valorInvestimento = parseFloat(document.getElementById("valorInvestido").value);
        const cartaoDeCredito = document.getElementById("cartaoDeCredito").checked;
        const limiteDisponivel = parseFloat(document.getElementById("limiteDisponivel").value);
        const dataFechamento = parseInt(document.getElementById("dataDeFechamentoDaFatura").value);
        const dataVencimento = parseInt(document.getElementById("dataDeVencimento").value);

        if (!nome || nome.trim() === "") {
            console.log("O nome da conta é obrigatório.");
            return;
        }
        if (saldoDaConta == null || saldoDaConta < 0) {
            console.log("O saldo da conta é obrigatório, e o valor deverá ser positivo.");
            return;
        }
        if (valorInvestimento == null || valorInvestimento < 0) {
            console.log("O valor de investimento da conta é obrigatório, e o valor deverá ser positivo.");
            return;
        }
        if (cartaoDeCredito) {
            if (limiteDisponivel == null || limiteDisponivel < 0) {
                console.log("O limite do cartão é obrigatório, e o valor deverá ser positivo.");
                return;
            }

            if (!dataFechamento || dataFechamento < 1 || dataFechamento > 28) {
                console.log("A data de fechamento cartão é obrigatório, e o valor deverá valido.");
                return;
            }

            if (!dataVencimento || dataVencimento < 1 || dataVencimento > 28) {
                console.log("A data de vencimento cartão é obrigatório, e o valor deverá valido.");
                return;
            }
        }

        const novaConta = {
            nome: nome,
            icone: "",
            saldo: saldoDaConta,
            investimentos: valorInvestimento,
            cartao_credito: cartaoDeCredito,
            limite_cartao: limiteDisponivel,
            fechamento_cartao: dataFechamento,
            vencimento_cartao: dataVencimento
        };
        console.log(novaConta)
        adicionarNovaConta(novaConta);

        console.log("Cartão adicionado com sucesso. ;)")
        onClose();
    }

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <h1>Nova Conta</h1>
            <label htmlFor="nomeDaConta">Nome:</label>
            <input type="text" id="nomeDaConta"/>
            <label htmlFor="saldoDaConta">Saldo:</label>
            <input type="text" id="saldoDaConta" onChange={handleChange} value={saldo}/>
            <label htmlFor="valorInvestido">Investimentos:</label>
            <input type="text" id="valorInvestido" />
            <input type="checkbox" id="cartaoDeCredito" checked={isCartaoCreditoDisponivel} onChange={handleCheckboxChange}/>
            <label htmlFor="cartaoDeCredito">Cartão de Credito.</label>
            <div className={`${styles.limiteDisponivel} ${ isCartaoCreditoDisponivel ? styles.on : ''}`}>
                <label htmlFor="limiteDisponivel">Limite do Cartão</label>
                <input type="text" id="limiteDisponivel" />
                <label htmlFor="dataDeFechamentoDaFatura">Data de Fechamento: (dia)</label>
                <input type="text" id="dataDeFechamentoDaFatura" />
                <label htmlFor="dataDeVencimento">Data de Vencimento: (dia)</label>
                <input type="text" id="dataDeVencimento" />
            </div>
            <div className={styles.boxButton}>
                <button onClick={handleSubmitNovaConta}>Adicionar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

ModalNovaConta.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ModalNovaConta