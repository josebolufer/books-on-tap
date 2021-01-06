import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({ shoppingBag: { show: false } })

describe('<App />', () => {
  it('renders the App', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const logo = screen.getByAltText(/Books on tap/i)
    expect(logo).toBeInTheDocument()
  })
})
