async function carregarDados() {
    //  Ocultar a div de erro (se ela estiver visível)
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';

    // Chamando a API para obter os dados 
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries') // Chamando endereço da API
        .then(response => response.json())  // Obtendo a resposta e formatando como JSON
        .then(dados => prepararDados(dados))  // Chamando função para gerar HTML dinâmico
        .catch(e => exibirErro(e.message));  // Exibindo erro na div-erro
}

// função para mostrar o erro (quando ocorrer)

function exibirErro(mensagem) {
    let divErro = document.getElementById('div-erro');
    divErro.innerHTML = '<b>Erro ao acessar a API</b><br />' + mensagem;
    divErro.style.display = 'block';
}

// função para preparar os dados e gerar o HTML dinâmico

function prepararDados(dados) {
    //Dados para o Mapa
    dados_mapa = [['Pais', 'Casos']];
    let pais = 0;
    let casos = 0;

    //Dados para Grafico
    dados_pizza = [['Status', 'Total']];
    let confirmados = 0;
    let mortos = 0;
    let recuperados = 0;


    for (let i = 0; i < dados['data'].length; i++) {
        // Pega info. por pais e ja adiciona no vetor dados mapa
        pais = dados['data'][i].country;
        casos = dados['data'][i].confirmed;
        dados_mapa.push([pais, casos]);

        //para dados do grafico, fazer o somatorio das variaveis e adicionar no vetor no final
        confirmados = confirmados + dados['data'][i].confirmed;
        mortos = mortos + dados['data'][i].deaths;
        recuperados = recuperados + dados['data'][i].recovered;
    }

    dados_pizza.push(['Confirmados', confirmados]);
    dados_pizza.push(['Mortes', mortos]);
    dados_pizza.push(['Recuperados', recuperados]);

    desenharMapa();
    desenharGráficoDePizza();

}

var dados_mapa = [
    ['Pais', 'Casos'],
    ['0', 0]
];

var dados_pizza = [
    ['Status', 'Total'],
    ['0', 0]
];

// ---- tabela ---- //

async function carregarOsDados() {

    /* algumas partes já estão la em cima, só vamos criar outra função para conectar a outra API */

    // Chamando a API para obter os dados 
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1') // Chamando endereço da API
        .then(response => response.json())  // Obtendo a resposta e formatando como JSON
        .then(dados => prepararOsDados(dados))  // Chamando função para gerar HTML dinâmico
        .catch(e => exibirErro(e.message));  // Exibindo erro na div-erro
}

function prepararOsDados(dados) {
    let linhas = document.getElementById('linha');
    linhas.innerHTML = '';

    // laço For para percorrer todos os dados recebidos 
    for (let i = 0; i < dados['data'].length; i++) {
        let auxLinha = '';

        auxLinha = auxLinha + '<tr>' + '<td>' + dados['data'][i].uf + '</td>'
            + '<td>' + dados['data'][i].state + '</td>'
            + '<td>' + dados['data'][i].cases + '</td>'
            + '<td>' + dados['data'][i].deaths + '</td>'
            + '<td>' + dados['data'][i].suspects + '</td>'
            + '<td>' + dados['data'][i].refuses + '</td>' + '</tr>';

        // Inserindo o HTML gerado (linha) no innerHTML da TBody
        linhas.innerHTML = linhas.innerHTML + auxLinha
    }

    //desenharTabela()
}

var dados_tabela = [
    ['Sigla', 'Estado', 'Casos', 'Mortes', 'Suspeitos', 'Descartados'],
    ['0', 0, 0, 0, 0, 0]
];

document.addEventListener('DOMContentLoaded', function (event) {
    carregarDados();
    carregarOsDados();
    }
);