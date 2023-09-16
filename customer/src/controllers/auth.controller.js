import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (userFound) return res.status(400).json(['El correo ya esta en uso'])

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: passwordHash
    })

    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id, is_admin: userSaved.is_admin })

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: true
    })
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
      is_admin: userSaved.is_admin
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({
      message:
        'Usuario no encontrado'
    })

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({
      message:
        'Contraseña incorrecta'
    })

    if (userFound.is_admin) {
      return res.status(401).json({
        message:
          'Acceso denegado'
      })
    }

    const token = await createAccessToken({ id: userFound._id, is_admin: userFound.is_admin })

    const decodedToken = jwt.decode(token)
    if (decodedToken && decodedToken.exp) {
      const expiresIn = new Date(decodedToken.exp * 1000)

      res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true
      })
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
        is_admin: userFound.is_admin,
        token: token,
        // expiresIn: expiresIn      
      })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginadmin = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({
      message:
        'Usuario no encontrado'
    })

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({
      message:
        'Contraseña incorrecta'
    })

    const isAdmin = userFound.is_admin
    if (!isAdmin) return res.status(401).json({
      message:
        'Acceso denegado'
    })

    const token = await createAccessToken({ id: userFound._id, is_admin: userFound.is_admin })

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: true
    })
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
      is_admin: userFound.is_admin,
      token: token,
      // expiresIn: expiresIn     
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.stau(400).json({
    message:
      'Usuario no encontrado'
  })

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt
  })
  console.log(req.user)
  res.send('profile')
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({
    message:
      'Token no proporcionado'
  })

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({
      message:
        'Token inválido o expirado'
    })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({
      message:
        'Usuario no encontrado'
    })

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      is_admin: userFound.is_admin
    })
  })
}

export const logout = (req, res) => {
  try {
    res.cookie('token', '', {
      expires: new Date(0)
    })
    return res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}