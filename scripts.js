let chave = "Copiar e cola sua chave aqui!";

function colocarNaTela(dados) {
    // Se a API retornar código de erro de cidade ou autenticação
    if (!dados || dados.cod === "404" || dados.cod === 404 || dados.cod === "401" || dados.cod === 401) {
        document.querySelector(".cidade").innerHTML = "Cidade não encontrada";
        return;
    }

    console.log("Dados recebidos da API:", dados);
    
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
}

async function buscarCidade(cidade) {
    if (!cidade || !cidade.trim()) return; 

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${chave}&lang=pt_br&units=metric`;
        
        let resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Erro na API: ${resposta.status}`);
        }

        let dados = await resposta.json();
        colocarNaTela(dados);
    } catch (erro) {
        console.error("Erro detalhado na requisição:", erro);
        document.querySelector(".cidade").innerHTML = "Erro ao buscar dados";
    }
}

function cliqueiNoBotao() {
    let input = document.querySelector(".input-cidade");
    if (input) {
        buscarCidade(input.value);
    } else {
        console.error("Input não foi encontrado no HTML!");
    }
}
