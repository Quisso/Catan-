"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//test
const catan_1 = require("../include/catan");
const player_1 = require("../src/player");
describe('developement_Cards class', () => {
    it('should initialize with an empty hand', () => {
        let devCards = new player_1.developement_Cards();
        expect(devCards.getCards()).toHaveLength(0);
    });
    it('should draw cards correctly', () => {
        let devCards = new player_1.developement_Cards();
        devCards.Drawhand_developement(3);
        expect(devCards.getCards()).toHaveLength(3);
    });
    it('should remove a card correctly', () => {
        let devCards = new player_1.developement_Cards();
        devCards.Drawhand_developement(3);
        let initialLength = devCards.getCards().length;
        devCards.remove_developementcard(0);
        expect(devCards.getCards()).toHaveLength(initialLength - 1);
    });
});
describe('Player class', () => {
    // it('should return correct resource for a given terrain type', () => {
    //     let player = new Player();
    //     expect(player.checkResource(Hex.hills)).toBe(Resource.brick);
    //     expect(player.checkResource(Hex.forest)).toBe(Resource.wood);
    // });
    it('should increment resources correctly', () => {
        let player = new player_1.Player(catan_1.Color.blue);
        player.increment_resource(2, catan_1.Resource.wood);
        expect(player.getResources_types(catan_1.Resource.wood)).toBe(2);
    });
    it('should increment road count correctly', () => {
        let player = new player_1.Player(catan_1.Color.blue);
        player.roadscounter();
        expect(player.roads_count).toBe(1);
    });
    // it('should throw an error for invalid terrain type', () => {
    //     let player = new Player();
    //     expect(() => player.checkResource(Hex.invalid)).toThrow('Invalid terrain type');
    // });
});
