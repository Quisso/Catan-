import { shuffleArray , Board , node , tile} from "../src/board.ts"

describe('randomize', () => {
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
describe('Board', () => {
    test('')
    test('The rule that 6s and 8s cant be adjacent is true', () => {
        let board = new Board()
        // for(let i = 0; i<19; i+=){
        //     board.getAdjacentTiles(i)
        // }

    });
});