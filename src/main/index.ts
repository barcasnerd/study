import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser())


app.post('/', (request, response) => {
    console.log(request.body);

    response.status(200).json(request.body || { message: "hello" });
})

app.listen(3000, () => {
    console.log('server on port 3000');

});


