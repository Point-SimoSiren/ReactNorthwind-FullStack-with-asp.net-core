import React, { Component } from 'react'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import UserDelete from './UserDelete'
import Helpit from './Helpit'
import './App.css'

class UserFetch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            visible: "table",
            renderChildAdd: true,
            renderChildEdit: true,
            renderChildDelete: true,
            yksiUser: [],
            poistaUser: [],
            LoginID: '',
            LoginID2Del: ''
        }
        this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this)
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this)
        this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this)
    }

    handleChildUnmountAdd() {
        this.setState({ renderChildAdd: false })
        this.handleClickTable()
        this.HaeNWRestApista()
    }

    handleChildUnmountEdit() {
        console.log("Ollaan userfetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
        this.setState({ renderChildEdit: false });
        this.handleClickTable();
        this.HaeNWRestApista();
    }

    handleChildUnmountDelete() {
        console.log("Ollaan userFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
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

    handleSubmit() {
        console.log('HaeNWRestApista: . . . . handleSubmitissa')
        this.HaeNWRestApista()
    }

    HaeNWRestApista() {

        //let uri = 'https://aspnet-react-northwind.azurewebsites.net/nw/logins'

        let uri = 'https://localhost:5002/nw/logins'

        console.log('Haetaan rest apista: ', uri)
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                console.log('Json data palvelimelta: ', json)
                this.setState({ users: json })
            });
    }

    handleClickEdit = (dataObj, event) => {
        console.log("<<handleClickEdit -- dataObj-tulostus>>", dataObj);
        this.setState({
            yksiUser: dataObj,
            visible: "editform",
            renderChildEdit: true
        })
    }
    handleClickDelete = (dataObj, event) => {
        console.log("<<handleClickDelete -- -- Poistan käyttäjän>>>>", dataObj);
        alert("Poistetaan käyttäjä ID: " + dataObj.loginId)
        this.setState({
            poistaUser: dataObj,
            visible: "deleteform",
            renderChildDelete: true
        })
    }

    componentDidMount() {
        this.HaeNWRestApista()
    }

    render() {
        console.log('User-Fetch-komponentti: render')
        let viesti = 'Käyttäjät: rivejä yhteensä: ' + this.state.users.length
        let taulukko = []
        //Luodaan taulukon otsikot
        let tHeaders = <tr>
            <th>ID</th>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Sähköposti</th>
            <th>Käyttäjätunnus</th>
            <th>Käyttäjätaso</th>
        </tr>

        if (this.state.users.length > 0) {
            for (let index = 0; index < this.state.users.length; index++) {
                const element = this.state.users[index]

                taulukko.push(<tr key={element.loginId}>
                    <td>{element.loginId}</td>
                    <td>{element.firstname}</td>
                    <td>{element.lastname}</td>
                    <td>{element.email}</td>
                    <td>{element.username}</td>
                    <td>{element.accesslevelId}</td>
                    <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
                    <td><button onClick={this.handleClickDelete.bind(this, element)}>Poista</button></td>
                </tr>)
            }
        }
        else {
            viesti = "Tuodaan tietoja..."
        }
        //Ehdollinen return
        if (this.state.visible === "table") {
            return (

                <div className="box1">
                    <h1>Käyttäjähallinta</h1>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickAdd}>Lisää Käyttäjä</button>

                    <table className="table table-dark" id="t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
                    <p>{viesti}</p>
                </div>
            );

        } else if (this.state.visible === "addform") {
            return (<div className="box1">
                <h1>Uuden käyttäjän lisäys</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickTable}>Selaa käyttäjiä</button>
                </div>
                {this.state.renderChildAdd && <UserAdd unmountMe={this.handleChildUnmountAdd} />}
            </div>
            );
        }
        else if (this.state.visible === "editform") {
            return (<div className="box1">
                <h1>Käyttäjätietojen muokkaus</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickTable}>Selaa käyttäjiä</button>
                </div>
                {this.state.renderChildEdit ? <UserEdit userObj={this.state.yksiUser} unmountMe={this.handleChildUnmountEdit} /> : null}
            </div>
            )

        } else if (this.state.visible === "deleteform") {
            return (<div className="box1">
                <h1>Käyttäjän poiston vahvistus</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickTable}>Selaa käyttäjiä</button>
                </div>
                {this.state.renderChildEdit ? <UserDelete userObj={this.state.poistaUser} unmountMe={this.handleChildUnmountDelete} /> : null}
            </div>
            );

        } else if (this.state.visible === "help") {
            return (<div className="box1">
                <h1>Sovelluksen opasteet</h1>
                <button onClick={this.handleClickAdd}>Lisää asiakas</button>
                <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
                <Helpit moduli="UserFetch" />
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
export default UserFetch;