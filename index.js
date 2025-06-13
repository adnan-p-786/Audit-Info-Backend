const express = require('express')
const connectDB = require('./db')
const app = express()
const port = 3000
const cors = require('cors')
// const morgan = require('morgan');

app.use(express.json())
// app.use(morgan('dev'));
app.use(cors());


app.use('/api/user',require('./Routes/Auth/Auth.js'))
app.use('/api/manager',require('./Routes/Manager/managerRoute.js'))
app.use('/api/administractor',require('./Routes/Administractor/administractorRoute.js'))
app.use('/api/accountant',require('./Routes/Accountant/accountantRoute.js'))
app.use('/api/src',require('./Routes/Src admin/srcRoute.js'))
app.use('/api/sro',require('./Routes/Sro admin/sroRoute.js'))

app.use('/api/lead',require('./Routes/Lead/leadRoute'))
app.use('/api/collegemanagement',require('./Routes/CollegeManagement/collegeManagementRoute'))
app.use('/api/registrationtable',require('./Routes/RegistrationTable/registrationtableRoute'))
app.use('/api/collegeaccount',require('./Routes/College Account/collegeaccountRoute'))
app.use('/api/sendamount',require('./Routes/Send Amount/sendAmountRoute'))
app.use('/api/managerpoint',require('./Routes/Manager Point/managerPointRoute'))
app.use('/api/srcpoint',require('./Routes/Src Point/srcPointRoute'))
app.use('/api/sropoint',require('./Routes/Sro Point/sroPointRoute'))
app.use('/api/aknowledgement',require('./Routes/Acknowledgement/acknowledgementRoute'))
app.use('/api/account',require('./Routes/Accounts/accountRoute'))
app.use('/api/recievedamount',require('./Routes/Recieved Amount/recivedAmountRoute'))
app.use('/api/studenthistory',require('./Routes/Student History/studentHistoryRoute'))
app.use('/api/schoolmanagement',require('./Routes/School Management/schoolManagementRoute'))
app.use('/api/particular',require('./Routes/Particulars/particularsRoute'))
app.use('/api/expense',require('./Routes/Expense/expenseRoute.js'))
app.use('/api/expense',require('./Routes/Salary Table/salaryTableRoute.js'))
app.use('/api/branch',require('./Routes/Branch/branchRoute.js'))
app.use('/api/agent',require('./Routes/Agent/agentRoute.js'))
app.use('/api/agentaccount',require('./Routes/Agent Accounts/agentAccount.js'))

app.use('/api/images', express.static('upload/images'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
connectDB()
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
}) 