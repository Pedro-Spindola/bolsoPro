import React from 'react'
import PropTypes from 'prop-types';
import styles from "./TabelaLancamentos.module.css"

function TabelaLancamentos({data, descricao, icon, categoria, conta, valor}) {
  return (
    <tr className={styles.tr}>
        <td className={styles.td}>{data}</td>
        <td className={styles.td}>{descricao}</td>
        <td className={styles.td}><img className={styles.imgTd} src={icon} alt="" /></td>
        <td className={styles.td}>{categoria}</td>
        <td className={styles.td}>{conta}</td>
        <td className={styles.td}>{valor}</td>
    </tr>
  )
}
TabelaLancamentos.propTypes = {
    data: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    categoria: PropTypes.string.isRequired,
    conta: PropTypes.string.isRequired,
    valor: PropTypes.string.isRequired,
};
export default TabelaLancamentos