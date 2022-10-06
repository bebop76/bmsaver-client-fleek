import React from "react";
import Circle from "./Circle";

const Circles = ({col ,  setSelected }) => {

    return(
        <div style={{height: 'auto', display: "inline-block",padding: "5px"}}>
        {col.map((c) => (
            <Circle key={c.id} col={c}  setSelected={setSelected} />
            )) 
        } 
   </div>
    )
}

export default Circles