var shell = require("shelljs");
var fs = require("fs");
var path = require("path");

const abiDir = path.resolve("./build/contracts/")
const outputDir = '../react-app/abi/'

shell.mkdir('-p', outputDir);
shell.ls(path.join(abiDir, '*.json')).forEach(function (file) {
    var baseName = path.basename(file);
    let fileOutput = fs.readFileSync(file).toString();
    fileOutput = JSON.parse(fileOutput);
    let outputPath = outputDir + baseName;
    fs.writeFileSync(outputPath, JSON.stringify(fileOutput.abi))
});