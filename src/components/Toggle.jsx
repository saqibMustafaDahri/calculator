import React from "react";
function Toggle({toggleHistory,activeKey}){
    return(

<div className="flex items-center justify-between w-[320px]">
        <p className="text-white text-2xl font-bold font-style: italic ">Standard</p>
      <button onClick={toggleHistory} className={`${activeKey === "h" ? "bg-black text-white" : "bg-gray-900 hover:bg-gray-800 text-white active:bg-black" } text-2xl px-3 py-1.5 rounded-[15%] `}><i  class="fa-solid fa-clock-rotate-left"></i></button>
      </div>
    );   
}
export default Toggle;