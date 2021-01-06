export const BOOKS_API_URL = 'https://booksontap.azurewebsites.net/api/Books/'

export const fetchBooks = () =>
  fetch(BOOKS_API_URL)
    .then((response) => response.json())
    .then(({ results }) => results)
    .catch((error) => {
      console.log(error)
    })

export const fetchBook = (id) =>
  fetch(`${BOOKS_API_URL}${id}`)
    .then((response) => response.json())
    .then(({ results }) => results)
    .catch((error) => {
      console.log(error)
    })
