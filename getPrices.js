/** System require */
require('dotenv').config();
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

/** Load services */
var DBService = require("./services/DBService");

/** Nightmare configuration */
const nightmare = Nightmare({ show: false })

/** URL that we want to scrap */
var url = process.env.URL;

/** Request via nightmare */
nightmare
    .goto(url)
    .wait('.search-result-amount')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        var products_prices = getData(response);
        DBService.write("prices", products_prices).then(function () {
            console.log("ok");
        }, function () {
            console.log("Something goes wrong");
        })
    }).catch(err => {
        console.log(err.stack);
    });

/** Parsing data using cheerio */
let getData = html => {
    var finalProductsArray = [];
    const $ = cheerio.load(html);
    /** Doing something with your data */
    
    $('.search-result-product-title').each((row, raw_element) => {
        var tempObj = {
            "structure": raw_element.children[1].childNodes[1].childNodes[0].data.replace(/\s/g, ''),
            "location": raw_element.children[3].children[0].data.replace(/\s/g, '')
        }
        finalProductsArray.push(tempObj)
    })

    $('.search-result-amount').each((row, raw_element) => {
        if (finalProductsArray[row] != undefined)
            finalProductsArray[row]["price"] = raw_element.childNodes[3].childNodes[0].data.replace(/\s/g, '')
        else
            delete finalProductsArray[row]
    })
    return finalProductsArray;
}


