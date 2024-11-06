import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import Button from "./Button"
import menuHamburgue from "../image/menu.svg"
import logotipo from "../image/logoBolsoPro.png"

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.menuNomeUsuario}>
            <div className={styles.perfilUsuario}>
                <img></img>
            </div>
            <div className={styles.msgSaudacao}>
                <h1>Boa noite!</h1>
                <img className={styles.iconeSaudacao}></img>
            </div>
            <div className={styles.boxNomeUsuario}>
                <h2>Pedro Spíndola</h2>
            </div>
        </div>
        <ul>
            <Button/>
        </ul>
    </nav>
  )
}
// Usar uma props no nome de saudação (Boa tarde, boa noite, bom dia, etc...)

/*
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/contato">Contatos</Link>
            </li>
        </ul>
        <div className={styles.menuMobile}>
            <img src={menuHamburgue} alt="" />
        </div>
*/
export default Navbar