import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as shoppingBagActions from '../shoppingBagActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockedShoppingBagItem = {
  author: { firstName: 'Jose', lastName: 'Bolufer' },
  id: '1',
  description: 'The story about a boy that grew up in London',
  isbn: 'asdfghghghghg',
  price: 10,
  stockAmount: 5,
  thumbnail: 'Image 1',
  title: 'A live in London',
  quantity: 1,
}

describe('shoppingBagActions', () => {
  describe('showShoppingBag', () => {
    it('should create an action to toggle the shopping bag', () => {
      const expectedAction = {
        type: 'SHOW_SHOPPING_BAG',
        payload: true,
      }

      expect(shoppingBagActions.showShoppingBag(true)).toEqual(expectedAction)
    })
  })

  describe('addItemToShoppingBag', () => {
    it('should create an action to add an item to the shopping bag', () => {
      const expectedAction = {
        type: 'ADD_ITEM_TO_SHOPPING_BAG',
        payload: mockedShoppingBagItem,
      }

      expect(
        shoppingBagActions.addItemToShoppingBag(mockedShoppingBagItem)
      ).toEqual(expectedAction)
    })
  })

  describe('increaseQuantity', () => {
    it('should create an action to increase the quantity of an item in the shopping bag', () => {
      const expectedAction = {
        type: 'INCREASE_QUANTITY',
        payload: 0,
      }

      expect(shoppingBagActions.increaseQuantity(0)).toEqual(expectedAction)
    })
  })

  describe('updateTotalAmount', () => {
    it('should create an action to update the total price of the shopping bag', () => {
      const expectedAction = {
        type: 'UPDATE_TOTAL_AMOUNT',
        payload: 22,
      }

      expect(shoppingBagActions.updateTotalAmount(22)).toEqual(expectedAction)
    })
  })

  describe('addToShoppingBag', () => {
    describe('when item already exists in shopping bag', () => {
      it('should create an thunk action to push an item to the shopping bag', () => {
        const expectedActions = [
          {
            type: 'INCREASE_QUANTITY',
            payload: 0,
          },
          {
            type: 'UPDATE_TOTAL_AMOUNT',
            payload: 10,
          },
          {
            type: 'SHOW_SHOPPING_BAG',
            payload: true,
          },
        ]

        const store = mockStore({
          shoppingBag: {
            items: [mockedShoppingBagItem],
            totalAmount: 10,
          },
        })

        store.dispatch(
          shoppingBagActions.addToShoppingBag(mockedShoppingBagItem)
        )
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('when item does not exist in shopping bag', () => {
      it('should create a thunk action to push an item to the shopping bag', () => {
        const expectedActions = [
          {
            type: 'ADD_ITEM_TO_SHOPPING_BAG',
            payload: mockedShoppingBagItem,
          },
          {
            type: 'UPDATE_TOTAL_AMOUNT',
            payload: 0,
          },
          {
            type: 'SHOW_SHOPPING_BAG',
            payload: true,
          },
        ]

        const store = mockStore({
          shoppingBag: {
            items: [],
            totalAmount: 0,
          },
        })

        store.dispatch(
          shoppingBagActions.addToShoppingBag(mockedShoppingBagItem)
        )
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('when adding more items that there are left in stock', () => {
      it('should create an thunk action and not to push the item to the shopping bag', () => {
        const expectedActions = [
          {
            type: 'UPDATE_TOTAL_AMOUNT',
            payload: 50,
          },
          {
            type: 'SHOW_SHOPPING_BAG',
            payload: true,
          },
        ]

        const store = mockStore({
          shoppingBag: {
            items: [
              {
                ...mockedShoppingBagItem,
                quantity: 5,
              },
            ],
            totalAmount: 10,
          },
        })

        store.dispatch(
          shoppingBagActions.addToShoppingBag({
            ...mockedShoppingBagItem,
            quantity: 5,
          })
        )
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('removeFromShoppingBag', () => {
    describe('when item quantity is > 1', () => {
      it('should create an thunk action to push an item to the shopping bag', () => {
        const expectedActions = [
          {
            type: 'DECREASE_QUANTITY',
            payload: 0,
          },
          {
            type: 'UPDATE_TOTAL_AMOUNT',
            payload: 50,
          },
        ]

        const store = mockStore({
          shoppingBag: {
            items: [
              {
                ...mockedShoppingBagItem,
                quantity: 5,
              },
            ],

            totalAmount: 50,
          },
        })

        store.dispatch(
          shoppingBagActions.removeFromShoppingBag(mockedShoppingBagItem)
        )
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
