// VARIÁVEIS

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjc1ZTc3MTJjYjBlZDZiNjA0OGQ4NzNhZjU0Y2I1OSIsIm5iZiI6MTcyODAwOTQxNS4zNjM0NjIsInN1YiI6IjY2NmFmYjM1Njc2NmYwM2IyOWE3OWZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fk0CeMyOgJLoRE66PiYDrYtlTc6mPGr5QCo3tkYODvo";

let campoPesquisa = $("#inputPesquisar");
let btnPesquisar = $("#btnPesquisar");
let filmeContainer = $("#filmeContainer");
let gridFilmes;

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
    let retornoFilmes = JSON.parse(await ApiPesquisarFilme(nomeFilme));
    let dadosFilmes = retornoFilmes.results;
    console.log(dadosFilmes);
    montaGridFilmes(dadosFilmes)
}

// function criarDataTable() {
//     // Criar estrutura HTML da tabela e inserir no container
//     const tableHTML = `
//     <table id="filmes" class="display">
//         <thead>
//             <tr>
//                 <th>Poster</th>
//                 <th>Título</th>
//                 <th>Ano de Lançamento</th>
//                 <th>Descrição</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td><img src="poster1.jpg" alt="Poster 1" width="50"></td>
//                 <td>Filme 1</td>
//                 <td>2021</td>
//                 <td>Descrição do Filme 1</td>
//             </tr>
//             <tr>
//                 <td><img src="poster2.jpg" alt="Poster 2" width="50"></td>
//                 <td>Filme 2</td>
//                 <td>2020</td>
//                 <td>Descrição do Filme 2</td>
//             </tr>
//             <tr>
//                 <td><img src="poster3.jpg" alt="Poster 3" width="50"></td>
//                 <td>Filme 3</td>
//                 <td>2019</td>
//                 <td>Descrição do Filme 3</td>
//             </tr>
//         </tbody>
//     </table>
// `;
//     // Iniciar o dataTable
//     // Inserir dados no dataTable

// }


// REQUISIÇÕES
async function ApiPesquisarFilme(nomeFilme) {

    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${nomeFilme}&include_adult=&language=&page=1&year=`;

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
        return result;
    } catch (error) {
        alert("Erro ao pesquisar filme. Detalhes: " + error);
        console.error('error', error);
    }
}

function montaGridFilmes(dadosFilmes) {
    gridFilmes = $("#filmeContainer").dxDataGrid({
        dataSource: dadosFilmes,
        keyExpr: 'id',
        noDataText: 'Nenhum filme encontrado',
        editing: {
            mode: "row",
            allowUpdating: false,
            allowAdding: false,
            allowDeleting: false,
        },
        columns: [
            {
                dataField: "id",
                caption: "Id",
                visible: false,
            },
            {
                dataField: "original_title",
                caption: "Título",
                visible: true,
            }
            
        ],
    }).dxDataGrid("instance")
}
