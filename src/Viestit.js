import React, {Component} from 'react';
import './App.css';
import DigitalWatch from './DigitalWatch';

class Viesti extends Component {
    render() {
        return(
            <p>
                Tässä on oma vakioviesti
            </p>            
        );
    }
}

class ViestiPrp extends Component {
    render() {
        console.log(this.props.autonMalli);
        return(
            <>
                <p>{this.props.kukkaruukku}</p>
                <p>{this.props.viesti}</p>            
            </>
        );
        
    }
}

class Viestit extends Component {
  render() {
    return (<div>
        <div className="Viestit">
            <header className="Viestit-header">
                <h3>Viestit-sovellusikkuna</h3>
            </header>
        </div>
        <div>
            <p>Tässä alapuolella luetellaan viestejä</p>
            <Viesti />
            <ViestiPrp viesti="Viesti nro 1" kukkaruukku="Belargonia" autonMalli="V90"/>
            <DigitalWatch />
        </div>     
    </div>
    );
  }
}

export default Viestit;
