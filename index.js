const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

//https://pure-scrubland-43925.herokuapp.com///

let pb = [
    {
      id: 1,
      name: "Da First Dude X",
      number: "007" },
    {
        id: 2,
        name: "Second Dude X",
        number: "002" 
    },
    {
        id: 3,
        name: "3TG Dude X",
        number: "003" 
    }
  ]
  
app.get('/', (require, response) => {
      response.send("<h1>Hello LOKAKUU!</h1>")
  })

  app.get('/info', (require, response) => {
    const reqTime = new Date(Date.now())
    const length = pb.length
 



    response.send(
 
   `<h2>InfoPage</h2>
   <p>PhoneBook has <b>${length}</b> persons at the moment.</p>
  <p>Data from <b>${new Date().toLocaleString()}</b></p><br>
  <p>RAW:  ${reqTime}</p>`   )
})


app.get('/api/pb', (req, res) => {
    res.json(pb)
  })

  app.get('/api/pb/:id', (request, response) => {
    const id = Number(request.params.id)
    const dude = pb.find(dude => dude.id === id)
    
    if (dude) {
      response.json(dude)
    } else {
      response.status(404).end()
    }
  })

  const genId = () =>{
const maxId = pb.length > 0
  ? Math.max(...pb.map(n => n.id))
  : 0
  return maxId + 1
  }

app.post('/api/pb', (request, response) => {
  
  const body = request.body

  if (body.name.length === 0) {
    return response.status(400).json({ 
      error: 'NAME missing' 
    })
  }
  if (body.number.length === 0) {
    return response.status(400).json({ 
      error: 'NUMBER missing' 
    })
  }

 
  const dude = {
    name: body.name,
    number: body.number,
    id: genId(),
  }

  pb = pb.concat(dude)

  response.json(dude)
})





  app.delete('/api/pb/:id', (request, response) => {
const id = Number(request.params.id)
pb = pb.filter(dude => dude.id !== id)

response.status(204).end()
  })
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }




  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })