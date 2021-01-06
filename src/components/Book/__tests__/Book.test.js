import { render, screen, fireEvent } from '@testing-library/react'
import Book from '../Book'

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

const addToShoppingBag = jest.fn()

describe('@renders', () => {
  it('in default state', () => {
    const { asFragment } = render(
      <Book book={mockedBook} addToShoppingBag={addToShoppingBag} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe('when book is not out of stock', () => {
    it('should render the book image', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      expect(screen.getByAltText('A live in London')).toHaveAttribute(
        'src',
        'Image 1'
      )
    })

    it('should render the price of the book', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === 'Price:£10.00'
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        )

        return nodeHasText && childrenDontHaveText
      })
    })

    it('should render the firstname and lastname of the author of the book', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === 'Author:Jose Bolufer'
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        )

        return nodeHasText && childrenDontHaveText
      })
    })

    it('should render the title of the book', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      expect(
        screen.getByText('The story about a boy that grew up in London')
      ).toBeInTheDocument()
    })

    it('should render the number of books in stock', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      expect(screen.getByText('In stock: 1')).toBeInTheDocument()
    })

    it('should render the `add to bag` not being dissabled', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      expect(
        screen.getByText('ADD TO BAG').closest('button')
      ).not.toBeDisabled()
    })

    it('should dispatch `addToShoppingBag` action when clicking on `ADD TO BAG`', () => {
      render(<Book book={mockedBook} addToShoppingBag={addToShoppingBag} />)

      fireEvent.click(screen.getByText('ADD TO BAG'))

      expect(addToShoppingBag).toHaveBeenCalledTimes(1)
      expect(addToShoppingBag).toHaveBeenCalledWith(mockedBook)
    })
  })

  describe('when book is out of stock', () => {
    it('should render the book image', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      expect(screen.getByAltText('A live in London')).toHaveAttribute(
        'src',
        'Image 1'
      )
    })

    it('should render the price of the book', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === 'Price:£10.00'
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        )

        return nodeHasText && childrenDontHaveText
      })
    })

    it('should render the firstname and lastname of the author of the book', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === 'Author:Jose Bolufer'
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        )

        return nodeHasText && childrenDontHaveText
      })
    })

    it('should render the title of the book', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      expect(
        screen.getByText('The story about a boy that grew up in London')
      ).toBeInTheDocument()
    })

    it('should render the out of stock text', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      expect(screen.getByText('Out of stock')).toBeInTheDocument()
    })

    it('should render the `add to bag` being dissabled', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      expect(screen.getByText('ADD TO BAG').closest('button')).toBeDisabled()
    })

    it('should not dispatch `addToShoppingBag` action when clicking on `ADD TO BAG`', () => {
      render(
        <Book
          book={{ ...mockedBook, stockAmount: 0 }}
          addToShoppingBag={addToShoppingBag}
        />
      )

      fireEvent.click(screen.getByText('ADD TO BAG'))

      expect(addToShoppingBag).toHaveBeenCalledTimes(0)
    })
  })
})
