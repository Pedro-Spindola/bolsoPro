import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import styles from "./Navbar.module.css"
import Button from "./Button"
import menuHamburgue from "../image/menu.svg"
import logotipo from "../image/logoBolsoPro.png"
import clima from "../image/clima.svg"
import perfil from "../image/perfil.jpg"

const Navbar = () => {
    const [dataAtual, setDataAtual] = useState("");

    useEffect(() => {
        // Função para atualizar a hora e data
        const atualizarDataHora = () => {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const segundos = agora.getSeconds().toString().padStart(2, '0');
        const dia = agora.getDate().toString().padStart(2, '0');
        const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // Meses são de 0 a 11
        const ano = agora.getFullYear();

        const dataHoraFormatada = `${horas}:${minutos}:${segundos} - ${dia}/${mes}/${ano}`;
        setDataAtual(dataHoraFormatada);
        };

        // Atualizar a cada segundo
        const intervalo = setInterval(atualizarDataHora, 1000);
        // Limpeza do intervalo ao desmontar o componente
        return () => clearInterval(intervalo);
    }, []);

    return (
        <nav className={styles.nav}>
            <div className={styles.menuNomeUsuario}>
                <div className={styles.perfilUsuario}>
                    <img src={perfil}></img>
                </div>
                <div className={styles.containerTextoMsgInicial}>
                    <div className={styles.msgSaudacao}>
                        <h1>Boa noite!</h1>
                        <img className={styles.iconeSaudacao} src={clima}></img>
                    </div>
                    <div className={styles.boxNomeUsuario}>
                        <h2>Pedro Spíndola</h2>
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    <Link className={styles.link} to="/"><a href="">Home</a> </Link>
                </li>
                <li>
                    <Link className={styles.link} to="/"><a href="">Lançamentos</a> </Link>
                </li>
                <li>
                    <Link className={styles.link} to="/"><a href="">Relatórios</a> </Link>
                </li>
                <li>
                    <Link className={styles.link} to="/"><a href="">Opções</a> </Link>
                </li>   
            </ul>
            <div className={styles.footer}>
                <img className={styles.logotipoBolsoPro} src={logotipo}></img>
                <h2 className={styles.dataAtual}>{dataAtual}</h2>
            </div>
        </nav>
    )
}
// Usar uma props no nome de saudação (Boa tarde, boa noite, bom dia, etc...)
export default Navbar