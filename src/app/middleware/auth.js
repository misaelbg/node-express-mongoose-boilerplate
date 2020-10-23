import jwt from 'jsonwebtoken';
import { promisify } from 'util';

/**
 * Token validation module
 */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Check 
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
};