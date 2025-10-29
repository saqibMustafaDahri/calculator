import React from "react";
function CalcButton({label, onClick ,activeKey, keyValue ,color="gray"}){
    const baseClasses =
    "text-2xl font-semibold p-4 rounded-lg transition-all duration-150";
const colorStyles={
    gray: 'bg-gray-300 hover:bg-gray-400 text-gray-900 active:bg-blue-700',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-800 text-white active:bg-blue-700',
};

const activeClass=
activeKey === keyValue ? "bg-blue-700 text-white":colorStyles[color];

    return(
<button onClick={() => onClick(label)} className={`${baseClasses} ${activeClass}`}>
    {label}
</button>
    );
}
export default CalcButton;
