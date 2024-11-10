import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from "./ModalNovaReceita.module.css"

function ModalNovaReceita({onClose}) {

  const [getContas, setContas] = useState([])
  const [getCategoriasReceitas, setCategoriasReceitas] = useState([])
  const [getSubcategoriasReceitas, setSubcategoriasReceitas] = useState([])
  const [getCategoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [getSubcategoriaSelecionada, setSubcategoriaSelecionada] = useState('');
  const [getContaSelecionada, setContaSelecionada] = useState('');

  const subcategoriasFiltradas = getSubcategoriasReceitas.filter(subcategoria => subcategoria.id_categoria === getCategoriaSelecionada);

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
      fetch('http://localhost:5000/categoriasReceitas', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      })

      .then(resp => resp.json())
      .then(data => {
        setCategoriasReceitas(data)
      })
      .catch(err => {
          console.log(err)
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/subcategoriasReceitas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    .then(resp => resp.json())
    .then(data => {
      setSubcategoriasReceitas(data)
    })
    .catch(err => {
        console.log(err)
    })
  }, []);

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(parseInt(e.target.value, 10)); // Converte o valor para inteiro
  };

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <button className={styles.btnFechar} onClick={onClose} >X</button>
            <h1>Lançamento de Receita</h1>
            <label htmlFor="descricaoTextArea">Descrição:</label>
            <textarea id="descricaoTextArea"></textarea>
            <label htmlFor="contaSelect">Conta:</label>
            <label htmlFor="dataInput">Data:</label>
            <select id="contaSelect" onChange={(e) => setContaSelecionada(e.target.value)} value={getContaSelecionada}>
              <option value="" disabled></option>
                {getContas.map((option) => (
                    <option value={option.nome} key={option.id}>{option.nome}</option>
                ))}
            </select>
            <input type="date" id="dataInput" />
            <label htmlFor="valorInput">Valor:</label>
            <label htmlFor="categoriaSelect">Categoria:</label>
            <label htmlFor="categoriaSelect">Subcategoria:</label>
            <input type="text" id="valorInput" />
            <select id="categoriaSelect" onChange={handleCategoriaChange} value={getCategoriaSelecionada}>
              <option value=""></option>
                {getCategoriasReceitas.map((option) => (
                    <option value={option.id} key={option.id}>{option.nome}</option>
                ))}
            </select>
            <select id="subcategoriaSelect" onChange={(e) => setSubcategoriaSelecionada(e.target.value)} disabled={!getCategoriaSelecionada}>
              <option value="" disabled></option>
                {subcategoriasFiltradas.map(subcategoria => (
                  <option key={subcategoria.id} value={subcategoria.id}>
                    {subcategoria.nome}
                  </option>
                ))}
            </select>
            <button className={styles.submitButton} id='submitButton'>Adicionar</button>
        </div>
    </div>
  )
}

ModalNovaReceita.propTypes = {
    onClose: PropTypes.func.isRequired
  };

export default ModalNovaReceita