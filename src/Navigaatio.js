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
          <h2 style={{ marginLeft: '2%' }}>Northwind React Application</h2>

          <a style={{ marginLeft: '36%' }} href="https://www.animatedimages.org/cat-santa-claus-359.htm"><img src="https://www.animatedimages.org/data/media/359/animated-santa-claus-image-0046.gif" border="0" alt="animated-santa-claus-image-0046" /></a>

          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <ul className='navbar-nav mr-auto'>
              <li style={{ marginLeft: '10%' }}><Link to={'/'} className='nav-link'> Etusivu </Link></li>
              <li><Link to={'/NWCustomerFetch'} className='nav-link'>Asiakashallinta</Link></li>
              <li><Link to={'/NWProductsFetch'} className='nav-link'>Tuotehallinta</Link></li>
              <li><Link to={'/UserFetch'} className='nav-link'>Käyttäjähallinta</Link></li>

              <li style={{ marginLeft: '10%' }}><a target="_blank" href='https://simon-saapalvelu.herokuapp.com' className='nav-link' title="Tämä on vain lisämausteena. Avautuu uuteen selainikkunaan.">Pohjoistuulta?</a></li>

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
