'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository')

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

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres.');

    /* Se os dados forem inválidos */
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({ message: 'Product saved!' });
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    } // Salvar o item no BD
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Product updated!' });
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }

};

/*Removendo produto pelo params (URL) */
exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({ message: 'Product removed!' });
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }
};

/* Removendo pelo body
exports.delete = async (req, res, next) => {
    try {
        res.status(200).send({message: 'Product removed!'});
        repository.delete(req.body.id)
    } catch (err) {
        res.status(500).send({
            message: "Fala ao processar sua requisição",
        });
    }
};
*/