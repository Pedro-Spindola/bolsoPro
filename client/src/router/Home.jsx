import styles from "./Home.module.css"
import stylesTr from "../components/TabelaLancamentos.module.css"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import axios from 'axios';
import "swiper/css"
import "swiper/css/effect-cards"
import carteira from "../image/moedas.png"
import rendaMensal from "../image/lucros.png"
import despesasMensal from "../image/perda.png"
import Cartao from "../components/Cartao"
import BoxPlanosConquista from "../components/BoxPlanosConquista"
import TabelaLancamentos from "../components/TabelaLancamentos"
import ModalReceita from "../components/ModalNovaReceita"
import ModalDespesas from "../components/ModalNovaDespesas"
import ModalTransferencia from "../components/ModalTransferenciaConta"

const Home = () => {

  const [contas, setContas] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [contaAtivaId, setContaAtivaId] = useState(contas[1]?.id || null);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [investimentosTotal, setInvestimentosTotal] = useState(0);
  const [criptomoedas, setCriptomoedas] = useState(0);

  const [valorEntradaMes, setValorEntradaMes] = useState(0);
  const [valorSaidaMes, setValorSaidaMes] = useState(0);

  // Estado para controlar a visibilidade do modal
  const [isModalOpenReceita, setIsModalOpenReceita] = useState(false);
  const [isModalOpenDespesas, setIsModalOpenDespesas] = useState(false);
  const [isModalOpenTransferencia, setIsModalOpenTransferencia] = useState(false);

  // Função que abre o modal
  const handleReceitaClick = () => {
    setIsModalOpenReceita(true); // Atualiza o estado para abrir o modal
  };

  // Função para fechar o modal
  const closeModalReceita = () => {
    setIsModalOpenReceita(false); // Atualiza o estado para fechar o modal
  };

  const handleDespesasClick = () => {
    setIsModalOpenDespesas(true); // Atualiza o estado para abrir o modal
  };

  const closeModalDespesas = () => {
    setIsModalOpenDespesas(false); // Atualiza o estado para fechar o modal
  };

  const handleTransferenciaClick = () => {
    setIsModalOpenTransferencia(true); // Atualiza o estado para abrir o modal
  };

  const closeModalTransferencia = () => {
    setIsModalOpenTransferencia(false); // Atualiza o estado para fechar o modal
  };

  useEffect(() => {
    // Define a conta inicial apenas se o swiper não estiver inicializado ainda
    if (!contaAtivaId && contas.length > 0) {
      setContaAtivaId(contas[0]);
    }
  }, [contas, contaAtivaId]);

  useEffect(() => {
    atualizarDadosHome();
  }, [contas]);
  
  const handleSlideChange = (swiper) => {
    const novaContaAtiva = contas[swiper.activeIndex];
    setContaAtivaId(novaContaAtiva);
    faturaAbertaAtual(contaAtivaId.dataDeVencimento);
  };

  function atualizarDadosHome(){
    var saldo = 0;
    var invest = 0;
    var crip = 0;
    for (const conta of contas) {
      saldo += parseFloat(conta.saldo_conta);
      invest += parseFloat(conta.investimento_conta);
    }
    setSaldoTotal(saldo);
    setInvestimentosTotal(invest);
  }

  function formatarParaReal(valor) {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // Chama a API para buscar as contas
  useEffect(() => {
    const fetchContas = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/contas');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao buscar contas:', error);
        }
    };

    fetchContas();

    const fetchLancamentos = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:3000/api/lancamentos');
          setLancamentos(response.data);
      } catch (error) {
          console.error('Erro ao buscar lancamento:', error);
      }
    };

    fetchLancamentos();
  }, []);

  // Chama a API para buscar as lancamentos
  useEffect(() => {
    const fetchContas = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:3000/api/contas');
          setContas(response.data);
      } catch (error) {
          console.error('Erro ao buscar contas:', error);
      }
    };

    fetchContas();

    const fetchLancamentos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/lancamentos');
            setLancamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar lancamento:', error);
        }
    };

    fetchLancamentos();

    atualizarDadosHome();
  }, [isModalOpenReceita, isModalOpenDespesas, isModalOpenTransferencia]);

  const percorrerContas = (idConta) => {
    let nomeConta;
    contas.forEach(conta => {
      if(idConta == conta.id_conta){
        nomeConta = conta.nome_banco;
      }
    });
    return nomeConta;
  };

  const formatarData = (dataString) => {
    // Cria um objeto Date a partir da string de data
    const data = new Date(dataString);
  
    // Obtém o dia, mês e ano
    const dia = String(data.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0 (Janeiro = 0)
    const ano = data.getFullYear();
  
    // Retorna a data no formato dd-mm-aaaa
    return `${dia}-${mes}-${ano}`;
  };

  function faturaAbertaAtual(dataDeVencimento) {
    const today = new Date();
    const diaAtual = today.getDate();
    const mesAtual = today.getMonth() + 1; // Janeiro é 0
    const anoAtual = today.getFullYear();
    
    let mesReferencia = mesAtual;
    let anoReferencia = anoAtual;

    if (diaAtual > dataDeVencimento) {
        mesReferencia = mesAtual + 1;
        if (mesReferencia > 12) {
            mesReferencia = 1;
            anoReferencia += 1;
        }
    }

    const mesReferenciaString = mesReferencia.toString().padStart(2, '0'); // Formata para duas casas decimais
    const anoMesReferencia = `${mesReferenciaString}/${anoReferencia}`;

    console.log(anoMesReferencia);
  }

  return (
    <section className={styles.telaHome}>
      <div className={styles.container01}>
        <div className={styles.boxInfInicial}>
          <div className={styles.myWallet}>
            <img src={carteira} alt="" />
            <h1>BolsoPro</h1>
            <h2>Saldo</h2>
            <h3>{formatarParaReal(saldoTotal)}</h3>
            <h2>Investimentos</h2>
            <h3>{formatarParaReal(investimentosTotal)}</h3>
            <h2>Criptomoedas</h2>
            <h3>{formatarParaReal(criptomoedas)}</h3>
          </div>
          <div className={styles.infMensal}>
            <h1>Resumo Mensal</h1>
            <h2>Entrada</h2>
            <img src={rendaMensal} alt="" />
            <h3>{formatarParaReal(valorEntradaMes)}</h3>
            <h2>Saída</h2>
            <img src={despesasMensal} alt="" />
            <h3>{formatarParaReal(valorSaidaMes)}</h3>
            <div className={styles.boxAtalhos}>
              <h2></h2>
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleReceitaClick}>Receitas</button>
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleDespesasClick}>Despesas</button>
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleTransferenciaClick}>Transf.</button>
                {isModalOpenReceita && (
                  <ModalReceita onClose={closeModalReceita} />
                )}
                {isModalOpenDespesas && (
                  <ModalDespesas onClose={closeModalDespesas} />
                )}
                {isModalOpenTransferencia && (
                  <ModalTransferencia onClose={closeModalTransferencia} />
                )}
            </div>
          </div>
        </div>
        <div className={styles.boxPlanejamentos}>
          <div className={styles.boxPlanosIndividual}>
            <BoxPlanosConquista icone={carteira} titulo="PS5" vMensal="R$ 120,00" valorColetado="R$ 1.100,00" valorRestante="R$ 600,00" />
            <BoxPlanosConquista icone={carteira} titulo="Carro" vMensal="R$ 300,00" valorColetado="R$ 8.400,00" valorRestante="R$ 30.600,00" />
            <BoxPlanosConquista icone={carteira} titulo="Computador Gamer" vMensal="R$ 200,00" valorColetado="R$ 3.600,00" valorRestante="R$ 1.600,00" />
            <BoxPlanosConquista icone={carteira} titulo="New Zelândia" vMensal="R$ 400,00" valorColetado="R$ 11.800,00" valorRestante="R$ 10.600,00" />
          </div>
        </div>
        <div className={styles.boxTabelaUltimosLancamentos}>
          <table className={styles.tableUltimosLancamentos}>
            <colgroup>
              <col style={{ width:'12%'}} />
              <col style={{ width:'38%'}} />
              <col style={{ width:'8%'}} />
              <col style={{ width:'21%'}} />
              <col style={{ width:'21%'}} />
            </colgroup>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>Data</th>
                <th className={styles.th}>Descrição</th>
                <th className={styles.th}></th>
                <th className={styles.th}>Conta</th>
                <th className={styles.th}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.slice(-10).reverse().map((lancamento) => (
                <tr key={lancamento.id_lancamentos} className={stylesTr.tr}>
<                 TabelaLancamentos index={lancamento.id_lancamentos} data={formatarData(lancamento.data_lancamento)} descricao={lancamento.descricao} icon={carteira} conta={percorrerContas(lancamento.id_conta)} valor={lancamento.valor}></TabelaLancamentos>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container02}>
        <div className={styles.boxMeusCartoes}>
          <div className={styles.carrocelCartao}>
            <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className={styles.swiper_container} onSlideChange={handleSlideChange}>
              {contas.map((conta) => (
                <SwiperSlide className={styles.swiper_slide} key={conta.id_conta}><Cartao className={styles.cartao1} nomeCartao={conta.nome_banco} bandeira="---" nomeCompleto="Pedro Spíndola" ultimosNumero="****" validadeAno="08" validadeMes="31" /></SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.informacaoCartao}>
            <div className={styles.boxInforPadrao}>
              <h3>Disponível</h3>
              <h2>{formatarParaReal(contaAtivaId ? contaAtivaId.saldo_conta : 0)}</h2>
            </div>
            <div className={styles.boxInforPadrao}>
              <h3>Fatura Atual</h3>
              <h2>---</h2>
            </div>
            <div className={styles.boxInforPadrao}>
              <h3>Data de fechamento</h3>
              <h2>{contaAtivaId ? contaAtivaId.fechamento_cartao : ""}</h2>
            </div>
            <div className={styles.boxInforPadrao}>
              <h3>Variação Mensal</h3>
              <h2>0.00%</h2>
            </div>
            <div className={styles.graficoFaturaMensal}>

            </div>
          </div>
        </div>
        <div className={styles.boxListaMaioresGastos}>
          
        </div>
        <div className={styles.boxGraficoAnual}>
          
        </div>
      </div>
    </section>
  )
}

export default Home