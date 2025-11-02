import app from './app'

const port = Number(process.env.PORT) || 8000

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
  console.log(`Yeee`)
})
