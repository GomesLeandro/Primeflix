import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filmes, setFilmes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      async function loadFilme() {
        await api.get(`/movie/${id}`, {
            params:{
                api_key: "65acaff68f0de4fb74095acf48b99fb2",
                language: "pt-BR",
            }
        })
        .then((response)=>{
            setFilmes(response.data);
            setLoading(false);
        })
        .catch(()=>{ //direcionamento quando digite filme errado
            navigate("/", {replace: true})
            return;
        })
      }

      loadFilme();

      return() => {
        console.log("COMPONENTE FOI DESMONTADO")
      }
    }, [navigate, id])

    function salvarFilme(){ // SALVANDO FILMES EM LOCALSTORAGE
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filmes.id)

        if(hasFilme){ 
        toast.warn("Esse filme já está na sua lista!")
        return;
        }

        filmesSalvos.push(filmes);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filmes.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`} alt={filmes.title} />

            <h3>Sinopse</h3>
            <span>{filmes.overview}</span>

            <strong>Avaliação: {filmes.vote_average} / 10</strong>

        <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filmes.title}Trailer`}>Trailer</a>
            </button>
        </div>

        </div>
    )
}

export default Filme;