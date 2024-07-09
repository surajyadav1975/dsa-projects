import React from 'react';
import './Visualizer.css';
import { mergeSortalgo } from '../SortingAlgos/Sortingalgo';
import "bootstrap/dist/css/bootstrap.min.css";

const ANIMATION_SPEED_MS = 1;

const PRIMARY_COLOR = 'turquoise';

const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:[],
        };
    }
    componentDidMount(){
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 220; i++) {
          array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
      }
    
      mergeSort() {
        const animations = mergeSortalgo(this.state.array);
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        } else {
            setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
        
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
        }
      }
    
      quickSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
      }
    
      heapSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
      }
    
      bubbleSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
      }

 

    render() {
        const {array} = this.state;
    
        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{height: `${value}px`}}
                    ></div>
                ))}
                <div className='buttons'>
                    <button className="btn btn-outline-primary" style={{margin: `5px`}} onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="btn btn-outline-secondary" style={{margin: `5px`}} onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="btn btn-outline-secondary" style={{margin: `5px`}} onClick={() => this.quickSort()}>Quick Sort</button>
                    <button  className="btn btn-outline-secondary" style={{margin: `5px`}} onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="btn btn-outline-secondary" style={{margin: `5px`}} onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}