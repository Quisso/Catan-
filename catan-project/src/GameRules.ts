import {Board,node, settlement} from './main';  
import {Player} from './Player';

class GameRules{
    dice_1 = 0;
    dice_2 = 0;
    
    
    checkIntersection(tile:number[],tile_nodes:node[]): boolean{
        let node:node;
        return tile.some(e => tile_nodes[e].settlement !== null)
    }
    
    
    // Gives the resorsse with the sum of the role
    ResoureProduction(dice_1:number, dice_2:number){
        this.dice_1  = Math.floor(Math.random() * 6) + 1;
        this.dice_2 = Math.floor(Math.random() * 6) + 1;
        const sum_Of_Dice = this.dice_1 + this.dice_2;

        const board = new Board(3);
        const player  = new Player();

        function findSettlement(nodeIndex: number): settlement | null {
            const node = board.game_state.nodes[nodeIndex];
            return node.settlement;
        }

        const condition = this.checkIntersection(board.getTileNodes(sum_Of_Dice),board.game_state.nodes);
        const tile = board.tile_layout[sum_Of_Dice];

        //based on the roll and the sum of the rolls it checks the intersection for a settlement and the rolls to give out resources
        //  for now - settlement  
        switch(sum_Of_Dice){
            case 1: 
            condition ? player.increment_resource(player.settlement_count,tile.resource) : null;
            break;
            case 2: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 3: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 4: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 5: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 6: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 7: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 8: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 9: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 10: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            case 11: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break; 
            case 12: 
            condition ? player.increment_resource(2,tile.resource) : tile ? player.increment_resource(1,tile.resource):null
            break;
            default: Error("Non - Tile");
        }


    }

    trade(){

    }



}