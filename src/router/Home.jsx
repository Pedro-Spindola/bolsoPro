import styles from "./Home.module.css"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
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

const Home = () => {

  const [minhasContas, setMinhasContas] = useState([])
  const [contaAtivaId, setContaAtivaId] = useState(minhasContas[1]?.id || null);

  // Estado para controlar a visibilidade do modal
  const [isModalOpenReceita, setIsModalOpenReceita] = useState(false);
  const [isModalOpenDespesas, setIsModalOpenDespesas] = useState(false);

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

  useEffect(function(){

    fetch('http://localhost:5000/contas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    .then(resp => resp.json())
    .then(data => {
        setMinhasContas(data)
    })
    .catch(err => {
        console.log(err)
    })
  }, [minhasContas])

  useEffect(() => {
    // Define a conta inicial apenas se o swiper não estiver inicializado ainda
    if (!contaAtivaId && minhasContas.length > 0) {
      setContaAtivaId(minhasContas[0]);
    }
  }, [minhasContas, contaAtivaId]);
  
  const handleSlideChange = (swiper) => {
    const novaContaAtiva = minhasContas[swiper.activeIndex];
    setContaAtivaId(novaContaAtiva);
  };

  const handleButtonTeste = (event) =>{
    console.log(contaAtivaId);
  }

  function formatarParaReal(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  return (
    <section className={styles.telaHome}>
      <div className={styles.container01}>
        <div className={styles.boxInfInicial}>
          <div className={styles.myWallet}>
            <img src={carteira} alt="" />
            <h1>BolsoPro</h1>
            <h2>Saldo</h2>
            <h3>R$ 2.890,00</h3>
            <h2>Investimentos</h2>
            <h3>R$ 22.520,00</h3>
            <h2>Criptomoedas</h2>
            <h3>R$ 890,40</h3>
          </div>
          <div className={styles.infMensal}>
            <h1>Resumo Mensal</h1>
            <h2>Entrada</h2>
            <img src={rendaMensal} alt="" />
            <h3>R$ 4.580,00</h3>
            <h2>Saída</h2>
            <img src={despesasMensal} alt="" />
            <h3>R$ 2.120,00</h3>
            <div className={styles.boxAtalhos}>
              <h2>Atalhos</h2>
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleReceitaClick} >Receita</button>
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleDespesasClick}>Despesas</button>
              <button className={`${styles.btnNewReceita} ${styles.btnAtalhos}`} onClick={handleButtonTeste}>Transf.</button>
                {isModalOpenReceita && (
                  <ModalReceita onClose={closeModalReceita} />
                )}
                {isModalOpenDespesas && (
                  <ModalDespesas onClose={closeModalDespesas} />
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
              {minhasContas.map((conta) => (
                <SwiperSlide className={styles.swiper_slide} key={conta.id}><Cartao className={styles.cartao1} nomeCartao={conta.nome} bandeira="---" nomeCompleto="Pedro Spíndola" ultimosNumero="****" validadeAno="08" validadeMes="31" /></SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.informacaoCartao}>
            <div className={styles.boxInforPadrao}>
              <h3>Disponível</h3>
              <h2>{formatarParaReal(contaAtivaId ? contaAtivaId.saldo : 0)}</h2>
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