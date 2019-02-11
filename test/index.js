const Promise = require('promise');
const castle = require('./castle.js');
const michelin = require('./michelin.js');
var fs = require('fs');

import React from 'react';
import ReactDOM from 'react-dom';

'use strict';
console.log("debut");

const hotelsJSON = castle.getHotelsJSON();
const michelinJSON = michelin.getRestaurantsJSON();

fs.writeFileSync("starredRelaisChateaux.json",JSON.stringify(findMutualChefsAndPCs(hotelsJSON, michelinJSON)));

function findMutualChefsAndPCs(hotelsList, michelinsList) {
    var starredHotels = [];
    for (var i = 0; i < hotelsList.length; i++) {
        for (var j = 0; j < michelinsList.length; j++) {
            if (hotelsList[i].chef === michelinsList[j].chef && hotelsList[i].postalCode === michelinsList[j].postalCode) {
                starredHotels.push({"hotelName": hotelsList[i].name, "restaurantName": michelinsList[j].name, "postalCode": hotelsList[i].postalCode, "chef": hotelsList[i].chef, "url": hotelsList[i].url, "price": hotelsList[i].price })
            }
        }
    }
    return starredHotels;
}



console.log("fin");