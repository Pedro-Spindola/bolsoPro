import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from "./ModalNovaDespesas.module.css"
import axios from 'axios';

function ModalNovaDespesas({onClose}) {

  const [getContas, setContas] = useState([]) // CONTAS
  const [getCategorias, setCategorias] = useState([]) // CATEGORIAS
  const [getSubcategorias, setSubcategorias] = useState([]) // SUBCATEGORIAS
  const [getFaturas, setFaturas] = useState([]) // FATURAS
  const [getCategoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [getSubcategoriaSelecionada, setSubcategoriaSelecionada] = useState('');
  const [getContaSelecionada, setContaSelecionada] = useState([]);
  
  const [checkDebito, setCheckDebito] = useState(false);
  const [checkCredito, setCheckCredito] = useState(false);
  const [selectParcelas, setSelectParcelas] = useState(1);

  const [checkDebitoDisabled, setCheckDebitoDisabled] = useState(true);
  const [checkCreditoDisabled, setCheckCreditoDisabled] = useState(true);
  const [parcelasDisabled, setParcelasDisabled] = useState(true);

  const [valorLancamento, setValorLancamento] = useState("");

  const categoriasFiltradas = getCategorias.filter((categoria) => categoria.tipo_categoria === "Despesas");
  const subcategoriasFiltradas = getSubcategorias.filter((subcategoria) => subcategoria.categoria_id === getCategoriaSelecionada);

  // Função para formatar o valor no campo de input
  const handleChangeValor = (event) => {
    let valor = event.target.value;
    valor = valor.replace(/\D/g, ""); // Remover todos os caracteres não numéricos, exceto vírgula

    if (valor.length > 2) {
        valor = valor.slice(0, -2) + "," + valor.slice(-2); // Adicionar a vírgula para separar os centavos
    }
    valor = valor.replace(/(\d)(?=(\d{3})+(\,|$))/g, "$1."); // Adicionar ponto para separar os milhares
    setValorLancamento(valor);
  };

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
  
        // Busca Fatura
        const faturaResponse = await axios.get('http://127.0.0.1:3000/api/faturas');
        setFaturas(faturaResponse.data);

        // Debug opcional
        //console.log('Contas:', contasResponse.data);
        //console.log('Categorias:', categoriasResponse.data);
        //console.log('Subcategorias:', subcategoriasResponse.data);
        console.log('Faturas:', faturaResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
  }, []);  
  
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
            console.log("Lancamento adicionado com sucesso:", data);

            const contaId = NovoLancamento.id_conta; // A conta usada no lançamento
            const valorLancamento = parseFloat(NovoLancamento.valor); // O valor do lançamento, convertido para número
            const tipoLancamento = NovoLancamento.tipo_lancamento; // Tipo de lançamento (Receita ou Despesa)
            const faturaId = NovoLancamento.id_fatura; // A fatura usada no lançamento

            if (faturaId === null) {
                // Se fatura for null, executa a conta de novo saldo
                const novoSaldo = tipoLancamento === 'Receitas' ? valorLancamento : -valorLancamento;

                // Atualiza o saldo da conta
                fetch(`http://127.0.0.1:3000/api/contas/${contaId}`, {
                    method: "GET", // Obtém a conta atual para pegar o saldo atual
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Falha ao obter os dados da conta.");
                    }
                    return response.json();
                })
                .then(contaData => {
                    // Calcula o novo saldo
                    const saldoAtual = parseFloat(contaData.saldo_conta);  // Converte para número de ponto flutuante
                    const saldoAtualizado = saldoAtual + novoSaldo;  // Soma ou subtrai o valor do lançamento

                    // Agora atualiza a conta com o novo saldo
                    atualizarSaldoDaConta({ ...contaData, saldo_conta: saldoAtualizado }, contaId);
                })
                .catch(error => {
                    console.error("Erro ao obter a conta para atualizar o saldo:", error);
                });
            } else {
                // Se fatura não for null, adiciona o valor do lançamento no valor_fatura da fatura selecionada
                fetch(`http://127.0.0.1:3000/api/faturas/${faturaId}`, {
                    method: "GET", // Obtém a fatura atual para pegar o valor_fatura atual
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Falha ao obter os dados da fatura.");
                    }
                    return response.json();
                })
                .then(faturaData => {
                    // Atualiza o valor da fatura
                    const valorFaturaAtual = parseFloat(faturaData.valor_fatura);  // Converte para número de ponto flutuante
                    const valorFaturaAtualizado = valorFaturaAtual + valorLancamento;  // Adiciona o valor do lançamento

                    // Agora atualiza a fatura com o novo valor
                    fetch(`http://127.0.0.1:3000/api/faturas/${faturaId}`, {
                        method: "PUT", // Atualiza a fatura
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ ...faturaData, valor_fatura: valorFaturaAtualizado }) // Envia a fatura atualizada como JSON
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Falha ao atualizar o valor da fatura.");
                        }
                        return response.json();
                    })
                    .then(updatedFatura => {
                        console.log("Fatura atualizada com sucesso:", updatedFatura);
                    })
                    .catch(error => {
                        console.error("Erro ao atualizar a fatura:", error);
                    });
                })
                .catch(error => {
                    console.error("Erro ao obter a fatura:", error);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao adicionar o lancamento:", error);
        });
    } catch (error) {
        console.error('Erro ao adicionar novo lançamento:', error);
    }
  }

  function atualizarSaldoDaConta(conta, idCont) {
    fetch(`http://127.0.0.1:3000/api/contas/${idCont}`, {
        method: "PUT", // Método para editar
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(conta) // Envia o objeto da conta editada com o novo saldo
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Falha ao atualizar a conta.");
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        console.log("Conta atualizada com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro ao atualizar a conta:", error);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faturaResponse = await axios.get('http://127.0.0.1:3000/api/faturas');
        setFaturas(faturaResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
  }, [getFaturas]); 

  function adicionarNovaFatura(NovaFatura) {
    try{
      console.log("Entro no adc fatura");
      fetch("http://127.0.0.1:3000/api/faturas", {
          method: "POST", // Enviando dados para adicionar
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(NovaFatura) // Envia o objeto como JSON
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Falha ao adicionar a fatura.");
          }
          return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
          console.log("Fatura adicionada com sucesso:", data);
      })
      .catch(error => {
          console.error("Erro ao adicionar a Fatura:", error);
      });
    }catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  useEffect(() => {
    const isCredito = getContaSelecionada.cartao_credito;
    if(isCredito === 1){
      setCheckDebitoDisabled(false);
      setCheckCreditoDisabled(false);
      setCheckDebito(true);
      setCheckCredito(false);
      setSelectParcelas(1);
      setParcelasDisabled(true);
    }
    if(isCredito === 0){
      setCheckDebitoDisabled(false);
      setCheckCreditoDisabled(true);
      setCheckDebito(true);
      setCheckCredito(false);

      setSelectParcelas(1);
      setParcelasDisabled(true);
    }
    
  }, [getContaSelecionada])

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(parseInt(e.target.value, 10)); // Converte o valor para inteiro
  };

  const handleParcelasChange = (e) => {
    const selectedId = e.target.value;
    setSelectParcelas(selectedId)
  };

  const handleContaSelecionada = (e) => {
    const selectedId = e.target.value;
    const selectedConta = getContas.find((conta) => conta.id_conta.toString() === selectedId);
    setContaSelecionada(selectedConta);
  };

  const handleTipoDaContaDebito = (e) => {
    const isChecked = e.target.checked;
    if(isChecked){
      setCheckDebito(isChecked);
      setCheckCredito(!isChecked);
      setParcelasDisabled(true);
      setSelectParcelas(1);
    }
  };
  
  const handleTipoDaContaCredito = (e) => {
    const isChecked = e.target.checked;
    if(isChecked){
      setCheckCredito(isChecked);
      setCheckDebito(!isChecked);
      setParcelasDisabled(false);
    }
  };

  const handleSubmitLancamento = (e) => {
    e.preventDefault();
    try {
        const data = document.getElementById("dataInput").value;
        let [ano, mes, dia] = data.split("-").map(Number);
        let faturaSelecionada = null;
        if(checkCredito){
          for(let i = 0; i < selectParcelas; i++){
            faturaSelecionada = determinarFatura(dia, mes, ano);
            mes++;
            if (mes > 12) {
              mes = 1;
              ano += 1;
            }
          }   
        }

        const newLancamento = {
          tipo_lancamento: 'Despesas',
          descricao: document.getElementById("descricaoTextArea").value,
          valor: isNaN(parseFloat(valorLancamento.replace(/\./g, "").replace(",", "."))) ? 0 : parseFloat(valorLancamento.replace(/\./g, "").replace(",", ".")),
          data_lancamento: document.getElementById("dataInput").value,
          quantidade_parcelas: selectParcelas,
          id_conta: getContaSelecionada.id_conta,
          id_fatura: faturaSelecionada,
          id_categoria: getCategoriaSelecionada,
          id_subcategoria: getSubcategoriaSelecionada
        };

        console.log(newLancamento);
        adicionarNovoLancamento(newLancamento);

    } catch (error) {
        console.error(error.message);
    }
  }

  function determinarFatura(dia, mes, ano) {
    const fechamentoFatura = parseInt(getContaSelecionada.fechamento_cartao, 10);

    if (dia > fechamentoFatura) {
      mes += 1;
        if (mes > 12) {
            mes = 1;
            ano += 1;
        }
    };

    const mesAnoReferencia = `${(mes)}/${ano}`;
    let faturaSelecionada = getFaturas.find(
        (fatura) => fatura.mes_referente === mesAnoReferencia && fatura.conta_id === getContaSelecionada.id_conta
    );

    const novaFatura = {
      mes_referente: mesAnoReferencia,  
      valor_fatura: 0,
      status_fatura: 'Aberto',
      data_fechamento: getContaSelecionada.fechamento_cartao,
      data_vencimento: getContaSelecionada.vencimento_cartao,
      conta_id: getContaSelecionada.id_conta
    };
    if (!faturaSelecionada) {

      console.log("Fatura não encontrada. Criando nova fatura...");
      adicionarNovaFatura(novaFatura);
      setTimeout(() => {
        faturaSelecionada = getFaturas.find(
            (fatura) => fatura.mes_referente === mesAnoReferencia && fatura.conta_id === getContaSelecionada.id_conta
        );
        console.log("Fatura encontrada ou criada após 2 segundos:", faturaSelecionada);
      }, 3000);
    }
    return faturaSelecionada.id_fatura;
  }

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.container}>
            <button className={styles.btnFechar} onClick={onClose} >X</button>
            <h1>Lançamento de Despesas</h1>
            <label className={styles.label} htmlFor="descricaoTextArea">Descrição:</label>
            <textarea id="descricaoTextArea"></textarea>
            <label className={styles.label} htmlFor="contaSelect">Conta:</label>
            <label className={styles.label} htmlFor="dataInput">Data:</label>
            <select className={styles.select} id="contaSelect" onChange={handleContaSelecionada} value={getContaSelecionada.id_conta || ""}>
              <option value="" disabled></option>
                {getContas.map((option) => (
                    <option value={option.id_conta} key={option.id_conta}>{option.nome_banco}</option>
                ))}
            </select>
            <input type="date" id="dataInput" />
            <label className={styles.label} htmlFor="valorInput">Valor:</label>
            <label className={styles.label} htmlFor="categoriaSelect">Categoria:</label>
            <label className={styles.label} htmlFor="categoriaSelect">Subcategoria:</label>
            <input type="text" id="valorInput" onChange={handleChangeValor} value={valorLancamento}/>
            <select className={styles.select} id="categoriaSelect" onChange={handleCategoriaChange} value={getCategoriaSelecionada}>
              <option value="" disabled></option>
                {categoriasFiltradas.map((categoria) => (
                  <option value={categoria.id_categoria} key={categoria.id_categoria}>
                    {categoria.nome_categoria}
                  </option>
              ))}
            </select>
            <select className={styles.select} id="subcategoriaSelect" onChange={(e) => setSubcategoriaSelecionada(e.target.value)} disabled={!getCategoriaSelecionada} value={getSubcategoriaSelecionada}>
              <option value="" disabled></option>
                {subcategoriasFiltradas.map((subcategoria) => (
                <option value={subcategoria.id_subcategoria} key={subcategoria.id_subcategoria}>
                  {subcategoria.nome_subcategoria}
                </option>
              ))}
            </select>
            <div className={styles.boxCombo}>
              <input type='checkbox' id="debitoCheckbox" className={styles.checkbox} checked={checkDebito} onChange={handleTipoDaContaDebito} disabled={checkDebitoDisabled}></input>
              <label htmlFor="debitoCheckbox" className={styles.labelCheckbox}>Debito:</label>
              <input type='checkbox' id="creditoCheckbox" className={styles.checkbox} checked={checkCredito} onChange={handleTipoDaContaCredito} disabled={checkCreditoDisabled}></input>
              <label htmlFor="creditoCheckbox" className={styles.labelCheckbox}>Credito:</label>
              <select className={styles.parcelasSelect} id="parcelasSelect" value={selectParcelas} disabled={parcelasDisabled} onChange={handleParcelasChange}>
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
            <button className={styles.submitButton} id='submitButton' onClick={handleSubmitLancamento}>Adicionar</button>
        </div>
    </div>
  )
}

ModalNovaDespesas.propTypes = {
    onClose: PropTypes.func.isRequired
  };

export default ModalNovaDespesas