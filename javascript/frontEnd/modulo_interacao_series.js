


document.addEventListener('DOMContentLoaded', carregarCategorias);

async function carregarCategorias() {
    const categorias = await buscarCategorias();
    const lista = document.getElementById('categorias');
    lista.innerHTML = '';

    categorias.forEach(cat => {
        const li = document.createElement('li');
        li.textContent = cat.category_name;
        li.onclick = () => carregarSeries(cat.category_id);
        lista.appendChild(li);
    });
}

async function carregarSeries(catID) {
    const series = await buscarSeriesPorCategoria(catID);
    todasSeries = series;     
    const lista = document.getElementById('series');
    const seriesSection = document.getElementById('series-section');
    const detalhesSection = document.getElementById('detalhes-section');


    seriesSection.style.display = 'block';
    detalhesSection.style.display = 'none';
    lista.innerHTML = '';

    series.forEach(serie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${serie.cover}" alt="Capa de ${serie.name}">
            <p>${serie.name}</p>
        `;
        li.onclick = () => carregarDetalhes(serie.series_id);
        lista.appendChild(li);
    });
}

let episodiosPorTemporada = {};
let serieInfoAtual = null;

async function carregarDetalhes(seriesId) {
    const detalhes = document.getElementById('info');
    const episodios = document.getElementById('episodes');
    const dropdown = document.getElementById('seasonDropdown');
    const seriesSection = document.getElementById('series-section');
    const detalhesSection = document.getElementById('detalhes-section');


    seriesSection.style.display = 'none';
    detalhesSection.style.display = 'block';

    const serie = await buscarDetalhesSerie(seriesId);
    const info = serie.info;
    const seasons = serie.seasons;
    const episodes = serie.episodes;


    episodiosPorTemporada = episodes;
    serieInfoAtual = info;

    detalhes.innerHTML = `
        <h3>${info.name}</h3>
        <img src="${info.cover}" alt="Capa de ${info.name}">
        <p><strong>Descrição:</strong> ${info.plot}</p>
        <p><strong>Gênero:</strong> ${info.genre}</p>
        <p><strong>Elenco:</strong> ${info.cast}</p>
        <p><strong>Duração:</strong> ${info.episode_run_time} min</p>
        <p><strong>Nota:</strong> ${info.rating} / 10</p>
    `;


    dropdown.innerHTML = seasons.map(season => `
        <option value="${season.season_number}">Temporada ${season.season_number}</option>
    `).join('');


    dropdown.onchange = () => carregarEpisodios(dropdown.value);


    if (seasons.length > 0) {
        dropdown.value = seasons[0].season_number;
        carregarEpisodios(seasons[0].season_number);
    }
}

function carregarEpisodios(seasonNumber) {
    const episodios = document.getElementById('episodes');
    const lista = episodiosPorTemporada[seasonNumber] || [];

    episodios.innerHTML = `
        <h4>Episódios da Temporada ${seasonNumber}</h4>
        <ul>
            ${lista.map(ep => `
                <li>
                    <button class="btn-assistir" onclick="assistirEpisodio('${ep.id}', '${ep.title}')">${ep.title}</button>
                </li>
            `).join('')}
        </ul>
    `;
}


function assistirEpisodio(episodeId) {
    const url = gerarUrlSerie(episodeId);
    window.open(url, '_blank');
}




let todasSeries = [];

function buscarSeries() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const lista = document.getElementById('series');
    lista.innerHTML = '';

    const filtrados = todasSeries.filter(s =>
        s.name.toLowerCase().includes(termo)
    );

    filtrados.forEach(serie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${serie.cover || 'https://via.placeholder.com/180x240'}" alt="${serie.name}">
            <h3>${serie.name}</h3>
            
        `;
        li.onclick = () => carregarDetalhes(serie.series_id);
        lista.appendChild(li);
    });
}

carregarCategorias();
