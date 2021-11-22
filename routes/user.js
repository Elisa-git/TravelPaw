var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/login', function (req, res, next) {
    User.find({ 'email': req.body.email })
        .exec(function (err, result) {
            if (err) {
                return res.status(500).json({
                    myErrorTitle: "Algo de errado aconteceu ao conectar ao banco",
                    myError: err
                });
            } else {
                
                if (!(result.length)) {
                    return res.status(500).json({
                        myErrorTitle: "Usuario não encontrado",
                        myError: err
                    });
                }

                var password = result[0].password;
                console.log("senha correta: " + password);
                console.log("senha recebida: " + req.body.pass);
                if (password != req.body.pass) {
                    return res.status(500).json({
                        myErrorTitle: "Senha incorreta",
                        myError: err
                    });
                }

            }

            res.status(200).json({
                myMsgSucess: "Usuario encontrado!",
                uID: result[0]._id,
                uFName: result[0].firstName,
                uLName: result[0].lastName,
                uEmail: result[0].email 
            });
        });
});

router.post('/', function (req, res, next) {
    console.log("email:" + req.body.email);
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    });

    user.save(function (err, result) {
        if (err) {
            if (User.find(user.email)) {
                return res.status(500).json({
                    myErrorTitle: "Este email ja esta cadastrado",
                    myError: err
                });
            } else {
                return res.status(500).json({
                    myErrorTitle: "Algo deu errado ao salvar",
                    myError: err
                });
            }
        }
        res.status(201).json({
            myMsgSucess: "Usuario criado com sucesso!",
            objMessageSave: result
        });
    });
});

module.exports = router;