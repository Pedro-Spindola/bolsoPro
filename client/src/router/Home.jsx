import styles from "./Home.module.css"
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
  };

  const handleButtonTeste = (event) =>{
    console.log(contaAtivaId);
  }

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
  }, []);

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
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleReceitaClick} >Receitas</button>
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
              <col style={{ width:'14%'}} />
              <col style={{ width:'14%'}} />
              <col style={{ width:'14%'}} />
            </colgroup>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>Data</th>
                <th className={styles.th}>Descrição</th>
                <th className={styles.th}></th>
                <th className={styles.th}>Categoria</th>
                <th className={styles.th}>Conta</th>
                <th className={styles.th}>Valor</th>
              </tr>
            </thead>
            <tbody>
              <TabelaLancamentos data="21/10/2024" descricao="Gasolina" icon={carteira} categoria="Transporte" conta="Nubank" valor="R$ 80,00"></TabelaLancamentos>
              <TabelaLancamentos data="21/10/2024" descricao="Gasolina" icon={carteira} categoria="Transporte" conta="Nubank" valor="R$ 80,00"></TabelaLancamentos>
              <TabelaLancamentos data="21/10/2024" descricao="Gasolina" icon={carteira} categoria="Transporte" conta="Nubank" valor="R$ 80,00"></TabelaLancamentos>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container02}>
        <div className={styles.boxMeusCartoes}>
          <div className={styles.carrocelCartao}>
            <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className={styles.swiper_container} onSlideChange={handleSlideChange}>
              {contas.map((conta) => (
                <SwiperSlide className={styles.swiper_slide} key={conta.id_contas}><Cartao className={styles.cartao1} nomeCartao={conta.nome_banco} bandeira="---" nomeCompleto="Pedro Spíndola" ultimosNumero="****" validadeAno="08" validadeMes="31" /></SwiperSlide>
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