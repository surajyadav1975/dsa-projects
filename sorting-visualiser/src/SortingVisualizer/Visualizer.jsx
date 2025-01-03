import React from 'react';
import './Visualizer.css';
import { mergeSortalgo } from '../SortingAlgos/MergeSortalgo';
import { bubbleSortalgo } from '../SortingAlgos/BubbleSortalgo';
import { quicksortalgo } from '../SortingAlgos/QuickSortalgo';
import "bootstrap/dist/css/bootstrap.min.css";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            isAnimating: false,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    startAnimation(algorithm) {
        if (this.state.isAnimating) {
            alert("An animation is already running. Please wait for it to finish.");
            return;
        }

        this.setState({ isAnimating: true }, () => {
            algorithm(() => {
                // Callback to reset animation state when complete
                this.setState({ isAnimating: false });
            });
        });
    }

    resetArray() {
        if (this.state.isAnimating) {
            alert("Cannot reset array while animation is running.");
            return;
        }

        const array = [];
        const len = document.getElementById("customRange2").value;
        for (let i = 0; i < len; i++) {
            array.push(randomIntFromInterval(5, 520));
        }
        this.setState({ array });
    }

    mergeSort() {
        this.startAnimation((callback) => {
            const animations = mergeSortalgo(this.state.array);
            const arrayBars = document.getElementsByClassName('array-bar');
            const speed = document.getElementById("customRange3").value;

            animations.forEach((animation, i) => {
                const isColorChange = i % 3 !== 2;
                setTimeout(() => {
                    if (isColorChange) {
                        const [barOneIdx, barTwoIdx] = animation;
                        const color = i % 3 === 0 ? "red" : "turquoise";
                        arrayBars[barOneIdx].style.backgroundColor = color;
                        arrayBars[barTwoIdx].style.backgroundColor = color;
                    } else {
                        const [barOneIdx, newHeight] = animation;
                        arrayBars[barOneIdx].style.height = `${newHeight}px`;
                    }
                }, i * speed);

                if (i === animations.length - 1) {
                    setTimeout(callback, (i + 1) * speed);
                }
            });
        });
    }

    heapSort() {
        alert("Still in Progress, till then try other algo's")
    }

    quickSort() {
        this.startAnimation((callback) => {
            const animations = quicksortalgo(this.state.array);
            const arrayBars = document.getElementsByClassName('array-bar');
            const speed = document.getElementById("customRange3").value;

            animations.forEach((animation, i) => {
                const [barOneIdx, barTwoIdx, pivotIdx, barOneHeight, barTwoHeight, pivotHeight] = animation;

                setTimeout(() => {
                    if (i % 2 === 0) {
                        arrayBars[barOneIdx].style.backgroundColor = "red";
                        arrayBars[barTwoIdx].style.backgroundColor = "red";
                        arrayBars[pivotIdx].style.backgroundColor = "red";
                    } else {
                        if (barTwoHeight < pivotHeight) {
                            const barOneStyle = arrayBars[barOneIdx].style;
                            const barTwoStyle = arrayBars[barTwoIdx].style;
                            barOneStyle.height = `${barTwoHeight}px`;
                            barTwoStyle.height = `${barOneHeight}px`;
                        }
                        arrayBars[barOneIdx].style.backgroundColor = "turquoise";
                        arrayBars[barTwoIdx].style.backgroundColor = "turquoise";
                    }
                }, i * speed);

                if (i === animations.length - 1) {
                    setTimeout(callback, (i + 1) * speed);
                }
            });
        });
    }

    bubbleSort() {
        this.startAnimation((callback) => {
            const animations = bubbleSortalgo(this.state.array);
            const arrayBars = document.getElementsByClassName('array-bar');
            const speed = document.getElementById("customRange3").value;

            animations.forEach((animation, i) => {
                const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animation;

                setTimeout(() => {
                    if (i % 2 === 0) {
                        arrayBars[barOneIdx].style.backgroundColor = "red";
                        arrayBars[barTwoIdx].style.backgroundColor = "red";
                    } else {
                        if (barOneHeight > barTwoHeight) {
                            const barOneStyle = arrayBars[barOneIdx].style;
                            const barTwoStyle = arrayBars[barTwoIdx].style;
                            barOneStyle.height = `${barTwoHeight}px`;
                            barTwoStyle.height = `${barOneHeight}px`;
                        }
                        arrayBars[barOneIdx].style.backgroundColor = "turquoise";
                        arrayBars[barTwoIdx].style.backgroundColor = "turquoise";
                    }
                }, i * speed);

                if (i === animations.length - 1) {
                    setTimeout(callback, (i + 1) * speed);
                }
            });
        });
    }

    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                <div className="bars-wrapper">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px`, width: `${600 / array.length}px` }}
                        ></div>
                    ))}
                </div>
                <div className="footer">
                    <div className="buttons-group">
                        <button onClick={() => this.resetArray()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button onClick={() => this.quickSort()}>Quick Sort</button>
                        <button onClick={() => this.heapSort()}>Heap Sort</button>
                        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>
                    <div className="slider">
                        <label htmlFor="customRange2">Array Length</label>
                        <input type="range" min="10" max="100" step="10" id="customRange2" />
                    </div>
                    <div className="slider">
                        <label htmlFor="customRange3">Speed of Algo</label>
                        <input type="range" min="1" max="200" step="10" id="customRange3" />
                    </div>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
