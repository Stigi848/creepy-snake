import React, {Component} from "react";
import Cells from "./Cells";
import {START, BODY, FOOD, KEYS, COLS, ROWS} from './const';
import './style.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            snake: [],
            direction: null,
            gameOver: false
        };
        this.setting = this.setting.bind(this);
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    start() {
        const board = [];
        board[START] = BODY;
        const snake = [START];
        this.setState({
            board,
            snake,
            direction: KEYS.left
        }, () => {
            this.setting();
        });
    }


    setting() {
        let {snake, board, direction} = this.state;

        const head = this.Snakemove(snake[0], direction);



        const food = board[head] === FOOD ||
            snake.length === 1;


        if (snake.indexOf(head) !== -1) {
            this.setState({gameOver: true});
            return;
        }

        if (food) {
            const allCells = ROWS * COLS;

            let i;
           do  {
                i = Math.floor(Math.random() * allCells);
            }
            while (board[i]);
            board[i] = FOOD;
        } else {

            board[snake.pop()]=null;
        }

        board[head] = BODY;

        snake.unshift(head);
        if (this.nextDirection) {
            direction = this.nextDirection;
            this.nextDirection = null;
        }

        this.setState({
            board,
            snake,
            direction
        }, () => {
            setTimeout(this.setting, 200)
        })
    }


    move = (event) => {
        const direction = event.nativeEvent.keyCode;

        const reverseMove = Math.abs(this.state.direction - direction);

        if (reverseMove !== 0 && reverseMove !== 2) {
            this.nextDirection = direction;
        }
    };

    Snakemove(head, direction) {
        let x = head % ROWS;
        let y = Math.floor(head / COLS);
        // console.log(x, y);
        console.log(head);


        switch (direction) {
            case KEYS.up:
                y = y <= 0 ? COLS : y - 1;
                break;
            case KEYS.down:
                y = y >= COLS ? 0 : y + 1;
                break;
            case KEYS.left:
                x = x <= 0 ? ROWS - 1 : x - 1;
                break;
            case KEYS.right:
                x = x >= ROWS - 1 ? 0 : x + 1;
                break;
            default:
                return;
        }
        return (COLS * y) + x;
    //    klucz pozycja jak w Cells
    }


    render() {
        const {board} = this.state;
        return (
            <Cells
                move={this.move}
                board={board}
            />
        )
    }
}

export default Game;