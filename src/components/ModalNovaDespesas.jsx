import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from "./ModalNovaDespesas.module.css"

function ModalNovaDespesas({onClose}) {

  const [getContas, setContas] = useState([])
  const [getCategoriasDespesas, setCategoriasDespesas] = useState([])
  const [getSubcategoriasDespesas, setSubcategoriasDespesas] = useState([])
  const [getCategoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [getSubcategoriaSelecionada, setSubcategoriaSelecionada] = useState('');
  const [getContaSelecionada, setContaSelecionada] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:5000/contas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    .then(resp => resp.json())
    .then(data => {
      setContas(data)
    })
    .catch(err => {
        console.log(err)
    })
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/categoriasDespesas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    .then(resp => resp.json())
    .then(data => {
      setCategoriasDespesas(data)
    })
    .catch(err => {
        console.log(err)
    })
  }, []);

  useEffect(() => {
  fetch('http://localhost:5000/subcategoriasDespesas', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  })

  .then(resp => resp.json())
  .then(data => {
    setSubcategoriasDespesas(data)
  })
  .catch(err => {
      console.log(err)
  })
  }, []);

  const handleGeneroChange = (event) => {
    console.log(event.target.value)
    setCategoriaSelecionada(event.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(parseInt(e.target.value, 10)); // Converte o valor para inteiro
  };

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <button className={styles.btnFechar} onClick={onClose} >X</button>
            <h1>Lançamento de Despesas</h1>
            <label className={styles.label} htmlFor="descricaoTextArea">Descrição:</label>
            <textarea id="descricaoTextArea"></textarea>
            <label className={styles.label} htmlFor="contaSelect">Conta:</label>
            <label className={styles.label} htmlFor="dataInput">Data:</label>
            <select className={styles.select} id="contaSelect" onChange={(e) => setContaSelecionada(e.target.nome)} value={getContaSelecionada}>
              <option value="" disabled></option>
                {getContas.map((option) => (
                    <option value={option.nome} key={option.id}>{option.nome}</option>
                ))}
            </select>
            <input type="date" id="dataInput" />
            <label className={styles.label} htmlFor="valorInput">Valor:</label>
            <label className={styles.label} htmlFor="categoriaSelect">Categoria:</label>
            <label className={styles.label} htmlFor="categoriaSelect">Subcategoria:</label>
            <input type="text" id="valorInput" />
            <select className={styles.select} id="categoriaSelect" onChange={handleCategoriaChange} value={getCategoriaSelecionada}>
              <option value="" disabled></option>
                {getCategoriasDespesas.map((option) => (
                    <option value={option.id} key={option.id}>{option.nome}</option>
                ))}
            </select>
            <select className={styles.select} id="subcategoriaSelect" onChange={(e) => setSubcategoriaSelecionada(e.target.value)} disabled={!getCategoriaSelecionada}>
              <option value=""></option>
                {getSubcategoriasDespesas
                .filter(subcategoria => subcategoria.id_categoria === getCategoriaSelecionada)
                .map(option => (
                  <option value={option.id} key={option.id}>{option.nome}</option>
                ))}
            </select>
            <div className={styles.boxCombo}>
              <input type='checkbox' id="debitoCheckbox" className={styles.checkbox}></input>
              <label htmlFor="debitoCheckbox" className={styles.labelCheckbox}>Debito:</label>
              <input type='checkbox' id="creditoCheckbox" className={styles.checkbox}></input>
              <label htmlFor="creditoCheckbox" className={styles.labelCheckbox}>Credito:</label>
              <select className={styles.parcelasSelect} id="parcelasSelect">
                <option value="1" key="1">1</option>
                <option value="2" key="2">2</option>
                <option value="3" key="3">3</option>
                <option value="4" key="4">4</option>
                <option value="5" key="5">5</option>
                <option value="6" key="6">6</option>
                <option value="7" key="7">7</option>
                <option value="8" key="8">8</option>
                <option value="9" key="9">9</option>
                <option value="10" key="10">10</option>
                <option value="11" key="11">11</option>
                <option value="12" key="12">12</option>
              </select>
            </div>
            <button className={styles.submitButton} id='submitButton'>Adicionar</button>
        </div>
    </div>
  )
}

ModalNovaDespesas.propTypes = {
    onClose: PropTypes.func.isRequired
  };

export default ModalNovaDespesas