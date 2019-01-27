import { TitleScene } from "./TitleScene.js";
import {GameScene} from './GameScene.js';

export class GameOver extends Phaser.Scene{
    constructor () {
        super({key: "GameOver"});
    }
    init() {

    }
    
    preload () {
    }
    create() {
        console.log('Game Over')
        this.add.text(16, 400, 'Your score', { fontSize: '36px', fill: '#fff' });
        this.add.text(16, 450, 'Score: ' + gameScore[0].score, { fontSize: '36px', fill: '#fff' });
        this.add.text(300, 450, 'Cheese: ' + gameScore[0].cheese, { fontSize: '36px', fill: '#fff' });
        if (gameScore[0].life <= 0) {
            gameScore[0].life = 0;
        }
        this.add.text(16, 500, 'Life: ' + gameScore[0].life, { fontSize: '36px', fill: '#fff' });



        this.add.text(250, 32, 'NAME', { fontSize: '36px', fill: '#fff' });
        this.add.text(400, 32, 'SCORE', { fontSize: '36px', fill: '#fff' });
        this.add.text(600, 32, 'CHEESE', { fontSize: '36px', fill: '#fff' });
        let score;
        if (localStorage.memberData) {
            score = JSON.parse(localStorage.memberData);
            score.push({"name": gameScore[0].name, "score": gameScore[0].score, "cheese": gameScore[0].cheese})
            localStorage.setItem("memberData", JSON.stringify(score))
        } else {
            score = [{"name": gameScore[0].name, "score": gameScore[0].score, "cheese": gameScore[0].cheese}];
            localStorage.setItem("memberData", JSON.stringify(score));
        }
        let highScoreSorted = _.sortBy(score, 'score');
        highScoreSorted = highScoreSorted.reverse();
        let numberOfScores = 0;
        _.countBy(score, function() {
            numberOfScores++;
        } );
        if (numberOfScores > 8) {
            numberOfScores = 8;
        }
        console.log(numberOfScores)
        
        let i = 0;
        while (i < numberOfScores) {
            let moveDown = i + 1;
            console.log(i)
            this.add.text(250, 32 * moveDown + 32, highScoreSorted[i].name, { fontSize: '36px', fill: '#fff' });
            this.add.text(400, 32 * moveDown + 32, highScoreSorted[i].score, { fontSize: '36px', fill: '#fff' });
            this.add.text(600, 32 * moveDown + 32, highScoreSorted[i].cheese, { fontSize: '36px', fill: '#fff' });
            i++;
        } 
    }
}
