import React, { Component } from 'react'
import './App.css'

class NWProductsDelete extends Component {
    constructor(props) {
        super(props)
        this.handlePerformDelete = this.handlePerformDelete.bind(this)
    }

    dismiss() {
        console.log("Ollaan products Delete -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe()
    }

    handleSubmit(event) {
        alert('Poistettava tuote: ' + this.props.tuoteObj.productId)
        event.preventDefault()
        this.InsertoiKantaan()
    }
    callBackRoutine() {
        console.log('Logins callback ', this.props.tuoteObj.productId);
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

        //const apiUrl = 'https://localhost:5002/nw/products/' + this.props.tuoteObj.productId

        let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/products/' + this.props.tuoteObj.productId;

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

            <form className='box4' key={this.props.tuoteObj.productId}
                onSubmit={this.handlePerformDelete}>
                <table id='deletetbl'>
                    <tbody>
                        <tr><th className='otsikko'>ID</th>
                            <td>{this.props.tuoteObj.productId}</td></tr>
                        <tr><th className='otsikko'>Tuotenimi:</th>
                            <td>{this.props.tuoteObj.productName}</td></tr>
                        <tr><td className='otsikko'>Toimittajakoodi:</td>
                            <td>{this.props.tuoteObj.supplierId} </td></tr>
                        <tr><td className='otsikko'>Varastosaldo:</td>
                            <td>{this.props.tuoteObj.unitsInStock} </td></tr>
                    </tbody>
                </table>
                <br />
                <button type='submit'>Vahvista poisto</button>
            </form>
        )
    }
}
export default NWProductsDelete