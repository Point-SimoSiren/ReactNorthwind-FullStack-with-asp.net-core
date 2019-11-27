import React, { Component } from 'react';
import Helpit from './Helpit';
import './App.css';
import NWCustomerAdd from './NWCustomerAdd';
import NWCustomerEdit from './NWCustomerEdit';

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
        yksiAsiakas: [], 
        CustomerID: '',
        CustomerID2Del: ''  
    }; 
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handlePerformDelete = this.handlePerformDelete.bind(this);
  }

  handleChildUnmountAdd(){
    console.log("Ollaan NWCustomerFetch -handleChildUnmountAdd-rutiinissa - - - - - - ");
    this.setState({renderChildAdd: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit(){
    console.log("Ollaan NWCustomerFetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({renderChildEdit: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"})
  }

  handleClickAdd = () => {
    this.setState({visible: "addform", renderChildAdd: true})
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
  }

  handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
        startvalue = startvalue-10;
    }
    this.setState({start: startvalue},this.handleSubmit);
  }

  handleClickNext = () => {
    this.setState({start: this.state.start+10},this.handleSubmit);
  }

  handleSubmit() {
    console.log('HaeNWRestApista: . . . . handleSubmitissa');
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    let uri = 'https://localhost:5001/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
    console.log("HaeOmaRestistä " + uri);
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        this.setState({ asiakkaat: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
    });
  }

  handleClickEdit = (dataObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickEdit -- -- -- dataObj-tulostus>>>>", dataObj);
    //alert(event.type); //voidaan tutkia millainen React-eventti oli kyseessä (esim: "click")
    this.setState({
      yksiAsiakas: dataObj, 
      visible: "editform", 
      renderChildEdit: true
    })
  }
  handleClickDelete = (poistettava, event) => {
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan asiakkaan>>>>", poistettava);
    alert("Poistan asiakkaan: ", poistettava);
    this.setState({
      CustomerID2Del: poistettava, 
      visible: "deleteform", 
    })
  }
  handlePerformDelete() {
    console.log('NWDeleteRestApista: . . . . delete:ssä', this.state.CustomerID2Del);
    this.NWDeleteRestApista();
  }

  ResetDeleteDone() {
    console.log('ResetDeleteDone ???????????????');
    this.setState({
       CustomerID2Del: '', 
    })
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  NWDeleteRestApista() {
    let apiUrl = 'https://localhost:5001/nw/customer/'+this.state.CustomerID2Del;
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
            console.log(`Response from server: ${success}.`);
            if (success) {
               console.log("Pyyntö asiakkaan poistamiseksi tehty -- -- -- -- --");
               this.ResetDeleteDone();
            }
        });
  }

  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("NWCustomerFetch-komponentti: render");
    let viesti = "NW Customers-rivejä:" + this.state.asiakkaat.length;
    let taulukko = [];
    //Luodaan taulukon otsikot
    let tHeaders=<tr><th>Asiakkaan ID</th><th>Yrityksen nimi</th><th>Yhteyshenkilö</th><th>Toiminnot</th></tr>;
    if (this.state.asiakkaat.length > 0) {
        for (let index = 0; index < this.state.asiakkaat.length; index++) {
            const element = this.state.asiakkaat[index];
            taulukko.push(<tr key={element.customerId}>
            <td>{element.customerId}</td>
            <td>{element.companyName}</td>
            <td>{element.contactName}</td>
            <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element.customerId)}>Poista</button></td>
            </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    //Ehdollinen return
    if (this.state.visible==="table") {
      return (<div className="box1">
        <h1>Tietokantahaku</h1>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickPrev}>Edelliset</button>
        <button onClick={this.handleClickNext}>Seuraavat</button>
        <table className="table table-dark" id = "t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
        <p>{viesti}</p>
      </div>
    );
    } else if (this.state.visible==="addform") {
      return (<div className="box1">
        <h1>Uuden asiakkaan lisäys</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildAdd ? <NWCustomerAdd unmountMe={this.handleChildUnmountAdd} /> : null }
      </div>
      );

    } else if (this.state.visible==="editform") {
      return (<div className="box1">
        <h1>Asiakastietojen muokkaus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit} /> : null }
      </div>
      );

    } else if (this.state.visible==="deleteform") {
      return (<div className="box1">
        <h1>Asiakastietojen poiston vahvistus</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
          <button onClick={this.handlePerformDelete}>Vahvista poisto</button>
        </div>
      </div>
      );

    } else if (this.state.visible==="help") {
      return (<div className="box1">
        <h1>Sovelluksen opasteet</h1>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        <Helpit moduli="NWCustomerFetch"/>
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

