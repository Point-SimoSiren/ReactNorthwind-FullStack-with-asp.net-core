import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AnalogWatch from './AnalogWatch';
import Md5Salaus from './Md5Salaus';
import NWCustomerFetch from './NWCustomerFetch';
import TypicodeFetch from './TypicodeFetch';
import Viestit from './Viestit';

class Navigaatio extends Component {
  render() {
    return (
        <Router>
            <div>
              <h2>Northwind React Application 2019</h2>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/NWCustomerFetch'} className="nav-link">NWCustomerFetch</Link></li>
                <li><Link to={'/TypicodeFetch'} className="nav-link">TypicodeFetch</Link></li>
                <li><Link to={'/Viestit'} className="nav-link">Viestit</Link></li>
                <li><Link to={'/Md5Salaus'} className="nav-link">Md5Salaus</Link></li>
              </ul>
              </nav>
              <hr />
              <Switch>
                  <Route exact path='/' component={AnalogWatch} />
                  <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
                  <Route path='/TypicodeFetch' component={TypicodeFetch} />
                  <Route path='/Viestit' component={Viestit} />
                  <Route path='/Md5Salaus' component={Md5Salaus} />
              </Switch>
            </div>
          </Router>
        );
  }
}

export default Navigaatio;
