import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api';
import './filme-info.css';

function Filme(){
    const { id } = useParams(); //pega o id da url
    const navigate = useNavigate(); //pega o navigate do react-router-dom
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){ //carrega o filme
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "7d4cefdba1d08bf59e2b24510f19eb18",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data); //seta o filme
                console.log(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme não encontrado")
                navigate('/', { replace: true }); //redireciona para a home
                return;
            })
        }
        loadFilme();

        return() => {
            console.log("COMPONENTE FOI DESMONTADO");
        }

    },[navigate, id])

    function salvarFilme(){
        alert("TESTE");
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;