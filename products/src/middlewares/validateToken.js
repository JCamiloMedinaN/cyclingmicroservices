import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import User from '../../../customer/src/models/user.model.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({
      message: 'No token, auntorización denegada'
    })
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Token inválido'
      })
    }

    req.user = user

    if (user.is_admin === true) {
      next()
    } else {
      return res.status(403).json({
        message: 'Accesso denegado'
      })
    }
  })
}