import React from "react";
import { Row, Col } from "react-bootstrap";
import Curtains from './Curtains'
import BookmarkTags from "./BookmarkTags";
import { FaBars } from "react-icons/fa";


const Card = ({ bookmarkSingle }) => {
    const { _id, titolo, descrizione, url, colore, tags } = bookmarkSingle

    const down = () => {
        document.getElementById(_id).style.height = "100%"
    }

    return (

        <div className="card">

            <Curtains
                bookmarkSingle={bookmarkSingle}
            />

            <div className="headstick" style={{ backgroundColor: colore }}></div>
            <div className="card-body">
                <div className="cont">
                    <Row>
                        <Col><h5 className="card-title"><b>{titolo}</b></h5></Col>
                        <Col><span style={{ fontSize: "1.5rem", float: "right", cursor: "pointer" }} onClick={down}><FaBars className="hamb-icon" /></span></Col>
                    </Row>
                </div>
                <p className="card-text">{descrizione}</p>
                <p className="tags-bar" style={{ backgroundColor: colore }}>TAGS:</p>


            </div>
            <div className="card-body">
                <div className="tags-container">
                    {tags.map(tag => (
                        <BookmarkTags key={tag._id} tag={tag} />
                    ))}
                </div>
            </div>
            <div className="card-body">
                <a href={url} target="_blank" rel="noreferrer"><button className="btn go-button btn-primary btn-lg">GO</button></a>
            </div>
        </div>

    )
}

export default Card