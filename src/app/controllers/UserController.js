import User from '../models/User';

class UserController {
  async find (req, res) {
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.id !== req.userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const lastLoginMinutes = user.lastLoginBefore(new Date());

    if (lastLoginMinutes > 30) {
      return res.status(401).json({ message: 'Sessão inválida' });
    }

    return res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.lastLogin,
      telefones: user.telefones
    });
  }
}

module.exports = new UserController();
