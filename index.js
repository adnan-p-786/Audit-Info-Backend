const express = require('express')
const connectDB = require('./db')
const app = express()
const port = 3000
const cors = require('cors')
// const morgan = require('morgan');

app.use(express.json())
// app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173'
}))


app.use('/api/accountant',require('./Routes/Accountant/accountantRoute'))
app.use('/api/lead',require('./Routes/Lead/leadRoute'))
app.use('/api/collegemanagement',require('./Routes/CollegeManagement/collegeManagementRoute'))
app.use('/api/registrationtable',require('./Routes/RegistrationTable/registrationtableRoute'))
app.use('/api/collegeaccount',require('./Routes/College Account/collegeaccountRoute'))
app.use('/api/sendamount',require('./Routes/Send Amount/sendAmountRoute'))


app.get('/', (req, res) => {
    res.send('Hello World!')
})
connectDB()
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
}) 