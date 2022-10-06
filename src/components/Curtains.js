import React, { useContext, } from "react"
import { BookmarksContext } from "../context/BookmarksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { Button } from "react-bootstrap";
import { BsTrash, BsFillPencilFill, BsFillXCircleFill } from "react-icons/bs";


const Curtains = ({ bookmarkSingle }) => {
    const { setShow, setModalAction, setCurrentBM, bookFunc } = useContext(BookmarksContext)
    const { user } = useAuthContext()

    const { _id } = bookmarkSingle

    const up = () => {
        document.getElementById(_id).style.height = "0%"
    }

    const modify = () => {
        setCurrentBM(bookmarkSingle)
        setShow(true)
        up()
        setModalAction('modify')

    }
    const remove = () => {
        if (!user) {
            return
        }
        up()
        bookFunc.deleteBookmark(bookmarkSingle)

    }

    return (

        <div id={_id} className="curtain">
            <a href="#" onClick={up} id="close" className="closebtn"><BsFillXCircleFill fontSize={"2rem"} /></a>
            <div className="curt-content">
                <Button variant="secondary" onClick={modify}><BsFillPencilFill /></Button>
                <Button variant="secondary" onClick={remove}><BsTrash /></Button>

            </div>
        </div>
    )
}

export default Curtains