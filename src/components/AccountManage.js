import React, { useContext, useEffect, } from 'react';
import { BookmarksContext } from '../context/BookmarksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Tags from './Tags'

const AccountManage = () => {
  const { displayAccount, setDisplayAccount, totTags, setTotTags, tagsFunc,} = useContext(BookmarksContext)


  const { user } = useAuthContext()

  useEffect(() => {
    tagsFunc.resetAllTags()
    // eslint-disable-next-line
  }, [])


  function delTagsFromBook() {
    const tagsToDelArray = totTags.filter(ttd => ttd.ischeck === true)
    // console.log('RIMODIONE DI:', tagsToDelArray)
    tagsFunc.updateTagsFromBookmarks(tagsToDelArray)

  }

  const deleteTags = () => {
    tagsFunc.deleteTags()
    delTagsFromBook()
  }

  return (
    <React.Fragment>

      <Modal show={displayAccount} fullscreen={true} onHide={() => setDisplayAccount(false)}>
        <Modal.Header closeButton>
          <Modal.Title><h1>ACCOUNT MANAGE</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="informations"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="informations" title="INFO" className='tab-label'>
              <p><span>mail/username: </span><input type="text" value={user.email} disabled /></p>
              <p><button>Change Password</button></p>
            </Tab>
            <Tab eventKey="deletetag" title="DELETE TAGS" className='tab-label'>
              <Tags totTags={totTags} setTotTags={setTotTags}
              />
              <button onClick={deleteTags}>Delete</button>
            </Tab>

          </Tabs>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default AccountManage