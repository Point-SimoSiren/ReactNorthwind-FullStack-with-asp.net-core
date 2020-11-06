import React, { Component } from 'react';

import './App.css';

class NWCustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { CustomerID: '', CompanyName: '', ContactName: '', ContactTitle: '', Address: '', PostalCode: '', Country: '', City: '', Phone: '', Fax: '' };
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeFax = this.handleChangeFax.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWCustomerAdd -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    handleChangeCustomerID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, CustomerID: syöte.toUpperCase() });
    }
    handleChangeCompanyName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, CompanyName: syöte });
    }
    handleChangeContactName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ContactName: syöte });
    }
    handleChangeContactTitle(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ContactTitle: syöte });
    }
    handleChangeAddress(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Address: syöte });
    }
    handleChangeCity(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, City: syöte });
    }
    handleChangePostalCode(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, PostalCode: syöte });
    }
    handleChangeCountry(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Country: syöte });
    }
    handleChangePhone(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Phone: syöte });
    }
    handleChangeFax(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Fax: syöte });
    }

    handleSubmit(event) {
        alert('Lähetettiin asiakas: ' + this.state.CustomerID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan() {
        // Luodaan asiakasobjekti, johon haetaan state:sta tiedot                     
        const asiakas = {
            CustomerID: this.state.CustomerID,
            CompanyName: this.state.CompanyName,
            ContactName: this.state.ContactName,
            ContactTitle: this.state.ContactTitle,
            Address: this.state.Address,
            City: this.state.City,
            PostalCode: this.state.PostalCode,
            Country: this.state.Country,
            Phone: this.state.Phone,
            Fax: this.state.Fax
        };

        // send an asynchronous request to the backend
        const asiakasJson = JSON.stringify(asiakas);
        console.log("asiakasJson = " + asiakasJson);

        let apiUrl = 'https://localhost:5001/nw/customers'

        //let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/customers/'

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJson
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö asiakkaan tallettamiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" title="Syötä asiakastunnus 5x ISO KIRJAIN" placeholder="ID = 5x ISO kirjain" onChange={this.handleChangeCustomerID} />
                <input type="text" placeholder="Firma" onChange={this.handleChangeCompanyName} />
                <input type="text" placeholder="Yhteyshlö" onChange={this.handleChangeContactName} />
                <input type="text" placeholder="hlö titteli" onChange={this.handleChangeContactTitle} />
                <input type="text" placeholder="Osoite" onChange={this.handleChangeAddress} />
                <input type="text" placeholder="Postinumero" onChange={this.handleChangeAddress} />
                <input type="text" placeholder="Kaupunki" onChange={this.handleChangeAddress} />
                <input type="text" placeholder="Maa" onChange={this.handleChangeAddress} />
                <input type="text" placeholder="Puh nro" onChange={this.handleChangePhone} />
                <input type="text" placeholder="Fax nro" onChange={this.handleChangeFax} />
                <br />
                <button type="submit">Tallenna uudet tiedot</button>
            </form>
        );
    }

}
export default NWCustomerAdd;
