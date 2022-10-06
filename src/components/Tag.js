import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { BookmarksContext } from "../context/BookmarksContext";

const Tag = ({ singleTag, }) => {

    const {totTags, setTotTags} = useContext(BookmarksContext)

    const change = (e) => {
        const u = totTags.map(t => {
            if(t._id === singleTag._id){
                return{
                    ...t, ischeck: !singleTag.ischeck
                }
            }
            return t
        })
        setTotTags(u)

    }

    return(
            <Form.Check className="tag-to-select" type="checkbox" 
                        id={singleTag._id}
                        label={singleTag.nome} 
                        name={singleTag.nome} 
                        value={singleTag.nome}
                        onChange={change}
                        checked={singleTag.ischeck || false}
                        />

    )
}

export default Tag