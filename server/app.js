const express = require('express')
const app = express()
const db = require('./models/')

const PORT  = 5000

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('error connect to database', err);
        process.exit()
    });

app.get('/', (req,res) => {
    res.json({
        message: "Welcome"
    })
})

require('./routes/item')(app)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})