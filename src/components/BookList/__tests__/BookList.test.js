import { render, getAllByTestId, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookList from '../BookList'

const mockedBooks = [
  {
    author: { firstName: 'Jose', lastName: 'Bolufer' },
    id: '1',
    description: 'The story about a boy that grew up in London',
    isbn: 'asdfghghghghg',
    price: 10,
    stockAmount: 1,
    thumbnail: 'Image 1',
    title: 'A live in London',
  },
  {
    author: { firstName: 'Jose', lastName: 'Bolufer' },
    id: '2',
    description: 'The story about JS',
    isbn: 'asdfghghghghg',
    price: 10,
    stockAmount: 1,
    thumbnail: 'Image 1',
    title: 'A live in Spain',
  },
]

describe('@renders', () => {
  it('in default state', () => {
    const { asFragment } = render(<BookList />, {
      wrapper: MemoryRouter,
    })
    expect(asFragment()).toMatchSnapshot()
  })

  describe('when fetching prop is equal to false', () => {
    it('should render a list of books', () => {
      render(<BookList books={mockedBooks} fetching={false} />, {
        wrapper: MemoryRouter,
      })

      const listItems = getAllByTestId(document.body, 'book-list-item')

      expect(listItems).toHaveLength(2)
    })
  })

  describe('when `fetching` prop is equal to true', () => {
    it('should render a progress bar', () => {
      render(<BookList books={mockedBooks} fetching />, {
        wrapper: MemoryRouter,
      })

      const linearProgressWrapper = getAllByTestId(
        document.body,
        'book-list-fetching'
      )

      expect(linearProgressWrapper).toHaveLength(1)
    })
  })

  describe('when there are no books to show and client is not fetching', () => {
    it('should render text `There are 0 books to display.`', () => {
      render(<BookList />, {
        wrapper: MemoryRouter,
      })

      expect(
        screen.getByText('There are 0 books to display.')
      ).toBeInTheDocument()
    })
  })
})
