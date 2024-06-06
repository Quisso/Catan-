"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.shuffleArray = exports.Color = exports.Resource = exports.Hex = void 0;
var Hex;
(function (Hex) {
    Hex[Hex["hills"] = 0] = "hills";
    Hex[Hex["forest"] = 1] = "forest";
    Hex[Hex["mountain"] = 2] = "mountain";
    Hex[Hex["fields"] = 3] = "fields";
    Hex[Hex["pasture"] = 4] = "pasture";
    Hex[Hex["desert"] = 5] = "desert";
    Hex[Hex["harbor"] = 6] = "harbor";
})(Hex || (exports.Hex = Hex = {}));
var Resource;
(function (Resource) {
    Resource[Resource["brick"] = 0] = "brick";
    Resource[Resource["wood"] = 1] = "wood";
    Resource[Resource["ore"] = 2] = "ore";
    Resource[Resource["wheat"] = 3] = "wheat";
    Resource[Resource["sheep"] = 4] = "sheep";
    Resource[Resource["nothing"] = 5] = "nothing";
    Resource[Resource["random"] = 6] = "random";
})(Resource || (exports.Resource = Resource = {}));
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["white"] = 1] = "white";
    Color[Color["orange"] = 2] = "orange";
    Color[Color["blue"] = 3] = "blue";
})(Color || (exports.Color = Color = {}));
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}
exports.shuffleArray = shuffleArray;
function production_conversion(prod) {
    return prod;
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
    //robber: number;
    node_amt = 54;
    edge_amt = 72;
    game_state;
    player_amt;
    harbor_amt = 18;
    harbors = [0, 1, 3, 4, 7, 14, 15, 17, 26, 28, 37, 38, 45, 46, 47, 48, 50, 51];
    node_rows = [7, 9, 11, 11, 9, 7];
    tile_rows = [3, 4, 5, 4, 3];
    constructor(player_amt) {
        this.player_amt = player_amt;
        //token_layout population
        this.token_layout = [];
        for (let i = 1; i <= 12; i++) {
            if (i != 7) {
                if (i != 1 && i != 12)
                    this.token_layout.push(i);
                this.token_layout.push(i);
            }
        }
        //tile_layout population
        this.tile_layout = [];
        for (let i = 0; i < this.tile_config.length; i++) {
            for (let j = 0; j < this.tile_config[i].amt; j++) {
                this.tile_layout.push({
                    hex: this.tile_config[i].hex,
                    resource: production_conversion(this.tile_config[i].hex),
                });
            }
        }
        //board randomization 
        this.token_layout = shuffleArray(this.token_layout);
        this.tile_layout = shuffleArray(this.tile_layout);
        this.tile_layout.map((e, i) => {
            e.token = this.token_layout[i];
        });
        //game state init
        this.game_state = { nodes: new Array(this.node_amt),
            edges: new Array(this.edge_amt) };
        for (let i = 0; i < this.node_amt; i++) {
            this.game_state.nodes[i] = {
                settlement: null,
                tiles: [],
                edges: [],
            };
        }
        for (let i = 0; i < this.edge_amt; i++) {
            this.game_state.edges[i] = {
                road: null,
                nodes: [],
            };
        }
        //tiles and nodes linkage
        this.tile_layout.map((t, ti) => t.nodes = this.getTileNodes(ti)
            .map(ni => this.game_state.nodes[ni]));
        //nodes and edges linkage
        //this.game_state.nodes.map() 
    }
    getTileNodes(tIndex) {
        let nIndex = [];
        let node_rows = [7, 9, 11, 11, 9, 7];
        let tile_rows = [3, 4, 5, 4, 3];
        let row = this.getRow(tIndex, tile_rows);
        let col = this.getCol(tIndex, tile_rows) * 2;
        let topRowOffset = row > Math.floor(tile_rows.length / 2) ? 1 : 0;
        let bottomRowOffset = row < Math.floor(tile_rows.length / 2) ? 1 : 0;
        for (let c = col; c < col + 3; c++) {
            nIndex.push(this.getIndex(row, c + topRowOffset, node_rows));
        }
        for (let c = col; c < col + 3; c++) {
            nIndex.push(this.getIndex(row + 1, c + bottomRowOffset, node_rows));
        }
        return nIndex;
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
        if (row < 0 || col < 0)
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
}
exports.Board = Board;
let node_rows = [7, 9, 11, 11, 9, 7];
let tile_rows = [3, 4, 5, 4, 3];
let board = new Board(4);
let arr = [];
for (let i = 0; i < 19; i++) {
    arr[i] = i;
}
console.log(arr.map(e => board.getRow(e, tile_rows)));
// console.log(arr.map(e=>board.getCol(e, tile_rows)))
let node_arr = [];
for (let i = 0; i < 54; i++) {
    node_arr[i] = i;
}
//console.log(node_arr.map(e=>board.getRow(e, node_rows)))
//console.log(node_arr.map(e=>board.getCol(e, node_rows)))
// console.log(arr.map(e=>{
//     let row = board.getRow(e, tile_rows)
//     let col = board.getCol(e, tile_rows)
//     let index = board.getIndex(row, col, tile_rows)
//     return row + " + " + col + " = " + index + " - " + (e===index)
// }))
// console.log(node_arr.map(e=>{
//     let row = board.getRow(e, node_rows)
//     let col = board.getCol(e, node_rows)
//     let index = board.getIndex(row, col, node_rows)
//     return row + " + " + col + " = " + index + " - " + (e===index)
// }))
//console.log(arr.map(a=>board.nodesForTile(a)))
// console.log(
//     board.tile_layout
//         .map(t=>t.nodes)
//         .map(ns=>ns.map(n=>board.game_state.nodes.find(v=>n===v)))
// )
