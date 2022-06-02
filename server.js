const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const {config} = require('./config')

const authRoutes = require('./routes/auth.routes')
const campaignRoutes = require('./routes/campaign.routes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/', authRoutes)
app.use('/', campaignRoutes)

const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/merkle', { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(config.port, (err) => {
        if (err) {
          console.log(err)
        }
        console.info('Server started on port %s.', config.port)
    })
}

main()