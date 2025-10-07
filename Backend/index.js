const express = require('express')
const app = express()

PORT=3000;

//Database Connection
var Connection = require('./config/db.js')
Connection()

// middleware
// static file serve
app.use(express.static('public/'))

// POST Method Data - Form Handling
app.use(express.urlencoded({extended:true}))

// JSON Data
app.use(express.json())

// URL package
// var url = require('url')
// var urlData = url.parse(req.url,true)
// model
const user = require('./models/userSchema')
//password hasing
const bcrypt = require('bcryptjs');

app.get('/',(req,res)=>{
    res.send('homepage')
});

app.get('/login',(req,res)=>{
    res.render('Login.ejs')
})

app.get('/signup',(req,res)=>{
res.render('Signup.ejs')
})

// signup form
app.post('/saveform', async (req, res) => {
    try {
        const { userName, userEmail, userPass } = req.body;
        const hashPassword = await bcrypt.hash(userPass, 10)
        const data = new user({ userName, userEmail, userPass: hashPassword })
        const result = await data.save()
        console.log(result)
        res.redirect('/login')
        console.log("User Created Successfully !!")
    }
    catch (err) {
        console.log("Faild to register")
        console.log(err)
    }
})

// login form
app.post('/loginuser', async (req, res) => {
    const isUserExist = await user.findOne({ userEmail: req.body.userEmail })
    const isValidPassword = await bcrypt.compare(req.body.userPass, isUserExist.userPass)
    console.log(isValidPassword)


    if (isUserExist && isValidPassword) {
        res.send(`<script>
            alert('Login Successfully')
            window.location.href='/profile'
            </script>`)
    }
    else {
        res.send(`
            <script>
            alert('Invalid Credentials !!')
            window.location.href='/'
            </script>       
            `)
    }

})

app.get('/profile', (req, res) => {
        res.render("profile.ejs")
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})