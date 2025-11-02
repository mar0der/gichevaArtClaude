import express from 'express'

const app = express()

app.use(express.json())

app.get('/v1/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (_req, res) => {
  res.json({'Hello': 'world'})
})

export default app
