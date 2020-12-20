const express = require('express');
const cors = require('cors');
const { DB_URL } = require('./constants/common');
const app = express()
const port = 4000
app.use(express.json({ limit: '50mb' }));
app.use(cors());
let dbInstance = require('./index');

app.get("/", function (req, res) {
    res.send({ res: "Ok" });
});


function initDB() {
    if (!dbInstance.mongoClient) {
        return dbInstance.initDatabase(DB_URL)
    }
    return Promise.resolve();
}

app.post('/', function (req, res) {
    return initDB().then(() => {
        const requestBody = req.body;
        return dbInstance[requestBody.moduleName][requestBody.functionName](...requestBody.parameters);
    }).then(response => {
        res.status(200).send({
            statusCode: 200,
            data: response,
            statusMessage: "OK"
        })
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            statusCode: 500,
            data: null,
            statusMessage: err.message,
        })
    })
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
