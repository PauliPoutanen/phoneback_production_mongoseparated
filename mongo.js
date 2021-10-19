const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

/*5MpdCU6ypmIZzS7J*/

const password = process.argv[2]

const url =
  `mongodb+srv://johannesvaateri:${password}@cluster0.bwidf.mongodb.net/pb?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  motto: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]
const motto = process.argv[5]

const person = new Person ({name, number, motto})


 /*person.save().then(person => {
  console.log(`Added ${person.name} number ${person.number} motto ${person.motto} to PB`)
  mongoose.connection.close()
})*/



Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
