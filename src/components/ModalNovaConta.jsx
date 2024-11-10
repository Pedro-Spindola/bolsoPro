import React, { useState } from 'react';
import styles from "./ModalNovaConta.module.css"
import PropTypes from 'prop-types';

const ModalNovaConta = ({onClose}) => {

    const [isCartaoCreditoDisponivel, setIsCartaoCreditoDisponivel] = useState(false);
    
    // Função para lidar com mudanças no checkbox
    const handleCheckboxChange = (event) => {
        setIsCartaoCreditoDisponivel(event.target.checked);
    };

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <h1>Nova Conta</h1>
            <label htmlFor="nomeDaConta">Nome:</label>
            <input type="text" id="nomeDaConta"/>
            <label htmlFor="saldoDaConta">Saldo:</label>
            <input type="text" id="saldoDaConta" />
            <label htmlFor="valorInvestido">Investimentos:</label>
            <input type="text" id="valorInvestido" />
            <input type="checkbox" id="cartaoDeCredito" checked={isCartaoCreditoDisponivel} onChange={handleCheckboxChange}/>
            <label htmlFor="cartaoDeCredito">Cartão de Credito.</label>
            <div className={`${styles.limiteDisponivel} ${ isCartaoCreditoDisponivel ? styles.on : ''}`}>
                <label htmlFor="limiteDisponivel">Limite do Cartão</label>
                <input type="text" id="limiteDisponivel" />
                <label htmlFor="dataDeFechamentoDaFatura">Data de Fechamento:</label>
                <input type="text" id="dataDeFechamentoDaFatura" />
                <label htmlFor="dataDeVencimento">Data de Vencimento:</label>
                <input type="text" id="dataDeVencimento" />
            </div>
            <div className={styles.boxButton}>
                <button>Adicionar</button>
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