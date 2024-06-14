"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const catan_1 = require("../include/catan");
var Hex;
(function (Hex) {
    Hex[Hex["hills"] = 0] = "hills";
    Hex[Hex["forest"] = 1] = "forest";
    Hex[Hex["mountain"] = 2] = "mountain";
    Hex[Hex["fields"] = 3] = "fields";
    Hex[Hex["pasture"] = 4] = "pasture";
    Hex[Hex["desert"] = 5] = "desert";
    Hex[Hex["harbor"] = 6] = "harbor";
})(Hex || (Hex = {}));
function production_conversion(prod) {
    return Object.values(Hex).includes(prod) ?
        prod = prod :
        prod = prod;
}
class Board {
    /* (harbor)
               (00)(01) 02 (03)(04) 05  06
           (07) 08  09  10  11  12  13 (14)(15)
        16 (17) 18  19  20  21  22  23  24  25 (26)
        27 (28) 29  30  31  32  33  34  35  36 (37)
           (38) 39  40  41  42  43  44 (45)(46)
               (47)(48) 49 (50)(51) 52  53
    */
    tile_amt = 19;
    tile_config = [
        { hex: Hex.hills, amt: 3 },
        { hex: Hex.forest, amt: 4 },
        { hex: Hex.mountain, amt: 3 },
        { hex: Hex.fields, amt: 4 },
        { hex: Hex.pasture, amt: 4 },
        { hex: Hex.desert, amt: 1 },
    ];
    tile_layout;
    token_layout;
    tile_rows = [3, 4, 5, 4, 3];
    //robber: number;
    node_amt = 54;
    edge_amt = 72;
    game_state;
    node_rows = [7, 9, 11, 11, 9, 7];
    harbor_amt = 18;
    harbor_nodes = {
        0: catan_1.Resource.random, 1: catan_1.Resource.random,
        3: catan_1.Resource.sheep, 4: catan_1.Resource.sheep,
        7: catan_1.Resource.random, 14: catan_1.Resource.random,
        15: catan_1.Resource.random, 17: catan_1.Resource.random,
        26: catan_1.Resource.brick, 28: catan_1.Resource.brick,
        37: catan_1.Resource.wood, 38: catan_1.Resource.wood,
        45: catan_1.Resource.random, 46: catan_1.Resource.random,
        47: catan_1.Resource.wheat, 48: catan_1.Resource.wheat,
        50: catan_1.Resource.ore, 51: catan_1.Resource.ore,
    };
    constructor() {
        //tile_layout population
        let resource_list = (0, catan_1.shuffleArray)(this.tile_config.map(c => Array(c.amt).fill(c.hex)).flat());
        this.tile_layout = Array.from(resource_list)
            .map(t => {
            return {
                hex: t,
                resource: production_conversion(t),
                token: -1,
                nodes: [],
            };
        });
        this.tile_layout = (0, catan_1.shuffleArray)(this.tile_layout);
        //game state init
        this.game_state = { nodes: [], edges: [] };
        for (let i = 0; i < this.node_amt; i++) {
            this.game_state.nodes[i] = {
                settlement: null,
                harbor: i in this.harbor_nodes ? this.harbor_nodes[i] : null,
                tiles: [],
                edges: [],
                index: i,
            };
        }
        //linkages
        this.tile_layout.forEach((t, ti) => {
            //node and edge linkage
            this.getTileNodes(ti)
                .map((n, i, ns) => this.makeEdge(this.game_state.nodes[n], this.game_state.nodes[ns[(i + 1) % 6]]))
                .filter(e => e !== null).map(e => e)
                .forEach(e => this.game_state.edges.push(e));
            //tiles and nodes linkage
            t.nodes = this.getTileNodes(ti).map(ni => this.game_state.nodes[ni]);
            t.nodes.forEach(n => n.tiles.push(t));
        });
        this.token_layout = this.init_tokens();
    }
    /***********************************END OF CONSTRUCTOR*********************************************/
    getSettlementsfromToken(token) {
        return this.tile_layout
            .filter(t => t.token === token)
            .map(t => t.nodes
            .filter(n => n !== null)
            .map(n => n.settlement)).flat();
    }
    getAdjacentTiles(tile) {
        return tile.nodes
            .map(n => n.tiles)
            .flat()
            .filter((t, i, ts) => ts.indexOf(t) === i)
            .filter(t => t === tile);
    }
    init_tokens() {
        //populate
        let token_layout = new Array(18)
            .fill(0)
            .map((_, ti) => ti >= 5 ? ti + 3 : ti + 2) //skips 7
            .copyWithin(10, 1, 10); //copies 3-11
        token_layout.push(0); //adds 0 for desert
        //randomize
        token_layout = (0, catan_1.shuffleArray)(token_layout);
        //assign to tiles
        this.tile_layout.map((t, i) => {
            t.token = token_layout[i];
        });
        //unrandomize (6 and 8 rule)
        let breaksRule = (t) => {
            let has6or8 = (x) => x.token == 6 || x.token == 8;
            return has6or8(t) && this.getAdjacentTiles(t).some(adjt => has6or8(adjt));
        };
        let fixRule = (rule_break_tile) => {
            let rule_tile = (this.tile_layout.filter(t => !breaksRule(t)))[0];
            let temp = rule_break_tile.token;
            rule_break_tile.token = rule_tile.token;
            rule_tile.token = temp;
        };
        this.tile_layout.forEach(t => breaksRule(t) ? fixRule(t) : 0);
        return this.tile_layout.map(t => t.token);
    }
    makeEdge(n1, n2) {
        if (n1.edges.some(e => e.nodes.find(v => v === n2) !== undefined))
            return null;
        if (n1.edges.length > 2 || n2.edges.length > 2)
            throw console.error("too many edges");
        let edge = {
            road: null,
            nodes: [n1, n2],
        };
        n1.edges.push(edge);
        n2.edges.push(edge);
        return edge;
    }
    getRow(index, row_amts) {
        if (index < 0)
            return -1;
        for (let i = 0; i < row_amts.length; i++) {
            if (index < row_amts[i])
                return i;
            index -= row_amts[i];
        }
        return -1;
    }
    getCol(index, row_amts) {
        if (index < 0)
            return -1;
        for (let row of row_amts) {
            if (index < row)
                return index;
            index -= row;
        }
        return -1;
    }
    getIndex(row, col, row_amts) {
        if (row < 0 || col < 0 || row >= row_amts.length || col >= row_amts[row])
            return -1;
        return row_amts.reduce((acc, e) => {
            if (row === 0)
                acc += col;
            if (row > 0)
                acc += e;
            row--;
            return acc;
        }, 0);
    }
    getTileNodes(tIndex) {
        let nIndex = [];
        let row = this.getRow(tIndex, this.tile_rows);
        let col = this.getCol(tIndex, this.tile_rows) * 2;
        let topRowOffset = row > Math.floor(this.tile_rows.length / 2) ? 1 : 0;
        let bottomRowOffset = row < Math.floor(this.tile_rows.length / 2) ? 1 : 0;
        for (let c = col; c < col + 3; c++) {
            nIndex.push(this.getIndex(row, c + topRowOffset, this.node_rows));
        }
        for (let c = col + 2; c >= col; c--) {
            nIndex.push(this.getIndex(row + 1, c + bottomRowOffset, this.node_rows));
        }
        return nIndex;
    }
}
exports.Board = Board;
