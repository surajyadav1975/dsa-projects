import React from 'react'
import Node from './Node'
import '../index.css'

function Grid({grids,handleclick,onMouseDown,onMouseEnter,onMouseUp}) {

  return (
      <div className="">
        {grids.map((row,rowidx)=>{
          return (
            <div className='flex' key={rowidx}>
              {row.map((node,nodeidx)=>{
                const {row, col, isfinish, isstart,iswall,istraverse,ispath} = node;
                return (
                  <Node 
                  key={nodeidx} 
                  row={row} 
                  col={col} 
                  isstart={isstart} 
                  isfinish={isfinish} 
                  iswall={iswall}
                  istraverse={istraverse}
                  ispath={ispath}
                  handleclick={handleclick}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseEnter={onMouseEnter}
                  ></Node>
                )})}
            </div>
          )
        })}
      </div>
  )
}

export default Grid;