import React, { useEffect, useState } from 'react';
import styles from "./Opcao.module.css"
import opcaoImg from "../image/moedas.png"
import ModalNovaConta from "../components/ModalNovaConta"

function Opcao() {

    const [isModalOpenNewCont, setIsModalOpenNewCont] = useState(false);
    const [minhasContas, setMinhasContas] = useState([])

    const handleNewContClick = () => {
        setIsModalOpenNewCont(true);
    };

    const closeModalNewCont = () => {
        setIsModalOpenNewCont(false);
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

  return (
    <section className={styles.telaOpcao}>
        <div className={styles.container01}>
            <div className={styles.boxMenuOpcao}>
                <img src={opcaoImg} alt="" />
                <a>Perfil</a>
                <a>Conta</a>
                <a>Categorias</a>
            </div>
        </div>
        <div className={styles.container02}>
            <div className={styles.boxTableInformacao}>
                <div className={styles.boxModeloConta}>
                    <h2>Contas</h2>
                    <button onClick={handleNewContClick} >Adicionar conta</button>
                    <table>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}></th>
                                <th className={styles.th}></th>
                                <th className={styles.th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {minhasContas
                                .map((conta) => (
                                    <tr key={conta.id}>
                                        <td><img className={styles.imgLogotipo} src={opcaoImg} alt="" /></td>
                                        <td>{conta.nome}</td>
                                        <td><img className={styles.iconeEditar} src={opcaoImg} alt="" /></td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {isModalOpenNewCont && (
            <ModalNovaConta onClose={closeModalNewCont} />
        )}
    </section>
  )
}

export default Opcao