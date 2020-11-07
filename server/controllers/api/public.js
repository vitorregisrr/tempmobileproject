const Televisao = require('../../models/Televisao');

exports.add = (req, res, next) => {
    const form = {
        ...req.body
    }

    if (form.nome.length > 0 && form.nome.length > 0 && form.tipo.length > 0 && form.marca.length > 0 && form.cor.length > 0 && form.altura.length > 0 && form.foto.length > 0) {
        new Televisao({
                ...form
            })
            .save()
            .then(televisao => {
                res
                    .status(200)
                    .json({'message': "Televisão criada com sucesso"});
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        'message': "Erro ao criar Televisão:" + err.message
                    });
            });
    } else {
        return res
            .status(500)
            .json({'message': "Preencha todos os campos!"});
    }
}

exports.get = (req, res, next) => {

    const id = req.params.id;

    Televisao
        .findOne({id})
        .then(carro => {
            return res
                .status(200)
                .json({televisao});
        })
        .catch(err => {
            res
                .status(500)
                .json({'message': err});
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Televisao
        .findOne({id})
        .then(televisao => {
            televisao.remove();
            return res
                .status(200)
                .json({message: 'Removido com sucesso'});
        })
        .catch(err => {
            res
                .status(500)
                .json({'message': "Televisão não encontrada"});
        });
}

exports.edit = (req, res, next) => {
    const id = req.body.id;

    Televisao
        .findById(id)
        .then(televisao => {
            televisao.nome = req.body.nome;
            televisao.cor = req.body.cor;
            televisao.altura = req.body.altura;
            televisao.modelo = req.body.modelo;
            televisao.ano = req.body.ano;
            televisao.marca = req.body.marca;
            televisao.foto = req.body.foto;
            televisao.save();

            return res
                .status(200)
                .json({message: 'Editado com sucesso'});
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "Televisão não encontrada"});
        });
}

exports.getAll = (req, res, next) => {
    Televisao
        .find()
        .then(televisoes => {
            return res
                .status(200)
                .json({televisoes});
        })
        .catch(err => {
            res
                .status(500)
                .json({'message': "Erro ao consultar no banco de dados"});
        });
}