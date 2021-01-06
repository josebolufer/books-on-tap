import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import ShoppingBag from '../ShoppingBag'

const mockedShoppingBagItems = [
  {
    author: { firstName: 'Jose', lastName: 'Bolufer' },
    id: '1',
    description: 'The story about a boy that grew up in London',
    isbn: 'asdfghghghghg',
    price: 10,
    stockAmount: 5,
    thumbnail: 'Image 1',
    title: 'A live in London',
    quantity: 1,
  },
  {
    author: { firstName: 'Jose', lastName: 'Bolufer' },
    id: '2',
    description: 'The story about JS',
    isbn: 'asdfghghghghg',
    price: 20,
    stockAmount: 5,
    thumbnail: 'Image 1',
    title: 'A live in Spain',
    quantity: 1,
  },
]

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('<ShoppingBag />', () => {
  describe('when no items in the shopping bag', () => {
    it('should display no items message', () => {
      const store = mockStore({ shoppingBag: { show: true } })

      render(
        <Provider store={store}>
          <ShoppingBag />
        </Provider>
      )

      expect(
        screen.getByText('There are no items in your shopping bag.')
      ).toBeInTheDocument()
    })
  })

  describe('when there are items in the shopping bag', () => {
    const store = mockStore({
      shoppingBag: {
        show: true,
        items: mockedShoppingBagItems,
        totalAmount: 30,
      },
    })

    it('should render my bag quantity of items', () => {
      render(
        <Provider store={store}>
          <ShoppingBag />
        </Provider>
      )

      expect(screen.getByText(`My Bag (2)`)).toBeInTheDocument()
    })

    it('should render the titles', () => {
      render(
        <Provider store={store}>
          <ShoppingBag />
        </Provider>
      )

      expect(
        screen.getByText(mockedShoppingBagItems[0].title)
      ).toBeInTheDocument()

      expect(
        screen.getByText(mockedShoppingBagItems[1].title)
      ).toBeInTheDocument()
    })

    it('should render the add and remove buttons', () => {
      render(
        <Provider store={store}>
          <ShoppingBag />
        </Provider>
      )

      const removeBtns = screen.getAllByLabelText('remove')
      const addButtons = screen.getAllByLabelText('add')

      expect(removeBtns[0]).toBeInTheDocument()
      expect(removeBtns[1]).toBeInTheDocument()

      expect(addButtons[0]).toBeInTheDocument()
      expect(addButtons[1]).toBeInTheDocument()
    })

    it('should render the total amount to pay', () => {
      render(
        <Provider store={store}>
          <ShoppingBag />
        </Provider>
      )

      expect(screen.getByText(`Total to pay: £30.00`)).toBeInTheDocument()
    })
  })
})
