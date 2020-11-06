import React, { Component } from 'react'
import md5 from 'md5'
import './App.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeUserName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, UserName: syöte })
    }
    handleChangePassword(event) {
        //var syöte = md5(event.target.value)
        var syöte = (event.target.value)
        this.setState({ ...this.state, Password: syöte })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.LuoObjekti()
    }

    LuoObjekti() {
        const tunnukset = {
            username: this.state.UserName,
            password: this.state.Password
        }

        // send an asynchronous request to the backend
        const tunnuksetJson = JSON.stringify(tunnukset)

        let apiUrl = 'https://localhost:5001/nw/authentication/'

        //let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/logins'

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tunnuksetJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json
                console.log(success.username)
                alert("Tervetuloa " + success.username)
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <input type="text" placeholder="UserName"
                    onChange={this.handleChangeUserName} />

                <input type="password" placeholder="Password" onChange={this.handleChangePassword} />

                <br />
                <button type="submit">Kirjaudu</button>
            </form>
        );
    }
}

export default Login
