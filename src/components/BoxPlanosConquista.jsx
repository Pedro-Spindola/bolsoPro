import PropTypes from 'prop-types';
import styles from "./BoxPlanosConquista.module.css"

const BoxPlanosConquista = ({ icone, titulo, vMensal, valorColetado, valorRestante}) => {
  return (
    <div className={styles.container}>
        <img src={icone}></img>
        <div className={styles.infPlano}>
            <h1>{titulo}</h1>
            <h3>Valor mensal: </h3>
            <h2>{vMensal}</h2>
        </div>
        <div className={styles.progresso}>
            <h2>{valorColetado}</h2>
            <h2>{valorRestante}</h2>
            <div className={styles.barProgresso}></div>
        </div>
    </div>
  )
}
    BoxPlanosConquista.propTypes = {
        icone: PropTypes.node.isRequired,
        titulo: PropTypes.string.isRequired,
        vMensal: PropTypes.string.isRequired,
        valorColetado: PropTypes.string.isRequired,
        valorRestante: PropTypes.string.isRequired,
    };

export default BoxPlanosConquista