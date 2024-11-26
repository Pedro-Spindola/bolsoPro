import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from "./ModalNovaReceita.module.css"
import axios from 'axios';

function ModalNovaReceita({onClose}) {

  const [getContas, setContas] = useState([]); // CONTAS
  const [getCategorias, setCategorias] = useState([]); // CATEGORIAS
  const [getSubcategorias, setSubcategorias] = useState([]); // SUBCATEGORIAS
  const [getCategoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [getSubcategoriaSelecionada, setSubcategoriaSelecionada] = useState('');
  const [getContaSelecionada, setContaSelecionada] = useState('');

  const categoriasFiltradas = getCategorias.filter((categoria) => categoria.tipo_categoria === "Receitas");
  const subcategoriasFiltradas = getSubcategorias.filter((subcategoria) => subcategoria.categoria_id === getCategoriaSelecionada);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca contas
        const contasResponse = await axios.get('http://127.0.0.1:3000/api/contas');
        setContas(contasResponse.data);
  
        // Busca categorias
        const categoriasResponse = await axios.get('http://127.0.0.1:3000/api/categorias');
        setCategorias(categoriasResponse.data);
  
        // Busca subcategorias
        const subcategoriasResponse = await axios.get('http://127.0.0.1:3000/api/subcategorias');
        setSubcategorias(subcategoriasResponse.data);
  
        // Debug opcional
        //console.log('Contas:', contasResponse.data);
        //console.log('Categorias:', categoriasResponse.data);
        //console.log('Subcategorias:', subcategoriasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
  }, []);  

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(parseInt(e.target.value, 10)); // Converte o valor para inteiro
  };

  const handleSubmitLancamento = (e) => {    
  }

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
                    <option value={option.nome_banco} key={option.id_contas}>{option.nome_banco}</option>
                ))}
            </select>
            <input type="date" id="dataInput" />
            <label htmlFor="valorInput">Valor:</label>
            <label htmlFor="categoriaSelect">Categoria:</label>
            <label htmlFor="categoriaSelect">Subcategoria:</label>
            <input type="text" id="valorInput" />
            <select id="categoriaSelect" onChange={handleCategoriaChange} value={getCategoriaSelecionada}>
              <option value="" disabled></option>
              {categoriasFiltradas.map((categoria) => (
                <option value={categoria.id_categoria} key={categoria.id_categoria}>
                  {categoria.nome_categoria}
                </option>
              ))}
            </select>
            <select id="subcategoriaSelect" onChange={(e) => setSubcategoriaSelecionada(e.target.value)} disabled={!getCategoriaSelecionada} value={getSubcategoriaSelecionada}>
              <option value="" disabled></option>
                {subcategoriasFiltradas.map((subcategoria) => (
                <option value={subcategoria.id_subcategoria} key={subcategoria.id_subcategoria}>
                  {subcategoria.nome_subcategoria}
                </option>
              ))}
            </select>
            <button className={styles.submitButton} id='submitButton' onClick={handleSubmitLancamento}>Adicionar</button>
        </div>
    </div>
  )
}

ModalNovaReceita.propTypes = {
    onClose: PropTypes.func.isRequired
  };

export default ModalNovaReceita