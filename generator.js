const readlineSync = require('readline-sync');
const {copyAndParseDir} = require("./template-parser");
const fs = require('fs');
const path = require("path");


function readGeneratorFile(directoryPath) {
    const generatorFilePath = path.join(directoryPath, 'generator.json');
    let generatorFileContents;

    try {
        generatorFileContents = fs.readFileSync(generatorFilePath, 'utf8');
    } catch (err) {
        throw new Error('No generator.json file found in ' + directoryPath);
    }
    return JSON.parse(generatorFileContents);
}

// TODO: Replace the below method with a CLI-specific method
function promptQuestion(message) {
    return readlineSync.question(`${message}: `);
}

function getQuestionAnswers(questions) {
    const answers = {};

    questions.forEach(question => {
        answers[question.tagValue] = promptQuestion(question.text);
    });

    return answers;
}


// run the method above
let generatorJsonObject = readGeneratorFile("./example");
let answers = getQuestionAnswers(generatorJsonObject.questions);

copyAndParseDir("./example", "./example-output", generatorJsonObject.componentRoot, answers);

