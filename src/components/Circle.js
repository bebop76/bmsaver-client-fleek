import React  from "react";

const Circle = ({col, setSelected }) => {
    const { id, colore, valore, selezionato } = col

    return(
        <>
            <div className={`stile ${selezionato === true ? "sel" : ""}`} 
            style={{backgroundColor: colore, 
                    border: selezionato === true ? "3px solid #fff" : "none",
                    outline: selezionato === true ? `3px dotted ${colore}`  : "none"
                    }} 
            onClick={()=>setSelected(id)}></div>
            
        
        </>
    )
}

export default Circle