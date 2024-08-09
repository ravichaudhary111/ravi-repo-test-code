const fs = require("fs");
const { parse } = require("csv-parse");
const csvToJson = require('csvtojson');




module.exports.csv =async (filename) => {
    console.log(filename);
    try {
        const json = await csvToJson().fromFile(filename);
        // const jsonString = JSON.stringify(json, null, 2);
        return json
    } catch (error) {
        console.log(error)   
    }
}