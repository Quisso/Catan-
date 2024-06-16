"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const main_1 = require("./main");
let deck = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3]; // 1 = knight, 2 = progress, 3 = victory
class developement_Cards {
    cardsInHand_developement;
    constructor() {
        this.cardsInHand_developement = [];
    }
    Drawhand_developement(nums) {
        //num = number of cards we draw
        //randomizer of numbers that represent cards
        //push into the array
        randomize(deck, deck.length);
        for (let i = 0; i < nums; i++) {
            this.cardsInHand_developement.push(deck[i]);
            deck.pop();
        }
    }
    remove_developementcard(index) {
        if (index !== -1) {
            this.cardsInHand_developement.splice(index, 1);
            return true;
        }
        return false;
    }
    //usecard (arr: number[], index: number){
    // }
    getCards() {
        return this.cardsInHand_developement;
    }
}
class Player {
    resources;
    settlement_count;
    roads_count;
    roads_location;
    victory_points;
    constructor() {
        this.resources = {
            [main_1.Resource.brick]: 0,
            [main_1.Resource.wood]: 0,
            [main_1.Resource.ore]: 0,
            [main_1.Resource.wheat]: 0,
            [main_1.Resource.sheep]: 0,
            [main_1.Resource.random]: 0,
            [main_1.Resource.nothing]: 0
        };
        this.settlement_count = 0;
        this.roads_count = 0;
        this.roads_location = [];
        this.victory_points = 0;
    }
    increment_resource(num, territorytype) {
        this.resources[territorytype] += num;
    }
    getResources_types(resourceType) {
        return this.resources[resourceType];
    }
    roadscounter() {
        this.roads_count++;
    }
}
exports.Player = Player;
function randomize(deck, length) {
    throw new Error("Function not implemented.");
}
