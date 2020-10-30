import React, { Component } from 'react'
import Helpit from './Helpit'
import './App.css'
import NWProductsAdd from './NWProductsAdd'
import NWProductsEdit from './NWProductsEdit'
import NWProductsDelete from './NWProductsDelete'

class NWProductsFetch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tuotteet: [],
            start: 0,
            take: 10,
            visible: "table",
            renderChildAdd: true,
            renderChildEdit: true,
            renderChildDelete: true,
            yksiTuote: [],
            poistaTuote: [],
            ProductID: '',
            ProductID2Del: ''
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
        this.setState({ renderChildEdit: false })
        this.handleClickTable()
        this.HaeNWRestApista()
    }

    handleChildUnmountDelete() {
        this.setState({ renderChildDelete: false })
        this.handleClickTable()
        this.HaeNWRestApista()
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
        let startvalue = this.state.start
        if (startvalue > 0) {
            startvalue = startvalue - 10
        }
        this.setState({ start: startvalue }, this.handleSubmit)
    }

    handleClickNext = () => {
        this.setState({ start: this.state.start + 10 }, this.handleSubmit)
    }

    handleSubmit() {
        this.HaeNWRestApista()
    }

    HaeNWRestApista() {

        /*let uri = `https://aspnet-react-northwind.azurewebsites.net/nw/Products/r?offset= ${this.state.start} &limit= ${this.state.take}` */

        /*let uri = `https://localhost:5002/nw/Products/r?offset= ${this.state.start}
        &limit= ${this.state.take}`*/

        const baseurl = process.env.REACT_APP_BASE_URL

        let uri = `${baseurl}Products/r?offset= ${this.state.start}
        &limit= ${this.state.take}`

        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({ tuotteet: json })
            })
    }

    handleClickEdit = (dataObj, event) => {
        this.setState({
            yksiTuote: dataObj,
            visible: "editform",
            renderChildEdit: true
        })
    }
    handleClickDelete = (dataObj, event) => {
        console.log("Poistetaan tuote: ", dataObj)
        if (dataObj.unitsInStock > 0 || dataObj.unitsOnOrder > 0) {
            alert('TOP!' + ' ' + 'TOP! ' + 'Tuotteita on yhä varastossa tai tilauksella!')
        }
        else {
            this.setState({
                poistaTuote: dataObj,
                visible: "deleteform",
                renderChildDelete: true
            })
        }
    }

    componentDidMount() {
        this.HaeNWRestApista()
    }

    render() {
        let viesti = "NW Products-rivejä:" + this.state.tuotteet.length
        let taulukko = []

        let tHeaders = <tr><th>Tuotekoodi</th><th>Tuotenimi</th>
            <th>Yksikköhinta alv 0</th><th>Toimittajakoodi</th>
            <th>Varastosaldo</th><th>Tilauskanta</th></tr>
        if (this.state.tuotteet.length > 0) {
            for (let index = 0; index < this.state.tuotteet.length; index++) {
                const element = this.state.tuotteet[index]
                taulukko.push(<tr key={element.productId}>
                    <td>{element.productId}</td>
                    <td>{element.productName}</td>
                    <td>{element.unitPrice}</td>
                    <td>{element.supplierId}</td>
                    <td>{element.unitsInStock}</td>
                    <td>{element.unitsOnOrder}</td>
                    <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
                    <td><button onClick={this.handleClickDelete.bind(this, element)}>Poista</button></td>
                </tr>)
            }
        }
        else {
            viesti = "Ladataan tuotetietoja Northwind-tietokannasta..."
        }
        //Ehdollinen return
        if (this.state.visible === "table") {
            return (<div className="box1">
                <h1>Tuotehallinta</h1>
                <button onClick={this.handleClickHelp}>Näytä opaste</button>
                <button onClick={this.handleClickAdd}>Lisää tuote</button>
                <button onClick={this.handleClickPrev}>Edelliset</button>
                <button onClick={this.handleClickNext}>Seuraavat</button>
                <table className="table table-dark" id="t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
                <p>{viesti}</p>
            </div>
            )
        } else if (this.state.visible === "addform") {
            return (<div className="box1">
                <h1>Uuden tuotteen lisäys</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickTable}>Selaa tuotteita</button>
                </div>
                {this.state.renderChildAdd ? <NWProductsAdd unmountMe={this.handleChildUnmountAdd} /> : null}
            </div>
            )

        } else if (this.state.visible === "editform") {
            console.log(this.state.yksiTuote)
            return (<div className="box3">
                <h1>Tuotetietojen muokkaus</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickTable}>Selaa tuotteita</button>
                </div>
                {this.state.renderChildEdit ? <NWProductsEdit
                    tuoteObj={this.state.yksiTuote} unmountMe={this.handleChildUnmountEdit} /> : null}
            </div>
            )

        } else if (this.state.visible === "deleteform") {
            return (<div className="box1">
                <h1>Tuotetietojen poiston vahvistus</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä opaste</button>
                    <button onClick={this.handleClickTable}>Selaa tuotteita</button>
                </div>
                {this.state.renderChildEdit ? <NWProductsDelete
                    tuoteObj={this.state.poistaTuote} unmountMe={this.handleChildUnmountDelete} />
                    : null}
            </div>
            )

        } else if (this.state.visible === "help") {
            return (<div className="box1">
                <h1>Sovelluksen opasteet</h1>
                <button onClick={this.handleClickAdd}>Lisää Tuote</button>
                <button onClick={this.handleClickTable}>Selaa tuotteita</button>
                <Helpit moduli="NWProductsFetch" />
            </div>
            )

        } else {
            return (<div className="box1">
                <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
            </div>
            )
        }


    }
}
export default NWProductsFetch