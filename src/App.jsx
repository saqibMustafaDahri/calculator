import React, { useEffect, useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import{ setInput,setResult,clearInput, clearHistory,  } from "./store/calculatorSlice";

function App() {
  
  const [showHistory , setShowHistory]=useState();
  const dispatch =useDispatch();
  const {input, history }=useSelector((state)=>state.calculator);
  const [activeKey,setActiveKey]=useState();
  // const savedHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
  const handleClick =(value)=>{
    if (input.length >= 15) return;
    if (["+", "-", "*", "/", "=" ,"."].includes(value)){
        const result = Function("return " +input)();
        dispatch(setInput(result.toString())); 
        dispatch(setInput(value !=="=" ? result.toString() + value : result.toString()));  
    } else { 
    dispatch(setInput( input + value)); 
   }
  };
  const clear =()=> dispatch(clearInput());
  const calculate = () => {
      const res = Function("return " + input)();
      dispatch(setResult(res.toString()));
      dispatch(setInput(res.toString()));
      dispatch({
        type: "calculator/addHistory",
        payload: { expression: input, result: res.toString() }
      });
    
  };
  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };
  const clearH =()=> dispatch(clearHistory());

  useEffect(()=>{
    const handleKey =(num)=>{
      setActiveKey(num.key);
      if (input.length >= 15) return;
      if ((num.key >= "0" && num.key <= "9") ) {
        dispatch(setInput(input + num.key));}
        else if (["+", "-", "*", "/","=","."].includes(num.key)){
          const result =Function("return " +input)();

          dispatch(setResult(result.toString()));
          dispatch(setInput(result.toString() + num.key));
       }
        else if (num.key === "Enter") {
        num.preventDefault();
        calculate();
      } else if (num.key === "Backspace") {
        clear();
      }
      else if (num.key === "h") {
        toggleHistory();
      }
      else if (num.key === "Delete") {
        clearH();
      }
      setTimeout(()=>setActiveKey(),200);
    };
    window.addEventListener("keydown", handleKey);
    return()=> window.removeEventListener("keydown", handleKey);
  }, [input]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl w-[350px]"> 
        <div className="flex items-center justify-between w-[320px]">
        <p className="text-white text-2xl font-bold font-style: italic ">Standard</p>
      <button onClick={toggleHistory} className={`${activeKey === "h" ? "bg-black text-white" : "bg-gray-900 hover:bg-gray-800 text-white active:bg-black" } text-2xl px-3 py-1.5 rounded-[15%] `}><i  class="fa-solid fa-clock-rotate-left"></i></button>
      </div>
    <div className="bg-black text-white text-right text-3xl p-4 rounded-lg mb-4 h-25 flex items-end justify-end ">{input || "0"}</div>
        { showHistory ?(
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
  ):( 
        <div className="grid grid-cols-4 gap-3">
          <button  onClick={() => handleClick(7)} className={`${activeKey === "7" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>7 </button>
          <button  onClick={() => handleClick(8)} className={`${activeKey === "8" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>8 </button>
          <button  onClick={() => handleClick(9)} className={`${activeKey === "9" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>9 </button>
          <button onClick={() => handleClick("/")} className={`${activeKey === "/" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>/</button>
          <button  onClick={() => handleClick(4)} className={`${activeKey === "4" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>4 </button>
          <button  onClick={() => handleClick(5)} className={`${activeKey === "5" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>5 </button>
          <button  onClick={() => handleClick(6)} className={`${activeKey === "6" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>6 </button>
          <button onClick={() => handleClick("*")} className={`${activeKey === "*" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>*</button>
          <button  onClick={() => handleClick(1)} className={`${activeKey === "1" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>1 </button>
          <button  onClick={() => handleClick(2)} className={`${activeKey === "2" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>2 </button>
          <button  onClick={() => handleClick(3)} className={`${activeKey === "3" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>3 </button>
          <button onClick={() => handleClick("-")} className={`${activeKey === "-" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>-</button>
          <button onClick={() => handleClick("0")} className={`${activeKey === "0" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>0</button>
          <button onClick={() => handleClick(".")} className={`${activeKey === "." ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>.</button>
          <button onClick={calculate} className={`${activeKey === "Enter" ? "bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>=</button>
          <button onClick={() => handleClick("+")} className={`${activeKey === "+" ? "bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>+</button>
          <button onClick={clear} className={`${activeKey === "Backspace" ? "bg-blue-700 text-white" : "bg-red-600 hover:bg-red-800 text-white active:bg-blue-700" } text-2xl font-semibold p-4 rounded-lg`}>C</button>
        </div>
       )}    
   
</div>
      </div>
    
  );
}

export default App; 