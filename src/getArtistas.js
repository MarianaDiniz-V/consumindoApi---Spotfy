export default function getArtistas(artistas) {
    const nomes = artistas.map(artista => artista.name)
    return nomes.join(', ');
}