import React, { Component } from 'react';
import './App.css';
import Clock from 'react-clock';


class AnalogWatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        console.log("AnalogWatch: tickissä");
        this.setState({
            pvm: new Date()
        });
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);

    }
    render() {

        return (
            <div className="analogikello">
                <Clock value={this.state.pvm} size={500} hourMarksLength={20} />
            </div>
        );
    }
}

export default AnalogWatch;
