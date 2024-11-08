import styles from "./Home.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import "swiper/css"
import "swiper/css/effect-cards"
import carteira from "../image/moedas.png"
import rendaMensal from "../image/lucros.png"
import despesasMensal from "../image/perda.png"
import Cartao from "../components/Cartao"
import BoxPlanosConquista from "../components/BoxPlanosConquista"

const Home = () => {
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
            <div className=""></div>
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
        
        </div>
      </div>
      <div className={styles.container02}>
        <div className={styles.boxMeusCartoes}>
          <div className={styles.carrocelCartao}>
            <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className={styles.swiper_container}>
              <SwiperSlide className={styles.swiper_slide}><Cartao className={styles.cartao1} nomeCartao="NuBank" bandeira="Mastercard" nomeCompleto="Pedro Spíndola" ultimosNumero="0366" validadeAno="08" validadeMes="31" /></SwiperSlide>
              <SwiperSlide className={styles.swiper_slide}><Cartao className={styles.cartao2} nomeCartao="Inter" bandeira="Mastercard" nomeCompleto="Pedro Spíndola" ultimosNumero="0485" validadeAno="12" validadeMes="29" /></SwiperSlide>
              <SwiperSlide className={styles.swiper_slide}><Cartao className={styles.cartao3} nomeCartao="Mercado Pago" bandeira="Visa" nomeCompleto="Pedro Spíndola" ultimosNumero="4256" validadeAno="22" validadeMes="28" /></SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.informacaoCartao}>
            <div className={styles.boxInforPadrao}>
              <h3>Disponível</h3>
              <h2>R$ 1.200,00</h2>
            </div>
            <div className={styles.boxInforPadrao}>
              <h3>Fatura Atual</h3>
              <h2>R$ 380,00</h2>
            </div>
            <div className={styles.boxInforPadrao}>
              <h3>Data de fechamneto</h3>
              <h2>12/05</h2>
            </div>
            <div className={styles.boxInforPadrao}>
              <h3>Variação Mensal</h3>
              <h2>2.45%</h2>
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