import React, { Component } from 'react'
import md5 from 'md5'
import './App.css'

class UserEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserObj: [], LoginID: '',
            FirstName: '', LastName: '', Email: '', UserName: '',
            Password: '', PasswordAgain: '', Match: '', AccesslevelID: ''
        }
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangePasswordAgain = this.handleChangePasswordAgain.bind(this)
        this.handleChangeAccesslevelID = this.handleChangeAccesslevelID.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    dismiss() {
        console.log("Ollaan UserEDIT -dismiss()-rutiinissa - - - - - - ")
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
    handleChangeAccesslevelID(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, AccesslevelID: syöte })
    }
    handleChangePassword(event) {
        var syöte = md5(event.target.value)
        this.setState({ ...this.state, Password: syöte })
    }
    //__________Salasanan tuplatarkistus_______________

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
    //_________________Salananan samuuden tarkistus myös lomakkeen lähetyksessä________

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

    callBackRoutine() {
        console.log('UserEDIT: . . . . callBackRoutine >>>---', this.state.userObject.LogindId)
    }

    componentDidMount() {

        this.setState({
            LoginID: this.props.userObject.LoginId,
            FirstName: this.props.userObject.Firstname,
            LastName: this.props.userObject.Lastname,
            Email: this.props.userObject.Email,
            UserName: this.props.userObject.Username,
            //Password: this.props.userObject.Password,
            //PasswordAgain: this.props.userObject.Password,
            AccesslevelID: this.props.userObject.AccesslevelId
        })
    }

    InsertoiKantaan() {
        const updatedUser = {
            LogindId: this.state.LogindID,
            Firstname: this.state.FirstName,
            Lastname: this.state.LastName,
            Email: this.state.Email,
            Username: this.state.UserName,
            Password: this.state.Password,
            AccesslevelID: parseInt(this.state.accesslevelID)
        }

        const userJson = JSON.stringify(updatedUser)
        console.log("userJson = ", userJson)

        const apiUrl = 'https://localhost:5002/api/logins/' + this.state.LoginID
        fetch(apiUrl, {
            method: "PUT",
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

                <input type="text" value={this.state.FirstName} placeholder="FirstName" onChange={this.handleChangeFirstName} />

                <input type="text" value={this.state.LastName} placeholder="LastName" onChange={this.handleChangeLastName} />

                <input type="text" value={this.state.Email} placeholder="Email" onChange={this.handleChangeEmail} />

                <input type="text" value={this.state.UserName} placeholder="UserName" onChange={this.handleChangeUserName} />

                <input type="text" value={this.state.Password} placeholder="Password" onChange={this.handleChangePassword} />

                <input type="text" value={this.state.PasswordAgain} placeholder="Password again" onChange={this.handleChangePasswordAgain} />

                <input type="text" value={this.state.AccesslevelID} placeholder="AccesslevelID" onChange={this.handleChangeAccesslevelID} />
                <br />
                <button type="submit">Talleta muutokset</button>
            </form>
        )
    }
}
export default UserEdit
