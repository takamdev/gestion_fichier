const flash = require('express-flash')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const db = require('./db/database.js')
const app = express()
const port = 3000
const appRoute =require('./routes/web')

app.use(fileUpload());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
}
app.use(flash());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('',appRoute)

app.use(function (req,res) {
    res.render('pages/not-found')
})


app.listen(process.env.port||port, () => {
    console.log(`Example app listening on port ${port}`)
})