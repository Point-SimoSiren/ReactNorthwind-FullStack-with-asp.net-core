import React, { Component } from 'react'
import md5 from 'md5'
import './App.css'

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: '', LastName: '', Email: '', UserName: '',
            Password: '', PasswordAgain: '', Match: ''
        }
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangePasswordAgain = this.handleChangePasswordAgain.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    dismiss() {
        this.props.unmountMe()
    }

    handleChangeFirstName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, FirstName: syöte })
    }
    handleChangeLastName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, LastName: syöte })
    }
    handleChangeEmail(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, Email: syöte })
    }
    handleChangeUserName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, UserName: syöte })
    }
    handleChangePassword(event) {
        var syöte = md5(event.target.value)
        this.setState({ ...this.state, Password: syöte })
    }
    handleChangePasswordAgain(event) {
        var syöte = md5(event.target.value)
        this.setState({ ...this.state, PasswordAgain: syöte })

        if (this.state.Password !== syöte) {
            this.setState({ Match: 'Salasanat eivät täsmää.' })
        }
        else {
            this.setState({ Match: 'No nyt täsmää!' })
        }
    }


    handleSubmit(event) {
        event.preventDefault()
        if (this.state.Password === this.state.PasswordAgain) {
            alert('Lähetettiin uusi käyttäjä: ' + this.state.FirstName + ' ' + this.state.LastName)
            this.InsertoiKantaan()
        }
        else {
            alert('Salasanakentät eivät täsmää. Yritä uudelleen.')
        }
    }
    InsertoiKantaan() {
        const newUser = {
            firstname: this.state.FirstName,
            lastname: this.state.LastName,
            email: this.state.Email,
            username: this.state.UserName,
            password: this.state.Password,
            accesslevelId: 2
        }

        // send an asynchronous request to the backend
        const userJson = JSON.stringify(newUser)

        const apiUrl = 'https://localhost:5002/api/logins'
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: userJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json
                console.log(`Response from server: ${success}.`)
                if (success) {
                    this.dismiss()
                }
            })
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>

                <input type="text" placeholder="FistName"
                    onChange={this.handleChangeFirstName} />

                <input type="text" placeholder="LastName"
                    onChange={this.handleChangeLastName} />

                <input type="text" placeholder="Email" onChange={this.handleChangeEmail} />

                <input type="text" placeholder="UserName"
                    onChange={this.handleChangeUserName} />

                <input type="password" placeholder="Password" onChange={this.handleChangePassword} />
                <input type="password" placeholder="Password again" onChange={this.handleChangePasswordAgain} />
                <p><strong>{this.state.Match}</strong></p>
                <br />
                <button type="submit">Tallenna uudet tiedot</button>
            </form>
        );
    }
}
export default UserAdd
