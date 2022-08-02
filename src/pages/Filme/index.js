import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify'


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
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || []; //pega os filmes salvos no localStorage

        const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id); //verifica se o filme já está salvo

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme); //adiciona o filme na lista
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos)); //salva a lista no localStorage
        toast.success("Filme salvo com sucesso!");
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