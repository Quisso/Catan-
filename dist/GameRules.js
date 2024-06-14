"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const player_1 = require("./player");
class GameRules {
    dice_1 = 0;
    dice_2 = 0;
    player_amt;
    players;
    constructor(player_amt) {
        this.player_amt = player_amt;
        this.players = Array.from({ length: 4 })
            .map(p => ({ player: new player_1.Player(), dice: this.roll_dice() }))
            .sort((a, b) => a.dice - b.dice)
            .map(pwd => pwd.player);
    }
    roll_dice() {
        let die = (rand) => Math.floor(rand * 6) + 1;
        return die(Math.random()) + die(Math.random());
    }
    checkIntersection(tile, tile_nodes) {
        let node;
        return tile.some(e => tile_nodes[e].settlement !== null);
    }
    check_Empty_Intersection(tile, tile_nodes) {
        let node;
        return tile.some(e => tile_nodes[e].settlement === null);
    }
    // Gives the resorsse with the sum of the role
    ResoureProduction(dice_1, dice_2, player) {
        this.dice_1 = Math.floor(Math.random() * 6) + 1;
        this.dice_2 = Math.floor(Math.random() * 6) + 1;
        const sum_Of_Dice = this.dice_1 + this.dice_2;
        const board = new main_1.Board();
        function findSettlement(nodeIndex) {
            const node = board.game_state.nodes[nodeIndex];
            return node.settlement;
        }
        const condition = this.checkIntersection(board.getTileNodes(sum_Of_Dice), board.game_state.nodes);
        const tile = board.tile_layout[sum_Of_Dice];
        //based on the roll and the sum of the rolls it checks the intersection for a settlement and the rolls to give out resources
        //  for now - settlement  
        switch (sum_Of_Dice) {
            case 1:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 2:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 3:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 4:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 5:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 6:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 7:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 8:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 9:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 10:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 11:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            case 12:
                condition ? player.increment_resource(player.settlement_count, tile.resource) : null;
                break;
            default: Error("Non - Tile");
        }
    }
}
