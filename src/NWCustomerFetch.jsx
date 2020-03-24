import React, { Component } from 'react';
import Helpit from './Helpit';
import './App.css';
import NWCustomerAdd from './NWCustomerAdd';
import NWCustomerEdit from './NWCustomerEdit';
import NWCustomerDelete from './NWCustomerDelete';

class NWCustomerFetch extends Component {

  constructor(props) {
    super(props);
    console.log("NWCustomerFetch-komponentti: constructor");
    this.state = {
      asiakkaat: [],
      start: 0,
      take: 10,
      visible: "table",
      renderChildAdd: true,
      renderChildEdit: true,
      renderChildDelete: true,
      yksiAsiakas: [],
      poistaAsiakas: [],
      CustomerID: '',
      CustomerID2Del: ''
    };
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }


  handleChildUnmountAdd() {
    console.log("Ollaan NWCustomerFetch -handleChildUnmountAdd-rutiinissa - - - - - - ");
    this.setState({ renderChildAdd: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit() {
    console.log("Ollaan NWCustomerFetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({ renderChildEdit: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountDelete() {
    console.log("Ollaan NWCustomerFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({ renderChildDelete: false });
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({ visible: "table" })
  }

  handleClickAdd = () => {
    this.setState({ visible: "addform", renderChildAdd: true })
  }

  handleClickHelp = () => {
    this.setState({ visible: "help" })
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
      startvalue = startvalue - 10;
    }
    this.setState({ start: startvalue }, this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({ start: this.state.start + 10 }, this.handleSubmit);
  }

  handleSubmit() {
    console.log('HaeNWRestApista: . . . . handleSubmitissa');
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {

    //let uri = `https://localhost:5002/nw/customers/r?offset= ${this.state.start}
    //&limit= ${this.state.take}`

    let uri = `https://aspnet-react-northwind.azurewebsites.net/nw/customers/r?offset= ${this.state.start} &limit= ${this.state.take}`

    console.log("HaeOmaRestistä ", uri);
    fetch(uri)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ asiakkaat: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
      });
  }

  handleClickEdit = (dataObj, event) => {
    this.setState({
      yksiAsiakas: dataObj,
      visible: "editform",
      renderChildEdit: true
    })
  }
  handleClickDelete = (dataObj, event) => {
    this.setState({
      poistaAsiakas: dataObj,
      visible: "deleteform",
      renderChildDelete: true
    })
  }

  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("NWCustomerFetch-komponentti: render");
    let viesti = "NW Customers-rivejä:" + this.state.asiakkaat.length;
    let taulukko = [];
    //Luodaan taulukon otsikot
    let tHeaders = <tr><th>Asiakkaan ID</th><th>Yrityksen nimi</th><th>Yhteyshenkilö</th>
      <th>Kaupunki</th><th>Puhelin</th></tr>

    if (this.state.asiakkaat.length > 0) {
      for (let index = 0; index < this.state.asiakkaat.length; index++) {
        const element = this.state.asiakkaat[index]

        taulukko.push(<tr key={element.customerId}>
          <td>{element.customerId}</td>
          <td>{element.companyName}</td>
          <td>{element.contactName}</td>
          <td>{element.city}</td>
          <td>{element.phone}</td>
          <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
          <td><button onClick={this.handleClickDelete.bind(this, element)}>Poista</button></td>
        </tr>);
      }
    }
    else {
      viesti = "Tuodaan tietoja..."
    }
    //Ehdollinen return
    if (this.state.visible === "table") {
      return (<div className="box1">
        <h1>Asiakashallinta</h1>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickPrev}>Edelliset</button>
        <button onClick={this.handleClickNext}>Seuraavat</button>
        <table className="table table-dark" id="t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
        <p>{viesti}</p>
      </div>
      );
    } else if (this.state.visible === "addform") {
      return (<div className="box1">
        <h1>Uuden asiakkaan lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildAdd ? <NWCustomerAdd unmountMe={this.handleChildUnmountAdd} /> : null}
      </div>
      );

    } else if (this.state.visible === "editform") {
      return (<div className="box1">
        <h1>Asiakastietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit} /> : null}
      </div>
      );

    } else if (this.state.visible === "deleteform") {
      return (<div className="box1">
        <h1>Asiakastietojen poiston vahvistus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <NWCustomerDelete asiakasObj={this.state.poistaAsiakas} unmountMe={this.handleChildUnmountDelete} /> : null}
      </div>
      );

    } else if (this.state.visible === "help") {
      return (<div className="box1">
        <h1>Sovelluksen opasteet</h1>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        <Helpit moduli="NWCustomerFetch" />
      </div>
      );

    } else {
      return (<div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
      </div>
      );
    }

  }
}
export default NWCustomerFetch;
