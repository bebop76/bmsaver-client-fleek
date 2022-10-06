import React, { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// import sampleData from "../utils/SampleData";
// import {allTags} from '../utils/SampleTags'

export const BookmarksContext = createContext()

export const BookmarksContextProvider = ({ children }) => {
    const [bookmarks, setBookmark] = useState([])
    const [totTags, setTotTags] = useState([])
    const [show, setShow] = useState(false) //show dialog
    const [modalAction, setModalAction] = useState('')
    const [currentBm, setCurrentBM] = useState({}) //Bookmark corrente selezionato
    const [displayAccount, setDisplayAccount] = useState(false) //visualizza il modal Account
    const [filteredTag, setFilteredTag] = useState('off') //switch per attivare il filtro e impostare il tag di filtro
    const [filteredBookmarks, setFilteredBookmarks] = useState([]) //Bokkmarks filtrati
    const { user } = useAuthContext()


    const tagsFunc = {
        resetAllTags: function () {
            const tagUnflag = totTags.map(t => {
                return {
                    ...t, ischeck: false
                }
            })
            setTotTags(tagUnflag)
        },
        deleteTags: async function () {
            totTags.map(async ttd => {
                if (ttd.ischeck === true) {
                    const response = await fetch('/api/tags/' + ttd._id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(ttd)
                    })
                    const json = await response.json()
                    if (response.ok) {
                        console.log("Eliminato ", json)
                    }

                }

            })

            //per evitare sovraccarico sul server la cancellazione dei tags avviene tramite react e non richiamando fetch getTags
            const tagsDopoCancellazione = totTags.filter(tt => tt.ischeck !== true)
            setTotTags(tagsDopoCancellazione)
        },
        updateTagsFromBookmarks: function (tagsToDelete) {

            const upd = bookmarks.map(bookmark => {
                return { ...bookmark, tags: bookmark.tags.filter((tag) => !tagsToDelete.find((tdr) => tag.nome.toLocaleUpperCase() === tdr.nome.toLocaleUpperCase())) }
            })
            setBookmark(upd)
        },
        addTags: async function (inputText) {
            let arr, finalArray = []
            arr = inputText.split(",")
            const unique = this.removeDuplicates(arr)
            unique.forEach(element => {
                element = element.trim().toLocaleUpperCase()
                const trovato = totTags.some(x => x.nome === element)
                if (trovato === false && element !== '') {
                    finalArray.push({ nome: element })
                }
            })

            const response = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: finalArray })
            })
            const json = await response.json()
            if (response.ok) {

                const addIscheck = json.map(tagsToInsert => {
                    return { ...tagsToInsert, ischeck: true }
                })
                setTotTags([...totTags, ...addIscheck])

            }

        },
        removeDuplicates: function (data) {
            return [...new Set(data)]
        },
    }
    const bookFunc = {
        addBookmark: async function (bookToAdd) {
            bookToAdd.tags.map(item => {
                return delete item.ischeck
            })
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(bookToAdd)
            })
            const json = await response.json()
            if (response.ok) {
                setBookmark([json, ...bookmarks])
            }

        },
        modifyBookmark: async function (bookUpdated) {
            bookUpdated.tags.map(itm => {
                return delete itm.ischeck
            })

            const response = await fetch('/api/bookmarks/' + bookUpdated._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(bookUpdated)
            })
            const json = await response.json()
            if (response.ok) {

                const upd = await fetch('/api/bookmarks/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                })
                const jsonUpd = await upd.json()
                if (upd.ok){
                    setBookmark(jsonUpd)
                }
            }

            //     setBookmark(bookmarks.map(item => {
            //         if (item._id === json._id) {
            //             return { ...item, json }
            //         }
            //         return item
            //     }))
            // }

        },
        deleteBookmark: async function (bookToDel) {
            const response = await fetch('/api/bookmarks/' + bookToDel._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()
            if (response.ok) {
                setBookmark(
                    bookmarks.filter(b => b._id !== json._id)
                )
            }
        }
    }

    useEffect(() => {
        filteredTag === 'off' ?
            setFilteredBookmarks(bookmarks)
            :
            setFilteredBookmarks(bookmarks.filter(book => book.tags.find(fb => fb.nome.toLocaleUpperCase() === filteredTag.toUpperCase())))
    }, [bookmarks, filteredTag])

    return (
        <BookmarksContext.Provider value={{
            bookmarks, setBookmark,
            totTags, setTotTags,
            show, setShow,
            modalAction, setModalAction,
            currentBm, setCurrentBM,
            displayAccount, setDisplayAccount,
            filteredTag, setFilteredTag,
            filteredBookmarks, setFilteredBookmarks,
            tagsFunc,
            bookFunc,
        }}>
            {children}
        </BookmarksContext.Provider>
    )
}

