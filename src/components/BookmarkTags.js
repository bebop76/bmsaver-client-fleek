import React, { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";

const BookmarkTags = ({ tag }) => {
    const { setFilteredTag } = useContext(BookmarksContext)

    function cl (e){
        e.preventDefault()
        let {name} = e.target
        setFilteredTag(name.toLocaleUpperCase())
    }

    return(
        <span ><i> [ <a href="#" name={tag.nome} onClick={cl}> {tag.nome} </a> ] </i></span>
    )
}

export default BookmarkTags