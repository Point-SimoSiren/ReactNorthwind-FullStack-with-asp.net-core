import React, { Component } from 'react';
import './App.css';
import Clock from 'react-clock';

class AnalogWatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pvm: new Date(),
            showLoginForm: 'true'
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
            pvm: new Date()
        });
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);

    }
    render() {
        return (
            <div className="analogikello">

                <Clock value={this.state.pvm} size={400} hourMarksLength={20} />

            </div>
        );
    }
}

export default AnalogWatch;
