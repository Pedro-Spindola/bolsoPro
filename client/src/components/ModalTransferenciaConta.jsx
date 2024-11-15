import React from 'react'
import styles from "./ModalTransferenciaConta.module.css"

const ModalTransferenciaConta = () => {
  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <h1>Transferência entre Contas</h1>
            <select id="subcategoriaSelect">
              <option value="" disabled></option>
            </select>
            <select id="subcategoriaSelect">
              <option value="" disabled></option>
            </select>
            <h2>Msg de Error</h2>
            <input type="date" id="dataInput" />
            <label htmlFor="valorInput">Valor:</label>
            <button className={styles.submitButton} id='submitButton'>Transferir</button>
        </div>
    </div>
  )
}

export default ModalTransferenciaConta