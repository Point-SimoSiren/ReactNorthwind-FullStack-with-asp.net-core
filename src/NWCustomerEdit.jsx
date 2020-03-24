import React, { Component } from 'react'
import './App.css'

class NWCustomerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { asiakasObj: [], CustomerID: '', CompanyName: '', ContactName: '', ContactTitle: '', Address: '', PostalCode: '', City: '', Country: '', Phone: '', Fax: '' };
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeFax = this.handleChangeFax.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan NWCustomerEDIT -dismiss()-rutiinissa - - - - - - ");
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

    handleChangePostalCode(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, PostalCode: syöte });
    }
    handleChangeCity(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, City: syöte });
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
        alert('Päivitettävä asiakas: ' + this.state.CustomerID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerEDIT: . . . . callBackRoutine >>>---' + this.state.asiakasObj.CustomerID);
    }

    componentDidMount() {
        console.log("NWCustomerEDIT-componentDidMount this.props.asiakasObj.customerId: " + this.props.asiakasObj.customerId);
        this.setState({
            CustomerID: this.props.asiakasObj.customerId,
            CompanyName: this.props.asiakasObj.companyName,
            ContactName: this.props.asiakasObj.contactName,
            ContactTitle: this.props.asiakasObj.contactTitle,
            Address: this.props.asiakasObj.address,
            PostalCode: this.props.asiakasObj.postalCode,
            Phone: this.props.asiakasObj.phone,
            Fax: this.props.asiakasObj.fax
        }
        );
        //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
        if (this.props.asiakasObj.city) { this.setState({ City: this.props.asiakasObj.city }); };
        if (this.props.asiakasObj.country) {
            this.setState({ Country: this.props.asiakasObj.country });
        };
    }

    InsertoiKantaan() {
        // Luodaan asiakasobjekti, johon haetaan state:sta tiedot                     
        const asiakas = {
            CustomerID: this.state.CustomerID,
            CompanyName: this.state.CompanyName,
            ContactName: this.state.ContactName,
            ContactTitle: this.state.ContactTitle,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country,
            Phone: this.state.Phone,
            Fax: this.state.Fax
        };
        // send an asynchronous request to the backend
        const asiakasJson = JSON.stringify(asiakas);
        console.log("asiakasJson = ", asiakasJson);

        //let apiUrl = 'https://localhost:5002/nw/customers/' + this.state.CustomerID;

        let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/customers/' + this.state.CustomerID;

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö asiakkaan päivittämiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                {/* <input type="text" value={this.state.CustomerID} title="Syötä asiakastunnus" placeholder="CustomerID" onChange={this.handleChangeCustomerID} /> */}
                <label>Yritys</label><br />
                <input type="text" value={this.state.CompanyName} placeholder="CompanyName" onChange={this.handleChangeCompanyName} />
                <label>Yhteyshenkilö</label><br />
                <input type="text" value={this.state.ContactName} placeholder="ContactName" onChange={this.handleChangeContactName} /><br />
                <label>Titteli</label><br />
                <input type="text" value={this.state.ContactTitle} placeholder="ContactTitle" onChange={this.handleChangeContactTitle} /><br />
                <label>Osoite</label><br />
                <input type="text" value={this.state.Address} placeholder="Address" onChange={this.handleChangeAddress} /><br />
                <label>Postinro</label><br />
                <input type="text" value={this.state.PostalCode} placeholder="PostalCode" onChange={this.handleChangePostalCode} /><br />
                <label>Kaupunki</label><br />
                <input type="text" value={this.state.City} placeholder="City" onChange={this.handleChangeCity} /><br />
                <label>Maa</label><br />
                <input type="text" value={this.state.Country} placeholder="Country" onChange={this.handleChangeCountry} /><br />
                <label>Puh</label><br />
                <input type="text" value={this.state.Phone} placeholder="Phone" onChange={this.handleChangePhone} /><br />
                <label>Fax</label><br />
                <input type="text" value={this.state.Fax} placeholder="Fax" onChange={this.handleChangeFax} /><br />
                <br />
                <button type="submit">Talleta muutokset</button>
            </form>
        );
    }
}
export default NWCustomerEdit
