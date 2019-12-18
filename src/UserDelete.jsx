import React, { Component } from 'react'
import './App.css'

class UserDelete extends Component {
    constructor(props) {
        super(props)
        this.handlePerformDelete = this.handlePerformDelete.bind(this)
    }

    dismiss() {
        console.log("Ollaan Logins Delete -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe()
    }

    handleSubmit(event) {
        alert('Poistettava käyttäjä: ' + this.props.userObj.loginId)
        event.preventDefault()
        this.InsertoiKantaan()
    }
    callBackRoutine() {
        console.log('Logins callback ', this.props.userObj.loginId);
    }

    handlePerformDelete(event) {
        event.preventDefault()
        this.NWDeleteRestApista()
    }

    ResetDeleteDone() {
        this.handleClickTable()
        this.HaeNWRestApista()
    }

    NWDeleteRestApista() {

        const apiUrl = 'https://localhost:5002/nw/logins/' + this.props.userObj.loginId
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                const success = json
                console.log('Response from server: ', success);
                if (success) {
                    this.dismiss()
                }
            })
    }
    render() {
        return (
            <form className='box4' key={this.props.userObj.loginId}
                onSubmit={this.handlePerformDelete}>
                <table id='deletetbl'>
                    <tbody>
                        <tr><th className='otsikko'>ID</th>
                            <td>{this.props.userObj.loginId}</td></tr>
                        <tr><th className='otsikko'>Etunimi:</th>
                            <td>{this.props.userObj.firstname}</td></tr>
                        <tr><td className='otsikko'>Sukunimi:</td>
                            <td>{this.props.userObj.lastname} </td></tr>
                        <tr><td className='otsikko'>Sähköposti:</td>
                            <td>{this.props.userObj.email} </td></tr>
                        <tr><td className='otsikko'>Käyttäjätunnus:</td>
                            <td>{this.props.userObj.username} </td></tr>
                        <tr><td className='otsikko'>Accesslevel ID:</td><td>{this.props.userObj.accesslevelId} </td></tr>
                    </tbody>
                </table>
                <br />
                <button type='submit'>Vahvista poisto</button>
            </form>
        )
    }
}
export default UserDelete