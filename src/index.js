
const express = require('express');
const createMapper = require("map-factory");

const port = 3000;
var app = express();

app.get('/teste/:nome', (req, res) => {
    res.send({"nome": req.params.nome,"idade": req.query.idade})
    res.status(200);

});

app.get('/map/teste', (req, res) => {
  res.send({"nome": "Bruno", "idade":{"idade01": "18", "idade02": "19"}, "email": ["bruno@silva.com"] })

});

app.get('/map', (req, res) => {
    const mapper = createMapper();
    const source = {
                        "nome": "Bruno",
                        "idade": {
                            "idade1": "22 anos",
                            "idade2": "24 anos",
                        },
                        "numeros": [1,2,3],
                    };

    mapper
        .map("nome").to("Bruno")
        .map("idade.idade1").to("idade do aluno")
        .map("idade.idade2").to("idade do outro aluno")
        .map("numeros").to("numeros da sorte");

    const resultado = mapper.execute(source);
    res.send(resultado);
    res.status(200);
    console.log(resultado);
});


app.get('/mape', (req, res) => {
    const mapper = createMapper();
    const source = {
                    "nome": "Bruno",
                    "idade": "22 anos",
                    "numeros": {
                        "numero01": [22,23, 34],
                        "numero02": "24",
                    }
                    };
    mapper
        .map("nome").to("Brunão")
        .map("idade").to("idade do aluno")
        .map("numeros.numero01").to("numeros da sorte")
        .map("numeros.numero02").to("numero da sorte");

    const resultado = mapper.execute(source);
    res.send(resultado);
    res.status(200);
    console.log(resultado);
});

app.get('/map/async', (req, res) => {
    const mapper = createMapper();
    const source = {
                    "nome": "Bruno",
                    "idade": "22 anos",
                    "numeros": {
                        "numero01": [22,23, 34],
                        "numero02": "24",
                    }};
    mapper
        .map("nome").to("Brunão")
        .map("idade").to("idade do aluno")
        .map("numeros.numero01").to("numeros da sorte")
        .map("numeros.numero02").to("numero da sorte");

    mapper.executeAsync(source)
            .then(source => {
            console.log(source);
            res.send(source);
            res.status(200);
            });
});
   
app.get('/mape/async', async (req, res) => { 
    const mapper = await createMapper();
    const source = await {
                    "nome": "Bruno",
                    "idade": "22 anos",
                    "numeros": {
                        "numero01": [22,23, 34],
                        "numero02": "24",
                    }
                    };
    mapper
        .map("nome").to("Brunão")
        .map("idade").to("idade do aluno")
        .map("numeros.numero01").to("numeros da sorte")
        .map("numeros.numero02").to("numero da sorte");

    const resultado = await mapper.execute(source)
    
    res.send(resultado);
    res.status(200);
    console.log(resultado);
});

app.listen(port, () => {
    console.log('Conexão aberta na porta 3000');
})