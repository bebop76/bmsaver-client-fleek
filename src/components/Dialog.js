import React, { useState, useEffect, useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Circles from './Circles';
import Tag from './Tag'
import { colors } from '../utils/Colors'
import uuid from 'react-uuid';

const initInput = {
    titolo: '',
    descrizione: '',
    url: '',

}

const Dialog = () => {

    const { show, setShow, totTags, setTotTags, modalAction, tagsFunc, currentBm, bookFunc } = useContext(BookmarksContext)

    const [tagsInput, setTagsInput] = useState('');
    const [campiTxtForm, setCampiTxtForm] = useState(initInput)
    const [colori, cambiaColore] = useState(colors)
    const [coloreScelto, setColoreScelto] = useState('')
    const [errors, setErrors] = useState({})
    const { user } = useAuthContext()

    useEffect(() => {
        switch (modalAction) {
            case 'new':
                //RESET COLORI
                colori.map((c, i) => {
                    i === 0 ? c.selezionato = true : c.selezionato = false
                })
                //RESET CAMPI INPUT
                setCampiTxtForm(initInput)
                //RESET TAG
                tagsFunc.resetAllTags()
                break

            case 'modify':
                //RECUPERA COLORE
                colori.map(c => {
                    currentBm.colore === c.colore ? c.selezionato = true : c.selezionato = false
                })
                //RECUPERA TAGS
                recuperaTags()
                //RECUPERA CAMPI INPUT
                setCampiTxtForm({
                    titolo: currentBm.titolo,
                    descrizione: currentBm.descrizione,
                    url: currentBm.url,
                })
                break
            default:
                return modalAction
        }
        whichColorChoosen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalAction])

    function recuperaTags() {
        const tagsToModify = totTags.map(ttm => {
            const tagFound = currentBm.tags.find(f => ttm.nome.toLocaleUpperCase() === f.nome.toLocaleUpperCase())
            return tagFound ? { ...ttm, ischeck: true } : { ...ttm, ischeck: false }
        })
        setTotTags(tagsToModify)
    }

    const findErrors = () => {
        const { titolo, descrizione, url } = campiTxtForm
        const newErrors = {}
        if (titolo === '' || !titolo) newErrors.titolo = 'title cannot be empty!'
        else if (titolo.length > 30) newErrors.titolo = 'title too long max 30 characters'
        if (descrizione === '' || !descrizione) newErrors.descrizione = 'description cannot be empty!'
        else if (descrizione.length <= 30) newErrors.descrizione = 'description at least 30 characters'
        if (url === '' || !url) newErrors.url = 'URL cannot be empty'
        else if (url.length > 0) {
            // eslint-disable-next-line
            let checkProtocol = "https?:\/\/"
            let regex = new RegExp(checkProtocol)
            if (!url.match(regex)) newErrors.url = 'please do URL with http:// or https://'
        }

        return newErrors
    }


    const handleClose = () => {
        setShow(false)
    }


    const onHandleTag = e => {
        setTagsInput(e.target.value)
    }


    const onChangeTxtInputs = (e) => {
        const { name, value } = e.target

        setCampiTxtForm({
            ...campiTxtForm,
            [name]: value
        })
        if (!!errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            })
        }

    }

    const setSelected = id => {
        cambiaColore(
            colori.map(colore => {
                if (colore.id === id) {
                    colore.selezionato = true
                } else {
                    colore.selezionato = false
                }
                return colore
            })
        )
        whichColorChoosen()
    }

    const whichColorChoosen = () => {
        colori.map(colore => {
            if (colore.selezionato === true) {
                setColoreScelto(colore.colore)
            }
        })
    }

    const addTagsHandler = () => {
        tagsFunc.addTags(tagsInput)
        setTagsInput('')
    }

    const prepareBookForSave = () => {

        const tagSelected = totTags.filter(x => x.ischeck === true)
        let stato = modalAction === 'new' ? uuid() : currentBm._id
        const newBookmark = {
            _id: stato,
            titolo: campiTxtForm.titolo,
            descrizione: campiTxtForm.descrizione,
            url: campiTxtForm.url,
            colore: coloreScelto,
            tags: tagSelected
        }
        return newBookmark

    }
    const handleSave = () => {
        const newErrors = findErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            if (!user) {
                setErrors('You must be logged in')
                return
            }
            const newOrModifyBookmark = prepareBookForSave()
            switch (modalAction) {
                case 'new':
                    bookFunc.addBookmark(newOrModifyBookmark)
                    break
                case 'modify':
                    bookFunc.modifyBookmark(newOrModifyBookmark)
                    break
                default:
                    return modalAction
            }
            setShow(false)
        }
    }



    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalAction === 'new' ? 'Add new bookmark' : 'Modify  bookmark'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={campiTxtForm.titolo}
                                onChange={onChangeTxtInputs}
                                name="titolo"
                                isInvalid={!!errors.titolo}
                                autoFocus
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.titolo}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={campiTxtForm.descrizione}
                                onChange={onChangeTxtInputs}
                                name="descrizione"
                                isInvalid={!!errors.descrizione}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.descrizione}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>URL:</Form.Label>
                            <Form.Control
                                type="text"
                                value={campiTxtForm.url}
                                onChange={onChangeTxtInputs}
                                placeholder=""
                                name="url"
                                autoFocus
                                isInvalid={!!errors.url}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.url}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="tags-lab">Tags:<span><Button className="add-btn" variant="primary" onClick={addTagsHandler}>+</Button></span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={onHandleTag}
                                value={tagsInput}
                                autoFocus
                            />
                            <Form.Text muted>
                                For multiple tags separate them with comma
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            {/* <Tags  /> */}
                            <div className="tags-selector">
                                {totTags.map(singleTag => (
                                    <Tag key={singleTag._id} singleTag={singleTag} />
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Color:</Form.Label><br />

                            <Circles col={colori} setSelected={setSelected} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Dialog