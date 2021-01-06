import {
  calculateTotalAmount,
  getItemIndex,
  getItemById,
  existsInShoppingBag,
} from '../shopping-bag'

const mockedItems = [
  {
    author: { firstName: 'Jose', lastName: 'Bolufer' },
    id: '1',
    desription: 'The story about a boy that grew up in London',
    isbn: 'asdfghghghghg',
    price: 10,
    stockAmount: 1,
    thumbnail: 'Image 1',
    title: 'A live in London',
    quantity: 10,
  },
]

describe('calculateTotalAmount', () => {
  it('should return the total amount of basket', () => {
    expect(calculateTotalAmount(mockedItems)).toBe(100)
  })

  it('should return 0 when no items in basket', () => {
    expect(calculateTotalAmount([])).toBe(0)
  })
})

describe('getItemIndex', () => {
  it('should return the positon of the item in the array', () => {
    expect(getItemIndex(mockedItems, '1')).toBe(0)
  })
})

describe('getItemById', () => {
  it('should return the item by id', () => {
    expect(getItemById(mockedItems, '1')).toBe(mockedItems[0])
  })
})

describe('existsInShoppingBag', () => {
  it('should return true if item exists in shopping bag', () => {
    expect(existsInShoppingBag(mockedItems, '1')).toBe(true)
  })
})
