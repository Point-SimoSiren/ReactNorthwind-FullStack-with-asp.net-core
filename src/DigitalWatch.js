import React, {Component} from 'react';
import './App.css';
import Clock from 'react-clock';

class Kello extends Component {
    render() {
      return (
        <h4>Kello on nyt: {this.props.kellonaika}</h4>
      );
    }
  }
  

class DigitalWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className="digitaalikello">
                {/* <p>Kellonaika: {this.state.time} </p> */}
                {/* <p>Päivämäärä: {this.state.date} </p> */}
                <Kello kellonaika={this.state.time} />
                <Clock value={this.state.pvm} />
            </div>
    );
  }
}

export default DigitalWatch;
