import React, { useEffect, useState } from 'react';
import styles from "./ModalNovaConta.module.css"
import PropTypes from 'prop-types';

const ModalNovaConta = ({onClose, contaEdit}) => {

    const [isCartaoCreditoDisponivel, setIsCartaoCreditoDisponivel] = useState(false);
    const [saldo, setSaldo] = useState("");
    const [investimento, setInvestimento] = useState("");
    const [limite, setLimite] = useState("");
    const [fechamento, setFechamento] = useState("");
    const [vencimento, setVencimento] = useState("");
    const [nomeBanco, setNomeBanco] = useState("");
    const [idConta, setIdConta] = useState(null);

    function adicionarNovaConta(NewCont) {
        fetch("http://127.0.0.1:3000/api/contas", {
            method: "POST", // Enviando dados para adicionar
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(NewCont) // Envia o objeto como JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha ao adicionar a conta.");
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            console.log("Conta adicionada com sucesso:", data);
        })
        .catch(error => {
            console.error("Erro ao adicionar a conta:", error);
        });
    }

    function contaEditada(NewCont, idCont) {
        const id = idCont; // Pegando o id da conta que foi editada
        fetch(`http://127.0.0.1:3000/api/contas/${id}`, { // Incluindo o ID na URL
            method: "PUT", // Método para editar
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(NewCont) // Envia o objeto da conta editada
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha ao adicionar a conta.");
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            console.log("Conta adicionada com sucesso:", data);
        })
        .catch(error => {
            console.error("Erro ao adicionar a conta:", error);
        });
    }
    
    const handleChangeNomeBanco = (event) => {
        setNomeBanco(event.target.value);
    };

    // Função para formatar o valor no campo de input
    const handleChangeValor = (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, ""); // Remover todos os caracteres não numéricos, exceto vírgula

        if (valor.length > 2) {
            valor = valor.slice(0, -2) + "," + valor.slice(-2); // Adicionar a vírgula para separar os centavos
        }
        valor = valor.replace(/(\d)(?=(\d{3})+(\,|$))/g, "$1."); // Adicionar ponto para separar os milhares
        setSaldo(valor);
    };

    const handleChangeInvestimento = (event) =>{
        let valor = event.target.value;
        valor = valor.replace(/\D/g, ""); // Remover todos os caracteres não numéricos, exceto vírgula

        if (valor.length > 2) {
            valor = valor.slice(0, -2) + "," + valor.slice(-2); // Adicionar a vírgula para separar os centavos
        }
        valor = valor.replace(/(\d)(?=(\d{3})+(\,|$))/g, "$1."); // Adicionar ponto para separar os milhares
        setInvestimento(valor);
    };

    const handleChangeLimiteDisponivel = (event) =>{
        let valor = event.target.value;
        valor = valor.replace(/\D/g, ""); // Remover todos os caracteres não numéricos, exceto vírgula

        if (valor.length > 2) {
            valor = valor.slice(0, -2) + "," + valor.slice(-2); // Adicionar a vírgula para separar os centavos
        }
        valor = valor.replace(/(\d)(?=(\d{3})+(\,|$))/g, "$1."); // Adicionar ponto para separar os milhares
        setLimite(valor);
    };

    const handleChangeFechamento = (event) => {
        let valor = event.target.value;
        valor = valor.replace(/[^0-9]/g, "");

        if (valor && (valor < 1 || valor > 28)) {
            valor = "";
        }
        setFechamento(valor);
    };   
    
    const handleChangeVencimento = (event) => {
        let valor = event.target.value;
        valor = valor.replace(/[^0-9]/g, "");

        if (valor && (valor < 1 || valor > 28)) {
            valor = "";
        }
        setVencimento(valor);
    };   

    useEffect(() => {
        if (contaEdit) {
            setNomeBanco(contaEdit.nome_banco);
            setIdConta(contaEdit.id_contas);
            setSaldo(contaEdit.saldo_conta);
            setInvestimento(contaEdit.investimento_conta)
            if (contaEdit.cartao_credito === 1) {
                setIsCartaoCreditoDisponivel(!!contaEdit.cartao_credito);
                setLimite(contaEdit.limite_cartao);
                setFechamento(contaEdit.fechamento_cartao);
                setVencimento(contaEdit.vencimento_cartao);
            }        
        }
      }, []);

    const handleCheckboxChange = (event) => {
        setIsCartaoCreditoDisponivel(event.target.checked);
        setLimite("");
        setFechamento("");
        setVencimento("");
    };

    // Button Adicionar
    const handleSubmitNovaConta = (event) => {
        event.preventDefault();
        try {
            const nome = document.getElementById("nomeDaConta").value;
            const saldoDaConta = isNaN(parseFloat(saldo.replace(/\./g, "").replace(",", "."))) ? 0 : parseFloat(saldo.replace(/\./g, "").replace(",", "."));
            const valorInvestimento = isNaN(parseFloat(document.getElementById("valorInvestido").value)) ? 0 : parseFloat(document.getElementById("valorInvestido").value);
            const cartaoDeCredito = document.getElementById("cartaoDeCredito").checked;
            const limiteDisponivel = isNaN(parseFloat(document.getElementById("limiteDisponivel").value)) ? 0 : parseFloat(document.getElementById("limiteDisponivel").value);
            const dataFechamento = isNaN(parseInt(document.getElementById("dataDeFechamentoDaFatura").value)) ? null : parseInt(document.getElementById("dataDeFechamentoDaFatura").value);
            const dataVencimento = isNaN(parseInt(document.getElementById("dataDeVencimento").value)) ? null : parseInt(document.getElementById("dataDeVencimento").value);


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

            // Criando objeto novaConta para enviar ao backend
            
            const novaConta = {
                nome_banco: nome,  // As variáveis no backend devem corresponder às variáveis enviadas aqui
                saldo_conta: saldoDaConta,
                investimento_conta: valorInvestimento,
                cartao_credito: cartaoDeCredito,
                limite_cartao: limiteDisponivel,
                fechamento_cartao: dataFechamento,
                vencimento_cartao: dataVencimento
            };

            if(idConta == null){
                adicionarNovaConta(novaConta);
                console.log(novaConta);
                console.log("Cartão adicionado com sucesso. ;)");
            } else{
                contaEditada(novaConta, idConta);
                console.log(novaConta);
                console.log("Cartão editada com sucesso. ;)");
            }
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <h1>Nova Conta</h1>
            <label htmlFor="nomeDaConta">Nome:</label>
            <input type="text" id="nomeDaConta" onChange={handleChangeNomeBanco} value={nomeBanco}/>
            <label htmlFor="saldoDaConta">Saldo:</label>
            <input type="text" id="saldoDaConta" onChange={handleChangeValor} value={saldo}/>
            <label htmlFor="valorInvestido">Investimentos:</label>
            <input type="text" id="valorInvestido" onChange={handleChangeInvestimento} value={investimento}/>
            <input type="checkbox" id="cartaoDeCredito" checked={isCartaoCreditoDisponivel} onChange={handleCheckboxChange}/>
            <label htmlFor="cartaoDeCredito">Cartão de Credito.</label>
            <div className={`${styles.limiteDisponivel} ${ isCartaoCreditoDisponivel ? styles.on : ''}`}>
                <label htmlFor="limiteDisponivel">Limite do Cartão</label>
                <input type="text" id="limiteDisponivel" onChange={handleChangeLimiteDisponivel} value={limite}/>
                <label htmlFor="dataDeFechamentoDaFatura">Data de Fechamento: (dia)</label>
                <input type="text" id="dataDeFechamentoDaFatura" onChange={handleChangeFechamento} value={fechamento}/>
                <label htmlFor="dataDeVencimento">Data de Vencimento: (dia)</label>
                <input type="text" id="dataDeVencimento" onChange={handleChangeVencimento} value={vencimento}/>
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
    onClose: PropTypes.func.isRequired,
    contaEdit: PropTypes.shape({
        id_contas: PropTypes.number,
        nome_banco: PropTypes.string,
        icon_url: PropTypes.string,
        saldo_conta: PropTypes.string,
        investimento_conta: PropTypes.string,
        cartao_credito: PropTypes.number,
        limite_cartao: PropTypes.string,
        fechamento_cartao: PropTypes.number,
        vencimento_cartao: PropTypes.number,
    }),
};


export default ModalNovaConta