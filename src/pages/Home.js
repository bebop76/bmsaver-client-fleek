
import React, { useContext, useEffect, } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import MenuNav from "../components/MenuNav";
import Cards from "../components/Cards";
import Dialog from "../components/Dialog";
import AccountManage from "../components/AccountManage";

function Home() {

  const { show, displayAccount, setBookmark, setTotTags, bookmarks, } = useContext(BookmarksContext)
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchBookmarks = async () => {
      const opt = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      }
      const response = await fetch('https://kind-rose-angelfish-cape.cyclic.app/api/bookmarks', opt)
      const json = await response.json()

      if (response.ok) {
        setBookmark(json)
      }
    }
    if (user) {
      fetchBookmarks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBookmark])

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('https://kind-rose-angelfish-cape.cyclic.app/api/tags', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()

      if (response.ok) {
        const tagUpd = json.map(t => {
          return { ...t, ischeck: false }
        })
        setTotTags(tagUpd)
      }
    }
    fetchTags()
  }, [setTotTags])



  return (

    <div className="App">
      <MenuNav />

      <div className="container">

        <Cards />

        {show && <Dialog />}

        {displayAccount && <AccountManage />}
      </div>
    </div>

  );
}

export default Home;
