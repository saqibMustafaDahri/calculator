import React, { useEffect, useState  } from "react";
import { useSelector,useDispatch } from "react-redux";
import{ setInput,setResult,clearInput, clearHistory,  } from "./store/calculatorSlice";
import CalcButton from "./components/CalcButton";
import Display from "./components/Display";
import History from "./components/History";
import Toggle from "./components/Toggle";
function App() {
  const [showHistory , setShowHistory]=useState();
  const dispatch =useDispatch();
  const {input, history }=useSelector((state)=>state.calculator);
  const [activeKey,setActiveKey]=useState();
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
      <Toggle toggleHistory={toggleHistory} activeKey={activeKey}/>
      <Display input={input} />
        { showHistory ?(
  <History history={history} clearH={clearH} activeKey={activeKey}/>
):( 
        <div className="grid grid-cols-4 gap-3">
          <CalcButton label="7" onClick={handleClick}  keyValue="7"/>
          <CalcButton label="8" onClick={handleClick}  keyValue="8"/>
          <CalcButton label="9" onClick={handleClick}  keyValue="9"/>
          <CalcButton label="/" onClick={handleClick}  keyValue="/"/>
          <CalcButton label="4" onClick={handleClick}  keyValue="4"/>
          <CalcButton label="5" onClick={handleClick}  keyValue="5"/>
          <CalcButton label="6" onClick={handleClick}  keyValue="6"/>
          <CalcButton label="*" onClick={handleClick}  keyValue="*"/>
          <CalcButton label="1" onClick={handleClick}  keyValue="1"/>
          <CalcButton label="2" onClick={handleClick}  keyValue="2"/>
          <CalcButton label="3" onClick={handleClick}  keyValue="3"/>
          <CalcButton label="-" onClick={handleClick}  keyValue="-"/>
          <CalcButton label="0" onClick={handleClick}  keyValue="0"/>
          <CalcButton label="." onClick={handleClick}  keyValue="."/>
          <CalcButton label="=" onClick={calculate}  keyValue="Enter" color="blue"/>
          <CalcButton label="+" onClick={handleClick}  keyValue="+"/>
          <CalcButton label="c" onClick={clear}  keyValue="Backspace" color="red"/>
        </div>
       )}    
   
</div>
      </div>
    
  );
}
export default App; 