import React from "react";
import Grid from "./components/Grid";
import { useState } from "react";
import "./index.css";
import Nav from "./components/Nav";
import {BFS, dijkstra, getNodesInShortestPathOrder} from "./assets/Algo";

let startnoderow = 10;
let startnodecol = 20;
let finishnoderow = 10;
let finishnodecol = 40;

function App() {
  const [grids, set] = useState([[]]);
  const [mouseIsPressed, setmouseispressed] = useState(false);

  const createNode = (row,col) => {
    return {
      row,
      col,
      isstart: row == startnoderow && col == startnodecol,
      isfinish: row == finishnoderow && col == finishnodecol,
      iswall: false,
      istraverse: false,
      dist: Infinity,
      isvisited: false,
      ispath: false,
      prev: null,
    };
  };

  function creategrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row,col));
      }
      grid.push(currentRow);
    }
    set(grid);
  }
  function handleclickbfs(){
    const animate=BFS(grids,[startnoderow,startnodecol],[finishnoderow,finishnodecol]);
    dijkstra(grids,grids[startnoderow][startnodecol],grids[finishnoderow][finishnodecol]);
    const path=getNodesInShortestPathOrder(grids[10][40]);
      for(let i=0;i<=animate.length;i++){
        if(i===animate.length){
          setTimeout(()=>{
            animatepath(path);
          },5*i);
          return;
        }
        else{
          let x=animate[i][0];
          let y=animate[i][1];
          setTimeout(() => {
            const newnode=[...grids];
            newnode[x][y].istraverse=true;
            set(newnode);
          }, 5*i);
      }
    }
  }

  function handleclickdij(){
      const animate=dijkstra(grids,grids[startnoderow][startnodecol],grids[finishnoderow][finishnodecol]);
      const path=getNodesInShortestPathOrder(grids[10][40]);

      if(path.length===1) return;

      for(let i=0;i<=animate.length;i++){
        if(i===animate.length){
          setTimeout(()=>{
            animatepath(path);
          },5*i);
          return;
        }
        else{
          let x=animate[i].row;
          let y=animate[i].col;
          setTimeout(() => {
            const newnode=[...grids];
            newnode[x][y].istraverse=true;
            set(newnode);
          }, 5*i);
        }
      }
  }

  function animatepath(path){
    for(let i=0;i<path.length;i++){
      let x=path[i].row;
      let y=path[i].col;
      setTimeout(() => {
        const newnode=[...grids];
        newnode[x][y].ispath=true;
        set(newnode);
      }, 50*i);
    }
  }

  function handleclicknode(row,col){
    startnoderow=row;
    startnodecol=col;
    creategrid()
  }

  function handleMouseDown(row, col) {
    const newGrid = [...grids];
    newGrid[row][col].iswall=true;
    set(newGrid);
    setmouseispressed(true);
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = [...grids];
    newGrid[row][col].iswall=true;
    set(newGrid);
  }

  function handleMouseUp() {
    setmouseispressed(false);
  }


  return (
    <>
      <div className="w-full h-full fixed flex flex-col justify-center items-center">
        <Nav handleclickbfs={handleclickbfs} handleclickdij={handleclickdij} creategrid={creategrid}></Nav>
        <div className="flex justify-center items-center p-5 matrix w-full h-full ">
          <Grid 
          grids={grids} 
          handleclick={(row,col)=>handleclicknode(row,col)}
          onMouseDown={(row, col) => handleMouseDown(row, col)}
          onMouseEnter={(row, col) =>
            handleMouseEnter(row, col)
          }
          onMouseUp={() => handleMouseUp()}
          ></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
