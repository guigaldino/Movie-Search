// VARIÁVEIS
let campoPesquisar = $("#inputPesquisar");
let botaoPesquisar = $("#buttonPesquisar");
let cardResultado = $("#cardResultado");
let infoFilmes = $("#infoFilmes");
let disponibilidadeStreaming = $("#disponibilidadeStreaming");

// EVENTOS
botaoPesquisar.click(function () {
    if (campoPesquisar.val() === '') {
        alert("Digite algo");
    } else {
        pesquisar();
    }
});

// FUNÇÕES
async function pesquisar() {
    let filmePesquisado = campoPesquisar.val();
    let pesquisarFilme = await apiPesquisarFilme(filmePesquisado)
    inserirInformacoes(pesquisarFilme)
}

function inserirInformacoes(array){
    let imgUrl = array.Poster
    imgUrl = imgUrl.replace(/^["'](.+(?=["']$))["']$/, '$1')
    console.log(imgUrl)
    let poster = $("<img>").attr('src', imgUrl)
    infoFilmes.append(poster)
}

async function apiPesquisarFilme(titulo) {
    var raw = "";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=85cb41f0&t=${titulo}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        alert('error', error);
    }
}
