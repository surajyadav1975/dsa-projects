import React from "react";
import './Node.css';
import '../index.css';
function Node({row, col, isstart, isfinish, iswall ,istraverse, ispath,handleclick, onMouseDown,onMouseEnter, onMouseUp,}) {

  const extraClassName = isfinish
      ? 'node-finish'
      : isstart
      ? 'node-start'
      : iswall
      ? 'node-wall'
      : ispath
      ? 'node-yellow'
      :istraverse
      ? 'node-traverse'
      : '';

  return (
    <div>
      <div 
      className={`node ${extraClassName}`}
      onClick={()=>handleclick(row,col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      ></div>
    </div>
  );
}

export default Node;

