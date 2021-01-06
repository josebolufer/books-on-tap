import { useEffect, useState } from 'react'
import { fetchBooks } from '../../../utils/api-client'
import BookList from '../../BookList/BookList'

const BooksListContainer = () => {
  const [books, setBooks] = useState([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setFetching(true)
    fetchBooks()
      .then((bookList) => {
        setBooks(bookList)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setFetching(false)
      })
  }, [setBooks, setFetching])

  return <BookList books={books} fetching={fetching} />
}

export default BooksListContainer
