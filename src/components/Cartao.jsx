import React from 'react'
import PropTypes from 'prop-types';
import styles from "./Cartao.module.css"
import Chip from "../image/chip.svg"


function Cartao({ nomeCartao, className, bandeira, nomeCompleto, ultimosNumero, validadeMes, validadeAno}) {
    const containerClasses = `${styles.cartao} ${className || ''}`;
    return (
        <div className={styles.container}>
            <div className={containerClasses}>
                <h3 className={styles.nomeCartao}>{nomeCartao}</h3>
                <h3 className={styles.nomeBandeira}>{bandeira}</h3>
                <img className={styles.chip} src={Chip}></img>
                <h2 className={styles.numeros}>**** **** **** {ultimosNumero}</h2>
                <h3 className={styles.nomeUser}>{nomeCompleto}</h3>
                <h3 className={styles.validade}>{validadeMes} / {validadeAno}</h3>
            </div>
        </div>
    )
};

Cartao.propTypes = {
    nomeCartao: PropTypes.string.isRequired,
    bandeira: PropTypes.string.isRequired,
    nomeCompleto: PropTypes.string.isRequired,
    ultimosNumero: PropTypes.string.isRequired,
    validadeMes: PropTypes.string.isRequired,
    validadeAno: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

export default Cartao