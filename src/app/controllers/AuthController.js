import User from '../models/User';

class AuthController {
  async signUp (req, res) {
    const { email, nome, senha } = req.body;

    if (!email) {
      return res.status(401).json({ message: 'Email é obrigatório' });
    }

    if (!nome) {
      return res.status(401).json({ message: 'Nome é obrigatório' });
    }

    if (!senha) {
      return res.status(401).json({ message: 'Senha é obrigatório' });
    }

    const newUser = new User({ nome, senha, email });

    try {
      await newUser.save();
    } catch (err) {
      return res.status(400).json({ message: 'E-mail já existente' });
    }

    const token = await newUser.generateToken();

    return res.json({
      id: newUser.id,
      email: newUser.email,
      data_criacao: newUser.createdAt,
      data_atualizacao: newUser.updatedAt,
      ultimo_login: newUser.lastLogin,
      token: token
    });
  }

  async signIn (req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuário e/ou senha inválidos" });
    }

    if (!await user.checkPassword(senha)) {
      return res.status(401).json({ message: "Usuário e/ou senha inválidos" });
    }

    const token = await user.generateToken();

    // update last login date
    await user.update({ lastLogin: Date.now() });

    return res.json({
      id: user.id,
      email: user.email,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.lastLogin,
      token: token
    });
  }
}

module.exports = new AuthController();
