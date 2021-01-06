import {
  getTotalAmount,
  getShoppingBagItems,
  getShow,
  getShoppingBagTotalNumberOfItems,
} from '../shoppingBag'

describe('shoppingBagSelectors', () => {
  describe('getTotalAmount', () => {
    it('should return the total amount when there is a value', () => {
      expect(
        getTotalAmount({
          shoppingBag: {
            totalAmount: 20,
          },
        })
      ).toBe(20)
    })

    it('should return 0 when there is no value', () => {
      expect(getTotalAmount({ shoppingBag: {} })).toBe(0)
    })
  })

  describe('getShoppingBagItems', () => {
    it('should return an array of items in the shopping bag if there are any', () => {
      expect(
        getShoppingBagItems({
          shoppingBag: {
            items: [
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
            ],
          },
        })
      ).toEqual([
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
      ])
    })

    it('should return an empty array when there are no items', () => {
      expect(getShoppingBagItems({ shoppingBag: {} })).toEqual([])
    })
  })

  describe('getShow', () => {
    it('should return the visibility status if it has a value', () => {
      expect(
        getShow({
          shoppingBag: {
            show: true,
          },
        })
      ).toBe(true)
    })

    it('should return false when there is no visibility status', () => {
      expect(getShow({ shoppingBag: {} })).toBe(false)
    })
  })

  describe('getShoppingBagTotalNumberOfItems', () => {
    it('should return the total number of items in the shopping bag', () => {
      expect(
        getShoppingBagTotalNumberOfItems({
          shoppingBag: {
            items: [
              {
                author: { firstName: 'Jose', lastName: 'Bolufer' },
                id: '1',
                description: 'The story about a boy that grew up in London',
                isbn: 'asdfghghghghg',
                price: 10,
                stockAmount: 1,
                thumbnail: 'Image 1',
                title: 'A live in London',
                quantity: 10,
              },
              {
                author: { firstName: 'Jose', lastName: 'Bolufer' },
                id: '2',
                description: 'The story about a boy that grew up in Spain',
                isbn: 'abc',
                price: 10,
                stockAmount: 1,
                thumbnail: 'Image 1',
                title: 'A live in London',
                quantity: 30,
              },
            ],
          },
        })
      ).toEqual(40)
    })

    it('should return 0 if there are no items in the shopping bag', () => {
      expect(
        getShoppingBagTotalNumberOfItems({
          shoppingBag: {
            items: [],
          },
        })
      ).toEqual(0)
    })
  })
})
