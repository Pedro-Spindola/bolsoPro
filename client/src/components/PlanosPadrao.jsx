import React from 'react'
import styles from "./PlanosPadrao.module.css"

function PlanosPadrao({icone, titulo, valorMeta, valorMensal, valorRestante}) {
  return (
    <div className={styles.myContainer}>
        <div className={styles.line01}>
            <img src={icone}></img>
            <div className={styles.boxTitulos}>
                <h2>{titulo}</h2>
                <h3>Valor mensal: {valorMensal}</h3>
            </div>
        </div>
        <div className={styles.line01}>
            <h3>{valorRestante}</h3>
            <h3>{valorMeta}</h3>
        </div>
        <div className={styles.boxBar}>
            <div className={styles.barra}></div>
        </div>
    </div>
  )
}
PlanosPadrao.propTypes = {
    icone: PropTypes.node.isRequired,
    titulo: PropTypes.string.isRequired,
    valorMeta: PropTypes.string.isRequired,
    valorMensal: PropTypes.string.isRequired,
};
export default PlanosPadrao