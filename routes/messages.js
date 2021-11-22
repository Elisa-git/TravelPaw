var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res, next){
    Message.find()
        .exec(function(err, result){
            if(err){
                return res.status(500).json({
                    myErrorTitle: "Algo de errado aconteceu ao conectar ao banco",
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem recuperada com sucesso",
                objsMessagesRecuperados: result
            });
        });
});

router.post('/', function (req, res, next) {
    var message = new Message({
        content: req.body.content
    });

    message.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                myErrorTitle: "Algo deu errado ao salvar",
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: "Mensagem salva com sucesso",
            objMessageSave: result
        });
    });
});

router.patch('/:id', function(req, res, next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if(err){
            return res.status(500).json({
                myErrorTitle: 'Algo de errado aconteceu ao buscar pelo ID',
                myError: err
            });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErrorTitle: 'Não foi possivel encontrar a mensagem',
                myError: {info: 'A mensagem de id "' + req.params.id + '" não pode ser recuperada.'}
            });
        }
        resultMsgRecuperada.content = req.body.content;
        resultMsgRecuperada.save(function(err, resultMsgAlterada){
            if(err){
                return res.status(500).json({
                    myErrorTitle: "algo deu errado ao atualizar a mensagem.",
                    myError: err
                });                
            }
            res.status(200).json({
                myMsgSucess: "mensagem atualizada com sucesso",
                objsMessageAtualizado: resultMsgAlterada
            });
        });
    });
});

module.exports = router;
