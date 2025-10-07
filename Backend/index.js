import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/about', (req, res) => {
  // res.send('about us page')
  res.render('about.ejs')
})

app.listen(3000)