'use strict';

const repository = require('../repositories/order-repository')
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }
};

exports.post = async (req, res, next) => {
try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    } // Salvar o item no BD
};