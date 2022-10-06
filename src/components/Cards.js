import React, { useContext } from "react";
import Card from "./Card";
import { BookmarksContext } from "../context/BookmarksContext";

const Cards = () => {
    const { filteredBookmarks, } = useContext(BookmarksContext)
    return (
        filteredBookmarks.map(bm => (
            <div className="" key={bm._id}>
                <Card 
                    bookmarkSingle={bm}
                    />
            </div>
        ))
    )
}

export default Cards
