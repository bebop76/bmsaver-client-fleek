import React, { useContext } from "react";
import Tag from "./Tag";
import { BookmarksContext } from "../context/BookmarksContext";

const Tags = () => {

    const {totTags} = useContext(BookmarksContext)
    return(
        <div className="tags-selector">
{        totTags.map(singleTag => (
                <Tag  key={singleTag._id} singleTag={singleTag} />
        ))}
        </div>
    )
}

export default Tags