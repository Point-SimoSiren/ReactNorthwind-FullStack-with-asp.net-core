/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Viestit from './Viestit';
import AnalogWatch from './AnalogWatch';
import TypicodeFetch from './TypicodeFetch';
import NWCustomerFetch from './NWCustomerFetch';

///////////////////
// App           //
///////////////////
class App extends React.Component {
    render() {
      return (
        <MenuContainer/>
      )
    }
  }
  
  ///////////////////
  // MenuContainer //
  ///////////////////
  class MenuContainer extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        activeItem: '',
        activeItemPosition: 0,
        activeItemColor: '',
        menuItems: [
          { text: 'Home' },
          { text: 'Gallery' },
          { text: 'About' },
          { text: 'Blog' },
          { text: 'Contact' },
        ],
      }
      
      this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(activeItem) {
      return e => {
        e.preventDefault()
      
        this.setState({
          activeItem,
          activeItemPosition: document.getElementById(activeItem).offsetTop,
          activeItemColor: window.getComputedStyle(document.getElementById(activeItem)).getPropertyValue('background-color'),
        })
      }
    }
    
    render() {
      const menuItems = this.state.menuItems.map(item => <MenuItem item={ item } handleClick={ this.handleClick }/>)
      return (
        <div className='menu-container'>
          <span className='menu-item--active' style={{ top: this.state.activeItemPosition, backgroundColor: this.state.activeItemColor }}/>
          { menuItems }
        </div>
      )
    }
  }
  
  ///////////////////
  // MenuItem      //
  ///////////////////
  function MenuItem(props) {
    return (
      <div 
        className='menu-item'
        id={ props.item.text }
        onClick={ props.handleClick(props.item.text) }
      >
        { props.item.text.toUpperCase() }
      </div>
    )
  }
  
  
  
  
  ReactDOM.render(<App/>, document.getElementById('root'))
serviceWorker.unregister();
 */