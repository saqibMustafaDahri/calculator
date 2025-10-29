import React from "react";
function History({history,clearH,activeKey}){
    return(
<div className="bg-gray-800 text-white mt-4 p-4 rounded-lg h-92 overflow-y-auto ">
    <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold mb-2">History</h2>
    <button onClick={clearH}  className={`${activeKey === "Delete" ? "bg-red-700 text-white" : "bg-gray-800 hover:bg-orange-900 text-white active:bg-red-700" } text-[20px] font-semibold px-3 py-1.5 rounded-lg `}><i class="fa-solid fa-trash"></i></button>
    </div>
    {history.length === 0 ? (
      <p className="text-gray-400">There's no history yet</p>
    ) : (
      history.map((item, index) => (
        <div key={index} className="border-b border-gray-600 py-1">
          <p>{item.expression} = {item.result}</p>
        </div>
      ))
    )}
  </div>
  
    );
}
export default History;