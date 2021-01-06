import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import BookListContainer from './containers/BookListContainer/BookListContainer'
import BookContainer from './containers/BookContainer/BookContainer'
import ShoppingBag from '../components/ShoppingBag/ShoppingBag'
import Header from '../components/Header/Header'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <ShoppingBag />
        <Switch>
          <Route path='/' component={BookListContainer} exact />
          <Route path='/book/:id' component={BookContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
