import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

import ShoppingBag from '../../ShoppingBag/ShoppingBag'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initialState = { shoppingBag: { show: false } }

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

describe('<Header />', () => {
  describe('@renders', () => {
    it('should render the books on tap logo', () => {
      const store = mockStore(initialState)

      render(
        <Provider store={store}>
          <Header />
        </Provider>,
        {
          wrapper: MemoryRouter,
        }
      )

      expect(screen.getByAltText('Books on tap')).toBeInTheDocument()
    })

    it('should render the shopping bag icon', () => {
      const store = mockStore(initialState)

      render(
        <Provider store={store}>
          <Header />
        </Provider>,
        {
          wrapper: MemoryRouter,
        }
      )

      expect(screen.getByLabelText('cart')).toBeInTheDocument()
    })

    it('should render 0 on the badge', () => {
      const store = mockStore(initialState)

      render(
        <Provider store={store}>
          <Header />
        </Provider>,
        {
          wrapper: MemoryRouter,
        }
      )

      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('should render 2 on the badge when there are 2 items in the shopping bag', () => {
      const store = mockStore({
        shoppingBag: {
          ...initialState.shoppingBag,
          items: mockedShoppingBagItems,
        },
      })

      render(
        <Provider store={store}>
          <Header />
          <ShoppingBag />
        </Provider>,
        {
          wrapper: MemoryRouter,
        }
      )

      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })
})
