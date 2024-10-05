// VARIÁVEIS

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjc1ZTc3MTJjYjBlZDZiNjA0OGQ4NzNhZjU0Y2I1OSIsIm5iZiI6MTcyODAwOTQxNS4zNjM0NjIsInN1YiI6IjY2NmFmYjM1Njc2NmYwM2IyOWE3OWZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fk0CeMyOgJLoRE66PiYDrYtlTc6mPGr5QCo3tkYODvo";

let campoPesquisa = $("#inputPesquisar");
let btnPesquisar = $("#btnPesquisar");


// EVENTOS
btnPesquisar.click(function () {
    pesquisarFilme();
});


// FUNÇÕES
async function pesquisarFilme() {
    let nomeFilme = campoPesquisa.val();
    if (nomeFilme == "") {
        alert("Digite o nome de um filme para pesquisar.");
        return;
    }
    await ApiPesquisarFilme(nomeFilme);
}


// REQUISIÇÕES
async function ApiPesquisarFilme(nomeFilme) {

    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${nomeFilme}&include_adult=&language=&page=2&year=`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error("Erro em pesquisaFilme(). ERRO HTTP: " + response.status);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        alert("Erro ao pesquisar filme. Detalhes: " + error);
        console.error('error', error);
    }
}





