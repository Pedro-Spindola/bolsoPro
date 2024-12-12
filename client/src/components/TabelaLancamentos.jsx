import React from 'react'
import PropTypes from 'prop-types';
import styles from "./TabelaLancamentos.module.css"

function TabelaLancamentos({index, data, descricao, icon, conta, valor}) {
  return (
    <>
        <td className={styles.td}>{data}</td>
        <td className={styles.td}>{descricao}</td>
        <td className={styles.td}><img className={styles.imgTd} src={icon} alt="" /></td>
        <td className={styles.td}>{conta}</td>
        <td className={styles.td}>{valor}</td>
    </>
  )
}
TabelaLancamentos.propTypes = {
    index: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    conta: PropTypes.string.isRequired,
    valor: PropTypes.string.isRequired,
};
export default TabelaLancamentos