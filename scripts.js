//VARIAVEIS
let campoPesquisar = $("#inputPesquisar")
let botaoPesquisar = $("#buttonPesquisar")
let cardResultado = $("#cardResultado")
let infoFilmes = $("#infoFilmes")
let disponibilidadeStreaming = $("#disponibilidadeStreaming")

//EVENTOS
botaoPesquisar.click(function () {
    if (campoPesquisar.val() === '') {
        alert("digite algo")
    } else {
        pesquisar()
    }
})

//FUNÇÕES
async function pesquisar() {
    let filmePesquisado = campoPesquisar.val()
    alert(filmePesquisado)
    let pesquisarFilme = await apiPesquisarFilme()
    console.log(pesquisarFilme)
}

async function apiPesquisarFilme() {
    var raw = "";

    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };

    fetch("http://www.omdbapi.com/?apikey=85cb41f0&t=titanic", requestOptions)
        .then(response => response.text())
        .then(result => alert(result))
        .catch(error => alert('error', error));
}