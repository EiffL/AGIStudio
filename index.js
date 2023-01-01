const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

async function createCompletion() {

    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
    });

    console.log(response.data.choices[0].text);
};

createCompletion();


// create a simple express api that calls the function above

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    });