import PropTypes from 'prop-types';
import styles from "./BoxPlanosConquista.module.css"

const BoxPlanosConquista = ({ icone, titulo, meta, valorColetado, ValorRestante}) => {
  return (
    <div className={styles.container}>
        <img src={icone}></img>
        <div className={styles.infPlano}>
            <h1>{titulo}</h1>
            <h2>Valor planejado: {meta}</h2>
        </div>
        <div className={styles.progresso}>
            <h2>{valorColetado}</h2>
            <h2>Restante: {ValorRestante}</h2>
            <div className={styles.barProgresso}></div>
        </div>
    </div>
  )
}
    BoxPlanosConquista.propTypes = {
        icone: PropTypes.node.isRequired,
        titulo: PropTypes.string.isRequired,
        meta: PropTypes.string.isRequired,
        valorColetado: PropTypes.string.isRequired,
        ValorRestante: PropTypes.string.isRequired,
    };

export default BoxPlanosConquista