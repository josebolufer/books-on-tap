import { fetchBooks, fetchBook } from '../api-client'

beforeAll(() => jest.spyOn(window, 'fetch'))

describe('fetchBooks', () => {
  it('should return the correct response when successful', async () => {
    const mockedBooks = [
      {
        author: { firstName: 'Jose', lastName: 'Bolufer' },
        id: '1',
        desription: 'The story about a boy that grew up in London',
        isbn: 'asdfghghghghg',
        price: 10,
        stockAmount: 1,
        thumbnail: 'Image 1',
        title: 'A live in London',
      },
    ]

    window.fetch.mockResolvedValueOnce({
      json: async () => ({
        results: mockedBooks,
      }),
    })

    return fetchBooks().then((response) => {
      expect(response).toBe(mockedBooks)
    })
  })

  it('should return the correct response when not successful', async () => {
    window.fetch.mockRejectedValueOnce('There was an error fetching books')

    return fetchBooks().catch((error) => {
      expect(error).toBe('There was an error fetching')
    })
  })
})

describe('fetchBook', () => {
  it('should return the correct response when successful', async () => {
    const mockedBook = {
      author: { firstName: 'Jose', lastName: 'Bolufer' },
      id: '1',
      desription: 'The story about a boy that grew up in London',
      isbn: 'asdfghghghghg',
      price: 10,
      stockAmount: 1,
      thumbnail: 'Image 1',
      title: 'A live in London',
    }

    window.fetch.mockResolvedValueOnce({
      json: async () => ({
        results: mockedBook,
      }),
    })

    return fetchBook().then((response) => {
      expect(response).toBe(mockedBook)
    })
  })

  it('should return the correct response when unsuccesful', async () => {
    window.fetch.mockRejectedValueOnce('There was an error fetching book')

    return fetchBook().catch((error) => {
      expect(error).toBe('There was an error fetching')
    })
  })
})
