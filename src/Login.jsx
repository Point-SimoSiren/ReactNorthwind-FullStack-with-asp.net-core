import React, { Component } from 'react'
//import md5 from 'md5'
import './App.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            ShowLoginForm: true,
            LoggedInUser: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const userFromLS = localStorage.getItem('user')
        if (userFromLS) {
            this.setState({ ...this.state, ShowLoginForm: false, LoggedInUser: userFromLS })
        }
    }

    logout() {
        localStorage.clear()
        this.setState({ ...this.state, LoggedInUser: '', ShowLoginForm: true })
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
                if (success.username === undefined) {
                    alert("Kirjautuminen epäonnistui")
                }
                else {
                    localStorage.setItem('user', success.username)
                    localStorage.setItem('token', success.token)
                    this.setState({ ...this.state, LoggedInUser: success.username, ShowLoginForm: false })
                }
            })
    }

    render() {
        if (this.state.ShowLoginForm === true) {
            return (
                <form onSubmit={this.handleSubmit}>

                    <input type="text" placeholder="UserName"
                        onChange={this.handleChangeUserName} />

                    <input type="password" placeholder="Password" onChange={this.handleChangePassword} />

                    <br />
                    <button type="submit">Kirjaudu</button>
                </form>
            )
        }
        else {
            return (
                <>
                    <h3>Kirjautunut käyttäjä {this.state.LoggedInUser}</h3>
                    <button onClick={() => this.logout()}>Kirjaudu ulos</button>
                </>
            )
        }
    }
}

export default Login
