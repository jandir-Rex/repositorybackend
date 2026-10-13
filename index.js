require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000
const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura'

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenidos al curso - API con JWT activa')
})

// Ruta para generar Token JWT (Login)
app.post('/login', (req, res) => {
  const user = { id: 1, username: 'jandir' }
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' })
  res.json({ token })
})

// Ruta protegida con JWT
app.get('/protegido', (req, res) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        res.json({ mensaje: 'Acceso a ruta protegida concedido', authData })
      }
    })
  } else {
    res.sendStatus(403)
  }
})

app.listen(PORT, () => {
  console.log("Aplicacion corriendo en: " + PORT)
})