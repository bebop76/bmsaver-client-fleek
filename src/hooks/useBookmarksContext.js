import { BookmarksContext } from '../context/BookmarksContext'
import { useContext } from 'react'

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext)

  if (!context) {
    throw Error('useBookmarksContext must be used inside an BookmarksContextProvider')
  }

  return context
}