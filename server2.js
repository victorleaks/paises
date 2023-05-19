const http = require('http');
const fs = require('fs');

// Define o caminho para o arquivo paises.json
const pathToFile = __dirname + '/paises.json';

http.createServer((req, res) => {

  if (req.url === '/paises') {
    // Define o cabeçalho da resposta para JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Lê o arquivo paises.json
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      var paisesPrimeiros20 = [];

      paises.forEach((element, index) => { // Adiciona um parâmetro "index" à função forEach

        if (index < 20) { // Verifica se o índice é menor que 20
          paisesPrimeiros20.push(element.nome_pais);
        }

      });

      // Gera a resposta HTTP com o conteúdo JSON contendo apenas os primeiros 20 países
      res.statusCode = 200;
      res.end(JSON.stringify(paisesPrimeiros20));
    });
  }

  else if (req.url === '/paisescomb') {
    // Define o cabeçalho da resposta para JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Lê o arquivo paises.json
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      var paisescomb = [];

      paises.forEach(element => {

        var nometemporario = element.nome_pais;

        nometemporario = String(nometemporario);

        var primeiraletra = nometemporario.substr(0,1);

        if(primeiraletra == "B"){

          paisescomb.push(element.nome_pais);

          console.log(nometemporario);
          
        }
        
      });

      // Gera a resposta HTTP com o conteúdo JSON
      res.statusCode = 200;
      res.end(JSON.stringify(paisescomb));
    });
  } else if (req.url === '/siglas') {
    // Define o cabeçalho da resposta para JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Lê o arquivo paises.json
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      var siglas = [];

      paises.forEach(element => {
        siglas.push(element.sigla);
        
      });
      

      // Gera a resposta HTTP com o conteúdo JSON contendo apenas as siglas
      res.statusCode = 200;
      res.end(JSON.stringify(siglas));
    });
  } 

  else {
    // Se a URL não for /paises, envia o arquivo index.html
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin' : '*'
    });
    let readStream = fs.createReadStream(__dirname + '/index.html');
    readStream.pipe(res);
  }
}).listen(5000);

console.log('Visite-me em: http://localhost:5000');