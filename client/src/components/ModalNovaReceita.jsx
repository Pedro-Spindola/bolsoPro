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
  const [faturas, setFaturas] = useState([]);
  const [valorBR, setValorBR] = useState([]);
  const [contaParaAtualizar, setContaParaAtualizar] = useState({
    id_conta: null,
    nome_banco: null,
    saldo_conta: 0,
    investimento_conta: null,
    cartao_credito: null,
    limite_cartao: null,
    fechamento_cartao: null,
    vencimento_cartao: null
});
  const [getLancamento, setLancamento] = useState({
    tipo_lancamento: 'Receitas',
    descricao: '',
    valor: 0,
    data_lancamento: '',
    quantidade_parcelas: 1,
    id_conta: null,
    id_fatura: null,
    id_categoria: null,
    id_subcategoria: null
  });

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

  useEffect(() => {
    if (getLancamento.id_conta) {  // Verifica se o id_conta é válido
        fetch(`http://127.0.0.1:3000/api/faturas/conta/${getLancamento.id_conta}`)  // Usando id_conta para obter faturas
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter faturas');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setFaturas(data);  // Atualiza o estado com as faturas
                } else {
                    console.error('Formato de dados inválido para faturas');
                }
            })
            .catch(error => {
                console.error('Erro ao obter faturas:', error);
            });
    }
  }, [getLancamento.id_conta]);


  function adicionarNovoLancamento(NovoLancamento) {
    try {
      fetch("http://127.0.0.1:3000/api/lancamentos", {
          method: "POST", // Enviando dados para adicionar
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(NovoLancamento) // Envia o objeto como JSON
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Falha ao adicionar o Lancamento.");
          }
          return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
          console.log("Lancamento adicionada com sucesso:", data);
      })
      .catch(error => {
          console.error("Erro ao adicionar a lancamento:", error);
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  function obterContaParaAlterar(idCont) {
    // Faz a requisição para pegar os dados da conta pelo id_conta
    console.log("Está recebendo a conta: " + idCont);
    fetch(`http://127.0.0.1:3000/api/contas/${idCont}`)
      .then(response => response.json())
      .then(data => {
        // Atualiza o estado com os dados da conta
        setContaParaAtualizar({
          id_conta: data.id_conta,
          nome_banco: data.nome_banco,
          saldo_conta: data.saldo_conta,
          investimento_conta: data.investimento_conta,
          cartao_credito: data.cartao_credito,
          limite_cartao: data.limite_cartao,
          fechamento_cartao: data.fechamento_cartao,
          vencimento_cartao: data.vencimento_cartao
        });
      })
      .catch(error => {
        console.error('Erro ao obter dados da conta:', error);
        });
  }

  function atualizarSaldoDaConta(conta, idCont) {
    const id = idCont; // Pegando o id da conta que foi editada
    fetch(`http://127.0.0.1:3000/api/contas/${id}`, { // Incluindo o ID na URL
        method: "PUT", // Método para editar
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(conta) // Envia o objeto da conta editada
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Falha ao adicionar a conta.");
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        console.log("Conta adicionada com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro ao adicionar a conta:", error);
    });
  }

  const handleSubmitLancamento = (e) => {  
    e.preventDefault(); // Previne o envio do formulário, se necessário
    // Acessando o único lançamento no estado `getLancamento`
    const lancamento = getLancamento;

    // Validações
    if (lancamento.tipo_lancamento !== 'Receitas' && lancamento.tipo_lancamento !== 'Despesas') {
      alert('O tipo de lançamento deve ser "Receitas" ou "Despesas".');
      return;
    }

    if (lancamento.valor < 0) {
      alert('O valor não pode ser negativo.');
      return;
    }

    if (!lancamento.data_lancamento) {
      alert('A data do lançamento não pode ser nula.');
      return;
    }

    if (lancamento.quantidade_parcelas === 0) {
      alert('A quantidade de parcelas não pode ser 0.');
      return;
    }

    if (lancamento.id_conta === null) {
      alert('O id da conta não pode ser nulo.');
      return;
    }

    if (lancamento.id_categoria === null) {
      alert('O id da categoria não pode ser nulo.');
      return;
    }
    
    console.log(faturas);
    console.log(getLancamento);
    console.log(contaParaAtualizar);
    //adicionarNovoLancamento(getLancamento);
    obterContaParaAlterar(getLancamento.id_conta);
    let valorAtualizado = contaParaAtualizar.saldo_conta + getLancamento.valor;
    console.log(valorAtualizado);
    // Adicionar aqui formulas para alterar os valores presente nas contas.
    //onClose();

  }

  const handleContaChange = (e) => {
    setContaSelecionada(e.target.value);
    setLancamento(prevState => ({
      ...prevState,
      id_conta: e.target.value
    }));
  };

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(parseInt(e.target.value, 10)); // Converte o valor para inteiro
    setLancamento(prevState => ({
      ...prevState,
      id_categoria: e.target.value
    }));
  };

  const handleSubcategoriaChange = (e) => {
    setSubcategoriaSelecionada(e.target.value);
    setLancamento(prevState => ({
      ...prevState,
      id_subcategoria: e.target.value
    }));
  };

  const handleDescricaoChange = (e) => {
    setLancamento(prevState => ({
      ...prevState,
      descricao: e.target.value
    }));
  };

  const handleDataChange = (e) => {
    setLancamento(prevState => ({
      ...prevState,
      data_lancamento: e.target.value
    }));
  };

  const handleValorChange = (e) => {
    let valor = e.target.value;
  
    // Remover todos os caracteres não numéricos, exceto a vírgula
    let valorLimpo = valor.replace(/\D/g, ""); 
  
    // Adicionar a vírgula para separar os centavos
    if (valorLimpo.length > 2) {
      valor = valorLimpo.slice(0, -2) + "," + valorLimpo.slice(-2); // Formatação para visualização
    } else {
      valor = valorLimpo;  // Para valores abaixo de 100, mantém o valor sem a vírgula
    }
  
    // Adicionar ponto para separar os milhares para exibição
    valor = valor.replace(/(\d)(?=(\d{3})+(\,|$))/g, "$1.");
  
    // Exibe o valor formatado com ponto para milhares e vírgula para centavos
    setValorBR(valor);
  
    // Atualiza o estado com o valor "limpo" (sem formatação, com ponto para centavos)
    let valorLimpoFinal = valorLimpo.slice(0, -2) + '.' + valorLimpo.slice(-2); // Substitui vírgula por ponto
    setLancamento(prevState => ({
      ...prevState,
      valor: valorLimpoFinal  // Guarda o valor limpo, no formato "1234.56"
    }));
  };
  
  



  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <button className={styles.btnFechar} onClick={onClose} >X</button>
            <h1>Lançamento de Receita</h1>
            <label htmlFor="descricaoTextArea">Descrição:</label>
            <textarea id="descricaoTextArea" onChange={handleDescricaoChange} value={getLancamento.descricao}></textarea>
            <label htmlFor="contaSelect">Conta:</label>
            <label htmlFor="dataInput">Data:</label>
            <select id="contaSelect" onChange={handleContaChange} value={getContaSelecionada}>
              <option value="" disabled></option>
                {getContas.map((option) => (
                    <option value={option.id_conta} key={option.id_conta}>{option.nome_banco}</option>
                ))}
            </select>
            <input type="date" id="dataInput" onChange={handleDataChange} value={getLancamento.data_lancamento}/>
            <label htmlFor="valorInput">Valor:</label>
            <label htmlFor="categoriaSelect">Categoria:</label>
            <label htmlFor="categoriaSelect">Subcategoria:</label>
            <input type="text" id="valorInput" onChange={handleValorChange} value={valorBR}/>
            <select id="categoriaSelect" onChange={handleCategoriaChange} value={getCategoriaSelecionada}>
              <option value="" disabled></option>
              {categoriasFiltradas.map((categoria) => (
                <option value={categoria.id_categoria} key={categoria.id_categoria}>
                  {categoria.nome_categoria}
                </option>
              ))}
            </select>
            <select id="subcategoriaSelect" onChange={handleSubcategoriaChange} disabled={!getCategoriaSelecionada} value={getSubcategoriaSelecionada}>
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