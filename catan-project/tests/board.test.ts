import { shuffleArray , Board , node , tile} from "../src/main.ts"

describe('randomize', () => {
    test('randomized simple array', () => {

        
    });
    test('randomized array contains all original numbers', () => {
        let arr: number[] = [];
        for(let j = 0; j<100; j++)
            arr[j] = j
        let rand_arr:number[] = shuffleArray(arr)
        for(let i = 0; i<arr.length; i++){
            expect(rand_arr).toContain(arr[i]);
        }
    });
});
describe('board.getRow', () => {
    function check_bounds_of_rows(arr:number[], rows:number[]){
        let i = 0;
        for(let r = 0; r<rows.length; r++){
            expect(arr[i]).toBe(r)
            i+=rows[r]-1
            expect(arr[i]).toBe(r)
            i++
        }
    }
    test('returns correct row for 54 nodes', () => {
        let board = new Board(4);
        let node_rows = [7, 9, 11, 11, 9, 7]
        let arr:number[] = []
        for(let i = 0; i<54; i++){
            arr.push(board.getRow(i, node_rows))
        }
        check_bounds_of_rows(arr, node_rows)
    });
    test('returns correct row for 19 tiles', () => {
        let board = new Board(4);
        let tile_rows = [3, 4, 5, 4, 3]
        let arr:number[]  = []
        for(let i = 0; i<19; i++){
            arr.push(board.getRow(i, tile_rows))
        }
        check_bounds_of_rows(arr, tile_rows)
    });
});
describe('board.getCol', () => {
    function check_bounds_of_cols(arr:number[], rows:number[]){
        let i = 0;
        for(let c = 0; c<rows.length; c++){
            expect(arr[i]).toBe(0)
            i+=rows[c]-1
            expect(arr[i]).toBe(rows[c]-1)
            i++
        }
    }
    test('returns correct columns for 54 nodes', () => {
        let board = new Board(4);
        let node_rows = [7, 9, 11, 11, 9, 7]
        let arr:number[] = []
        for(let i = 0; i<54; i++){
            arr.push(board.getCol(i, node_rows))
        }
        check_bounds_of_cols(arr, node_rows)
    });
    test('returns correct columns for 19 tiles', () => {
        let board = new Board(4);
        let tile_rows = [3, 4, 5, 4, 3]
        let arr:number[]  = []
        for(let i = 0; i<19; i++){
            arr.push(board.getCol(i, tile_rows))
        }
        check_bounds_of_cols(arr, tile_rows)
    });
});
describe('board.getIndex', () => {
    test('can get index of all tiles using getRow and getCol', () => {
        let tile_rows = [3, 4, 5, 4, 3]
        let board = new Board(4)
        let arr:number[] = []
        for(let i = 0; i<19; i++){
            arr[i] = i;
        }
        arr.map(e=>{
            expect(board.getIndex(
                board.getRow(e, tile_rows),
                board.getCol(e, tile_rows), 
                tile_rows
            )).toBe(e)
        })
    });
    test('can get index of all nodes using getRow and getCol', () => {
        let node_rows = [7, 9, 11, 11, 9, 7]
        let board = new Board(4)
        let arr:number[] = []
        for(let i = 0; i<54; i++){
            arr[i] = i;
        }
        arr.map(e=>{
            expect(board.getIndex(
                board.getRow(e, node_rows),
                board.getCol(e, node_rows), 
                node_rows
            )).toBe(e)
        })
    });
});

describe('board.getTileNodes', () => {
    test('bounds return list of -1', () => {
        let board = new Board(4)
        expect(board.getTileNodes(-1)).toContain(-1)
        expect(board.getTileNodes(19)).toContain(-1)
    });
    test('corner tiles have correct nodes', () => {
        let board = new Board(4)
        let arr:number[] = []
        for(let i = 0; i<19; i++){
            arr[i] = i;
        }
        arr.map(board.getTileNodes).map(n=>expect(n).toHaveLength(6))
        expect(board.getTileNodes(arr[0])).toBe([0, 1, 2, 8, 9, 10])
        expect(board.getTileNodes(arr[2])).toBe([4, 5, 6, 12, 13, 14])
        expect(board.getTileNodes(arr[7])).toBe([16, 17, 18, 27, 28, 29])
        expect(board.getTileNodes(arr[11])).toBe([24, 25, 26, 35, 36, 37])
        expect(board.getTileNodes(arr[16])).toBe([39, 40, 41, 47, 48, 49])
        expect(board.getTileNodes(arr[18])).toBe([43, 44, 45, 51, 52, 53])
    });
});
describe('Board tile_layout', () => {
    test('tiles have', () => {
        let board = new Board(4)
        board.tile_layout
            .map(t=>t.nodes)
            .map((ns:node[])=>ns.map((n:node)=>board.game_state.nodes.find(v=>n===v)))
    });
});
describe('', () => {
    test('', () => {
    });
});