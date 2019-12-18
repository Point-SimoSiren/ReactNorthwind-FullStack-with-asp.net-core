import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AnalogWatch from './AnalogWatch'
import NWCustomerFetch from './NWCustomerFetch'
import NWProductsFetch from './NWProductsFetch'
import UserFetch from './UserFetch'

class Navigaatio extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>Northwind React Application</h2>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <ul className='navbar-nav mr-auto'>
              <li><Link to={'/'} className='nav-link'> Home </Link></li>
              <li><Link to={'/NWCustomerFetch'} className='nav-link'>Customers</Link></li>
              <li><Link to={'/NWProductsFetch'} className='nav-link'>Products</Link></li>
              <li><Link to={'/UserFetch'} className='nav-link'>Users</Link></li>

            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' component={AnalogWatch} />
            <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
            <Route path='/NWProductsFetch' component={NWProductsFetch} />
            <Route path='/UserFetch' component={UserFetch} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default Navigaatio
