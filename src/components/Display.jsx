import React from "react";

function Display({input}) {
    return(
        <div className="bg-black text-white text-right text-3xl p-4 rounded-lg mb-4 h-25 flex items-end justify-end ">{input || "0"}</div>
    );
    
}
export default Display;