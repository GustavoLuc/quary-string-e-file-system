const http = require('http');
const queryString = require('query-string')
const url = require('url');
var fs = require('fs');

const hostname = 'https://gustavoluc.github.io/quary-string-e-file-system/';
const port = 3001;

const server = http.createServer((req, res) => {

var resposta

const urlparse =  url.parse(req.url,true);

const params = queryString.parse(urlparse.search);

//criar um usuario - //atualizar um usuario 

        //ex : http://127.0.0.1:4001/criar-usuario?id=4&nome=Fernendo&idade=50
    if(urlparse.pathname=='/criar-usuario'){
      // receber informacoes do usuario
    

    // salvar as informacoes
    fs.writeFile('users/'+params.id+'.txt',JSON.stringify(params),function (err) {
        if (err) throw err;
        console.log('Saved!');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);
       
    });
    resposta = 'Usuario criado com Sucesso'

   
    //selacionar usuario 
    // ex: http://127.0.0.1:4001/selecionar-usuario?id=4
}else if(urlparse.pathname=='/selecionar-usuario'){
    fs.readFile('users/'+params.id+'.txt', function(err, data) {
    resposta = data;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(resposta);
    
    })  
    //remover usuario
    // ex: http://127.0.0.1:4001/remover-usuario?id=4
}else if(urlparse.pathname=='/remover-usuario'){
    fs.unlink('users/'+params.id+'.txt', function(err) {
    resposta = 'usuario removido ';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(resposta);
    console.log('File deleted!');
    
    })  
};
  

    //remover usuario
     


 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});