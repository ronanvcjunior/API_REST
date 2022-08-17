"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: [
          'id',
          'name',
          'lastname',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['filename', 'url'],
        },
      });
      return res.json(alunos);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: [
          'id',
          'name',
          'lastname',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [[_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(401).json({
          errors: ['Usúario não encontrado'],
        });
      }

      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const newAluno = await _Aluno2.default.create(req.body);

      return res.json(newAluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(401).json({
          errors: ['Usúario não encontrado'],
        });
      }

      const alunoUpdate = await aluno.update(req.body);

      return res.json(alunoUpdate);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['ID não enviado'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(401).json({
          errors: ['Usúario não encontrado'],
        });
      }

      const alunoDeleted = await aluno.destroy();

      return res.json(alunoDeleted);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();
