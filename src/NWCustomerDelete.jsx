import React, { Component } from 'react';
import './App.css';


class NWCustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asiakasObj: [], CustomerID: '', CompanyName: '', ContactName: '',
            ContactTitle: '', Address: '', PostalCode: '', City: '', Country: '', Phone: '', Fax: ''
        };

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
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }

    dismiss() {
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
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWCustomerDelete: . . . . callBackRoutine >>>---' + this.state.asiakasObj.CustomerID)
    }

    componentDidMount() {
        console.log("NWCustomerDelete-componentDidMount this.props.asiakasObj.customerId: " + this.props.asiakasObj.customerId);
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

    handlePerformDelete(event) {
        event.preventDefault();
        this.NWDeleteRestApista();
    }

    ResetDeleteDone() {
        this.setState({
            CustomerID: '',
        })
        this.handleClickTable();
        this.HaeNWRestApista();
    }

    NWDeleteRestApista() {
        let apiUrl = 'https://localhost:5002/nw/customers/' + this.state.CustomerID;

        //let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/customers/' + this.state.CustomerID;

        console.log("NWDeleteRestApista " + apiUrl);
        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                const success = json;

                //Back-end antaa käyttäjä notifikaation
                alert(success);

                if (success) {

                    this.dismiss();
                    //this.ResetDeleteDone();
                }
            });
    }

    render() {
        return (
            <form className="box4" key={this.state.CustomerID} onSubmit={this.handlePerformDelete}>
                <table id="deletetbl">

                    <tbody >
                        <tr><td className="otsikko">Asiakastunnus:</td><td>{this.state.CustomerID}</td></tr>
                        <tr><td className="otsikko">Firman nimi:</td><td>{this.state.CompanyName}</td></tr>
                        <tr><td className="otsikko">Yhteyshlö:</td><td>{this.state.ContactName} </td></tr>
                        <tr><td className="otsikko">Titteli:</td><td>{this.state.ContactTitle} </td></tr>
                        <tr><td className="otsikko">Osoite:</td><td>{this.state.Address} </td></tr>
                        <tr><td className="otsikko">Posno:</td><td>{this.state.PostalCode} </td></tr>
                        <tr><td className="otsikko">Postmp:</td><td>{this.state.City} </td></tr>
                        <tr><td className="otsikko">Maa:</td><td>{this.state.Country} </td></tr>
                        <tr><td className="otsikko">Puh:</td><td>{this.state.Phone} </td></tr>
                        <tr><td className="otsikko">Fax:</td><td>{this.state.Fax} </td></tr>
                    </tbody>
                </table>
                <br />
                <h5>Seuraavaksi suoritetaan tarkistus tietokannassa.
                Mikäli asiakkaalla on tilauksia, ei poistoa suoriteta. Onnistuneesta poistosta tulee ilmoitus.
                Estetty poisto tulostaa kattavan raportin palvelimelta, josta rivien
                4-6 kohdalla löytyy yleisimmin perussyy.
                </h5>
                <button type="submit">Suorita</button>
            </form>
        );
    }
}
export default NWCustomerDelete;