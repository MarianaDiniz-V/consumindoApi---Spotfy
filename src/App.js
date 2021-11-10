import { useState } from 'react';
import token from './getSportyToken';
import getArtistas from './getArtistas';

<link href='./index.css'></link>

function App() {
  const [pesquisa, setPesquisa] = useState('');
  const [musica, setMusica] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

  const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q=${pesquisa}&limit=7&type=track`;

  async function handleChange(event) {
    setCarregando(true);
    setErro(false);
    event.preventDefault();
    const token_sportfy = await token();
    try {
      const response = await fetch(baseURL(pesquisa), {
        headers: {
          Authorization: token_sportfy
        }
      })

      const { tracks } = await response.json();
      setMusica(tracks.items)
    } catch (error) {
      setErro(true);
    }
    setCarregando(false)
  }

  function Card({ musica }) {
    const { name, album, external_urls, artists } = musica;
    return (
      <div className='card'>
        <a href={external_urls.spotfy}>
          <img src={album.images[0].url}></img>
        </a>
        <div className='infos'>
          <span>{name}</span> <br />
          <span>{getArtistas(artists)}</span>
        </div>

      </div>
    )
  }

  return (
    <div className="App">
      <form onSubmit={handleChange}>
        <input
          placeholder='Busque uma musica'
          onChange={input => setPesquisa(input.target.value)}
        ></input>
        {carregando && <span className='loading'>Carregando...</span>}

        {erro && <span>Ocorreu um erro :(</span>}

        {!erro && musica.map(musica => (
          <Card musica={musica} />
        ))}
      </form>
    </div>
  );
}


export default App;
