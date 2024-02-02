const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user.router')
const resumeRouter = require('./routers/resume.router')

const app = express()
const port = 3306

app.use(bodyParser.json()) //미들웨어 등록

app.use('/users', userRouter)
app.use('/resumes', resumeRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
