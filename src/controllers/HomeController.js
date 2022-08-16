import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      name: 'Ronan',
      lastname: 'Vieira',
      email: 'vieira@gmail.com',
      age: 23,
      weight: 118.5,
      height: 1.85,
    });
    res.json({ novoAluno });
  }
}

export default new HomeController();
