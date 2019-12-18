import React, { Component } from 'react'
import './App.css'

class NWProductsEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tuoteObj: [], ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '', UnitPrice: '', UnitsInStock: '',
            UnitsOnOrder: '', ReorderLevel: '', Discontinued: true
        }
        this.handleChangeProductID = this.handleChangeProductID.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan prod -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    //________HANDLE CHANGESSA INT PARSE: KOKEILE ILMA JOS ONGELMIA

    handleChangeProductID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ProductID: parseInt(syöte) });
    }
    handleChangeProductName(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ProductName: syöte });
    }
    handleChangeSupplierID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, SupplierID: parseInt(syöte) });
    }
    handleChangeCategoryID(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, CategoryID: parseInt(syöte) });
    }
    handleChangeQuantityPerUnit(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, QuantityPerUnit: syöte });
    }

    handleChangeUnitPrice(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitPrice: parseInt(syöte) });
    }
    handleChangeUnitsInStock(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitsInStock: parseInt(syöte) });
    }

    handleChangeUnitsOnOrder(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, UnitsOnOrder: parseInt(syöte) });
    }
    handleChangeReorderLevel(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, ReorderLevel: parseInt(syöte) });
    }
    handleChangeDiscontinued(event) {
        var syöte = event.target.value;
        this.setState({ ...this.state, Discontinued: syöte });
    }

    handleSubmit(event) {
        alert('Päivitettävä tuote: ' + this.state.ProductID + this.props.tuoteObj.ProductName + this.props.tuoteObj.productName);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    callBackRoutine() {
        console.log('NWProductEDIT: . . . . callBackRoutine >>>---' + this.state.tuoteObj.ProductID);
    }

    componentDidMount() {

        this.setState({
            ProductID: parseInt(this.props.tuoteObj.productId),
            ProductName: this.props.tuoteObj.productName,
            SupplierID: parseInt(this.props.tuoteObj.supplierID),
            CategoryID: parseInt(this.props.tuoteObj.categoryID),
            QuantityPerUnit: this.props.tuoteObj.quantityPerUnit,
            UnitPrice: parseInt(this.props.tuoteObj.unitPrice),
            ReorderLevel: parseInt(this.props.tuoteObj.reorderLevel),
            Discontinued: this.props.tuoteObj.discontinued
        }
        )
    }

    InsertoiKantaan() {
        // Luodaan tuoteobjekti, johon haetaan state:sta tiedot                     
        const tuote = {
            ProductID: parseInt(this.state.ProductID),
            ProductName: this.state.ProductName,
            SupplierID: parseInt(this.state.SupplierID),
            CategoryID: parseInt(this.state.CategoryID),
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: parseInt(this.state.UnitPrice),
            UnitsInStock: parseInt(this.state.UnitsInStock),
            UnitsOnOrder: parseInt(this.state.UnitsOnOrder),
            ReorderLevel: parseInt(this.state.ReorderLevel),
            Discontinued: this.state.Discontinued
        };
        // send an asynchronous request to the backend
        const tuoteJson = JSON.stringify(tuote);
        console.log("tuoteJson ------- ", tuoteJson);
        const apiUrl = 'https://localhost:5002/nw/products/' + this.state.ProductID;
        console.log('----Käytetty url: -------- ', apiUrl)

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tuotteen päivittämiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
            <div>
                <form className="box3" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.ProductID} title="Syötä tuotetunnus" placeholder="ProductID" onChange={this.handleChangeProductID} />
                    <input type="text" value={this.state.ProductName} placeholder="ProductName" onChange={this.handleChangeProductName} />
                    <input type="text" value={this.state.SupplierID} placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                    <input type="text" value={this.state.CategoryID} placeholder="CategoryID" onChange={this.handleChangeCategoryID} />
                    <input type="text" value={this.state.QuantityPerUnit} placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} />
                    <input type="text" value={this.state.UnitPrice} placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} />
                    <input type="text" value={this.state.UnitsInStock} placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} />
                    <input type="text" value={this.state.UnitsOnOrder} placeholder="UnitsOnOrder" onChange={this.handleChangeUnitsOnOrder} />
                    <input type="text" value={this.state.ReorderLevel} placeholder="ReorderLevel" onChange={this.handleChangeReorderLevel} />
                    <input type="text" value={this.state.Discontinued} placeholder="Discontinued" onChange={this.handleChangeDiscontinued} />
                    <br />
                    <button type="submit">Talleta muutokset</button>
                </form>
            </div>
        );
    }
}

export default NWProductsEdit