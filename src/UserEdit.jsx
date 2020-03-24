import React, { Component } from 'react'
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


    handleSubmit(event) {
        event.preventDefault()
        this.InsertoiKantaan()
    }

    callBackRoutine() {
        console.log('UserEDIT: . . . . callBackRoutine >>>---', this.state.userObject.LogindId)
    }

    componentDidMount() {

        this.setState({
            LoginID: parseInt(this.props.userObj.loginId),
            FirstName: this.props.userObj.firstname,
            LastName: this.props.userObj.lastname,
            Email: this.props.userObj.email,
            UserName: this.props.userObj.username,
            AccesslevelID: parseInt(this.props.userObj.accesslevelId)
        })

    }

    InsertoiKantaan() {
        const updatedUser = {
            LoginId: this.props.userObj.loginId,
            Firstname: this.state.FirstName,
            Lastname: this.state.LastName,
            Email: this.state.Email,
            Username: this.state.UserName,
            Password: this.state.UserName,
            AccesslevelId: parseInt(this.state.AccesslevelID)
        }

        const userJson = JSON.stringify(updatedUser)
        console.log("userJson = ", userJson)

        let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/logins' + this.props.userObj.loginId

        //const apiUrl = 'https://localhost:5002/nw/logins/' + this.props.userObj.loginId

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
                alert(success);
                if (success) {
                    console.log("Pyyntö asiakkaan päivittämiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }


    render() {

        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <label>Etunimi</label><br />
                <input type="text" value={this.state.FirstName} placeholder="Etunimi" onChange={this.handleChangeFirstName} />

                <label>Sukunimi</label>
                <input type="text" value={this.state.LastName} placeholder="Sukunimi" onChange={this.handleChangeLastName} />

                <label>Sähköposti</label>
                <input type="text" value={this.state.Email} placeholder="Email" onChange={this.handleChangeEmail} />

                <label>Käyttäjätunnus</label>
                <input type="text" value={this.state.UserName} placeholder="Käyttäjätunnus" onChange={this.handleChangeUserName} />

                <label>Käyttäjätaso</label>
                <input type="text" value={this.state.AccesslevelID} placeholder="Käyttäjätaso" onChange={this.handleChangeAccesslevelID} />
                <br /><br />
                <button type="submit">Talleta muutokset</button>
                <p>Salasanaa ei voi muokata tässä näkymässä.</p>
            </form>
        )
    }
}
export default UserEdit
