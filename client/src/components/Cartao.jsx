import React from 'react'
import PropTypes from 'prop-types';
import styles from "./Cartao.module.css"
import Chip from "../image/chip.svg"


function Cartao({ nomeCartao, className, nomeCompleto}) {
    const containerClasses = `${styles.cartao} ${className || ''}`;
    return (
        <div className={styles.container}>
            <div className={containerClasses}>
                <h3 className={styles.nomeCartao}>{nomeCartao}</h3>
                <img className={styles.chip} src={Chip}></img>
                <h3 className={styles.nomeUser}>{nomeCompleto}</h3>
            </div>
        </div>
    )
};

Cartao.propTypes = {
    nomeCartao: PropTypes.string.isRequired,
    nomeCompleto: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

export default Cartao