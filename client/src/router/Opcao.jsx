import React, { useEffect, useState } from 'react';
import styles from "./Opcao.module.css"
import opcaoImg from "../image/moedas.png"
import ModalNovaConta from "../components/ModalNovaConta"
import axios from 'axios';

function Opcao() {

    const [isModalOpenNewCont, setIsModalOpenNewCont] = useState(false);
    const [contas, setContas] = useState([]);
    
    const handleNewContClick = () => {
        setIsModalOpenNewCont(true);
    };

    const closeModalNewCont = () => {
        setIsModalOpenNewCont(false);
    };

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
                                {contas.map((conta) => (
                                    <tr key={conta.id_contas}>
                                        <td>
                                            <img src={opcaoImg}/>
                                        </td>
                                        <td>{conta.nome_banco}</td>
                                        <td>
                                            <img src={opcaoImg}/>
                                        </td>
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