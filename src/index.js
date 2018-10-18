
const express = require('express');
const createMapper = require("map-factory");

const router = express.Router();
const port = 3000;
var app = express();

app.get('/teste/:top', (req, res) => {
    res.send({"nome": req.params.nome,"idade": req.query.idade})
    console.log(res);
    res.status(200);

});

app.get('/map/teste', (req, res) => {
  res.send({"nome": "Bruno", "idade":{"idade01": "18", "idade02": "19"}, "email": ["bruno@silva.com"] })

});

app.get('/map', (req, res) => {
    const mapper = createMapper();
    const source = {
                        "nome": "Brunooo",
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

router.get("/user", (req, res) => { 
    res.send({"nome": "Bruno"});
});
app.use(router);

router.param('user_id', (req, res, next, id, name) => {
    req.user = {
        id: id,
        name: "bruno"
    };
    next();
    });
  
    router.route('/users/:user_id')
        .all((req, res, next) => {
        next();
    })
        .get((req, res, next) => {
        res.json(req.user);

    })
        .put((req, res, next) => {
        req.user.name = req.params.name;
        res.json(req.user);
    })
        .post((req, res, next) => {
        next(new Error('not implemented'));
    })
        .delete((req, res, next) => {
        next(new Error('not implemented'));
    });


router.use((req, res, next) => { 
    console.log('Metho da request: %s, Caminho da request: %s, status da resposta: %s', req.method, req.url, res.statusCode);
    if (res.statusCode == 200) { 
        console.log({"aluno": "Bruno", "notas": {"nota1": 10, "nota2": 9}, "geral": [10,10,5,1,8]});
    }
    next();
});

router.use('/bar', (req, res, next) => { 
    res.send({"nome": "bruno"});
    next();
});

router.use((req, res, next) => {
    res.send({"alerta": "error"});
   
});

app.use('/foo', router);


app.listen(port, () => {
    console.log('Conexão aberta na porta 3000');
})