import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos(){
    const [filme, setFilme] = useState([])

    useState(()=>{

        const minhaLista = localStorage.getItem("@primeflix");
        setFilme(JSON.parse(minhaLista) || [])
    
    }, [])


    function excluirFilme(id){
        let filtroFilme = filme.filter( (item) => {
            return (item.id !== id)
        })

        setFilme(filtroFilme);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilme) )
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filme.length === 0 && <span>Você não possui nenhum filme salvo &#128531;</span>}

            <ul>
                {filme.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;