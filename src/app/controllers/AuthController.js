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

    return res.json(newUser);
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

    return res.json({
      user,
      token: user.generateToken()
    });
  }
}

module.exports = new AuthController();
