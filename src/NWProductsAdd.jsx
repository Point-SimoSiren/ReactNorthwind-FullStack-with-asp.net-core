import React, { Component } from "react"
import "./App.css"

class NWProductsAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '',
            UnitPrice: '', UnitsInStock: '', UnitsOnOrder: '', ReorderLevel: '', Discontinued: false
        }

        this.handleChangeProductName = this.handleChangeProductName.bind(this)
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this)
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this)
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this)
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this)
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this)
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this)
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this)
        //this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    dismiss() {
        console.log("Ollaan NWProductsAdd -dismiss()-rutiinissa - - - - - - ")
        this.props.unmountMe()
    }

    handleChangeProductName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, ProductName: syöte })
    }
    handleChangeSupplierID(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, SupplierID: parseInt(syöte) })
    }

    handleChangeCategoryID(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, CategoryID: syöte })
    }
    handleChangeQuantityPerUnit(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, QuantityPerUnit: syöte })
    }
    handleChangeUnitPrice(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, UnitPrice: syöte })
    }
    handleChangeUnitsInStock(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, UnitsInStock: syöte })
    }

    handleChangeUnitsOnOrder(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, UnitsOnOrder: syöte })
    }

    handleChangeReorderLevel(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, ReorderLevel: syöte })
    }

    handleChangeDiscontinued(event) {
        var täppä = event.target.value
        if (täppä === "true") {

            this.setState({ ...this.state, Discontinued: false })

        }
        else {
            this.setState({ ...this.state, Discontinued: true })
        }
        console.log('setStaten jälkeen: ', this.state.Discontinued)
    }


    handleSubmit(event) {
        alert("Lähetettiin tuote: " + this.state.ProductName)
        event.preventDefault()
        this.InsertoiKantaan()
    }

    InsertoiKantaan() {
        const tuote = {
            ProductName: this.state.ProductName,
            SupplierId: parseInt(this.state.SupplierID),
            CategoryId: parseInt(this.state.CategoryID),
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: parseInt(this.state.UnitPrice),
            UnitsInStock: parseInt(this.state.UnitsInStock),
            UnitsOnOrder: parseInt(this.state.UnitsOnOrder),
            ReorderLevel: parseInt(this.state.ReorderLevel),
            Discontinued: this.state.Discontinued
        }

        console.log('tuote obj:______-------________ ', tuote)
        const tuoteJson = JSON.stringify(tuote)
        console.log('tuoteJson _____-----______ = ', tuoteJson)

        let apiUrl = "https://localhost:5002/nw/products"

        /*let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/products'*/

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJson
        }).then((response) => response.json())
            .then((json) => {
                // store the data returned from the backend to the current state
                const success = json
                console.log(`json response from server: ${success}.`)
                if (success) {
                    console.log("Pyyntö tuotteen tallettamiseksi tehty -- -- -- -- --")
                    this.dismiss()
                }
            })
    }

    render() {
        return (

            <form className="box3" onSubmit={this.handleSubmit}>

                <input type="text" placeholder="Tuotenimi" onChange={this.handleChangeProductName} />

                <input type="number" placeholder="Toimittaja id" onChange={this.handleChangeSupplierID} />

                <input type="text" placeholder="Categoria id" onChange={this.handleChangeCategoryID} />

                <input type="text" placeholder="Pakkauskoko" onChange={this.handleChangeQuantityPerUnit} />

                <input type="text" placeholder="Yksikköhinta" onChange={this.handleChangeUnitPrice} />

                <input type="text" placeholder="Varastosaldo" onChange={this.handleChangeUnitsInStock} />

                <input type="text" placeholder="Tilauksella" onChange={this.handleChangeUnitsOnOrder} />

                <input type="text" placeholder="Re-order raja" onChange={this.handleChangeReorderLevel} />

                <label>Poistotuote</label><br />

                <div onChange={this.handleChangeDiscontinued.bind(this)}>
                    <input type="radio" value="true" name="disc" /> Kyllä
                    <input type="radio" value="false" name="disc" /> Ei
                    </div>

                <br />
                <button type="submit">Tallenna uudet tiedot</button>
            </form>
        )
    }
}
export default NWProductsAdd