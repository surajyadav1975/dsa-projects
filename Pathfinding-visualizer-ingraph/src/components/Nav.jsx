import React from 'react'
import '../index.css'

function Nav({handleclickdij,handleclickbfs,creategrid}) {

  return (
    <div className='flex w-full h-full justify-center items-center nav'>
         <div className="bg-slate-500 border-solid border-2 border border-slate-800 rounded-lg text-center m-4 p-2 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40 " onClick={creategrid}>
            Generate New Grid
          </div>
        <div className='bg-slate-500 border-solid border-2 border border-slate-800 text-slate-800 hover:shadow-lg shadow-indigo-500/40  rounded-lg text-center m-4 p-2 font-semibold font-serif' onClick={handleclickbfs}>
            Use BFS
        </div>
        <div className='bg-slate-500 border-solid border-2 border border-slate-800 text-slate-800 hover:shadow-lg shadow-indigo-500/40  rounded-lg text-center m-4 p-2 font-semibold font-serif' onClick={handleclickdij}>
            Use Dijkstra
        </div>
      </div>
  )
}

export default Nav