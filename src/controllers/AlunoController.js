import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: [
          'id',
          'name',
          'lastname',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'name',
          'lastname',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [[Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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
      const newAluno = await Aluno.create(req.body);

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

      const aluno = await Aluno.findByPk(id);

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

      const aluno = await Aluno.findByPk(id);

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

export default new AlunoController();
