import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Book from '../../Book/Book'
import { fetchBook } from '../../../utils/api-client'
import { addToShoppingBag } from '../../../redux/actions/shoppingBagActions'

const BookContainer = (props) => {
  const [book, setBook] = useState({})
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const {
      match: { params },
    } = props

    setFetching(true)

    fetchBook(params.id)
      .then((book) => {
        setBook(book)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setFetching(false)
      })
  }, [props])

  return (
    <Book
      book={book}
      addToShoppingBag={props.addToShoppingBag}
      fetching={fetching}
    />
  )
}

const mapDispatchToProps = {
  addToShoppingBag,
}

export default connect(null, mapDispatchToProps)(BookContainer)
