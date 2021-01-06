import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookListItem from '../BookListItem'

const mockedBook = {
  author: { firstName: 'Jose', lastName: 'Bolufer' },
  id: '1',
  description: 'The story about a boy that grew up in London',
  isbn: 'asdfghghghghg',
  price: 10,
  stockAmount: 1,
  thumbnail: 'Image 1',
  title: 'A live in London',
}

describe('@renders', () => {
  it('in default state', () => {
    const { asFragment } = render(<BookListItem book={mockedBook} />, {
      wrapper: MemoryRouter,
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the book image', () => {
    render(<BookListItem book={mockedBook} />, {
      wrapper: MemoryRouter,
    })

    expect(screen.getByAltText(mockedBook.title)).toHaveAttribute(
      'src',
      mockedBook.thumbnail
    )
  })

  it('should render the book title', () => {
    render(<BookListItem book={mockedBook} />, {
      wrapper: MemoryRouter,
    })

    expect(screen.getByText(mockedBook.title)).toBeInTheDocument()
  })

  it('should render the book author', () => {
    render(<BookListItem book={mockedBook} />, {
      wrapper: MemoryRouter,
    })

    expect(
      screen.getByText(
        `By ${mockedBook.author.firstName} ${mockedBook.author.lastName}`
      )
    ).toBeInTheDocument()
  })

  it('should render the price of the book', () => {
    render(<BookListItem book={mockedBook} />, {
      wrapper: MemoryRouter,
    })

    expect(
      screen.getByText(`£${mockedBook.price.toFixed(2)}`)
    ).toBeInTheDocument()
  })

  it('should render the view button', () => {
    render(<BookListItem book={mockedBook} />, {
      wrapper: MemoryRouter,
    })

    expect(screen.getByText('View').closest('a')).toHaveAttribute(
      'href',
      `/book/${mockedBook.id}`
    )
  })
})
