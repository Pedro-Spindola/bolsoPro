import styles from "./Home.module.css"
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
            <BoxPlanosConquista icone={carteira} titulo="PS5" meta="R$ 3.000,00" valorColetado="R$ 1.400,00" valorRestante="R$ 1.600,00" />
          </div>
        </div>
        <div className={styles.boxTabelaUltimosLancamentos}>
          
        </div>
      </div>
      <div className={styles.container02}>
        <div className={styles.boxMeusCartoes}>
          <div className={styles.carrocelCartao}>
            <Cartao className={styles.cartao} nomeCartao="NuBank" bandeira="Mastercard" nomeCompleto="Pedro Spíndola" ultimosNumero="0366" validadeAno="08" validadeMes="31" />
          </div>
          <div className={styles.informacaoCartao}>

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