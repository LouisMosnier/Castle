//Required libraries
const scrape = require('./Scrape.js');
const michelinScrape = require('./scrapeMichelin.js');
let fs = require('fs');

'use strict';

const hotelJSON = scrape.getHotelsJSON();
const JSONMichelin = michelinScrape.getRestaurantsJSON();

fs.writeFileSync("ListeRelaisEtoiles.json",JSON.stringify(findMutualChefsAndPCs(hotelJSON, JSONMichelin)));

function findMutualChefsAndPCs(ListeHotels, ListeMichelin) {
    let HotelsEtoiles = [];
    for (let i = 0; i < ListeHotels.length; i++) {
        for (let j = 0; j < ListeMichelin.length; j++) {
            if (ListeHotels[i].chef === ListeMichelin[j].chef && ListeHotels[i].postalCode === ListeMichelin[j].postalCode) {
                HotelsEtoiles.push({"hotelName": ListeHotels[i].name, "restaurantName": ListeMichelin[j].name, "postalCode": ListeHotels[i].postalCode, "chef": ListeHotels[i].chef, "url": ListeHotels[i].url, "price": ListeHotels[i].price })
            }
        }
    }
    return HotelsEtoiles;
}

console.log("Fichier écrit.");
