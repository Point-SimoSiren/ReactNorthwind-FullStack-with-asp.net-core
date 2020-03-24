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
        //this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        console.log("Ollaan prod -dismiss()-rutiinissa - - - - - - ");
        this.props.unmountMe();
    }

    //________HANDLE CHANGESSA INT PARSE: KOKEILE ILMAN JOS ONGELMIA

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
        var täppä = event.target.value
        if (täppä === "true") {

            this.setState({ ...this.state, Discontinued: true })

        }
        else {
            this.setState({ ...this.state, Discontinued: false })
        }
        console.log('setStaten jälkeen: ', this.state.Discontinued)
    }

    handleSubmit(event) {
        alert('Päivitettävä tuote: ' + this.state.ProductID + ' ' + this.props.tuoteObj.productName);
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
            SupplierID: parseInt(this.props.tuoteObj.supplierId),
            CategoryID: parseInt(this.props.tuoteObj.categoryId),
            QuantityPerUnit: this.props.tuoteObj.quantityPerUnit,
            UnitsInStock: parseInt(this.props.tuoteObj.unitsInStock),
            UnitPrice: parseInt(this.props.tuoteObj.unitPrice),
            UnitsOnOrder: parseInt(this.props.tuoteObj.unitsOnOrder),
            ReorderLevel: parseInt(this.props.tuoteObj.reorderLevel),
            Discontinued: this.props.tuoteObj.discontinued
        }
        )
    }

    InsertoiKantaan() {
        // Luodaan tuoteobjekti, johon haetaan state:sta tiedot                     
        const tuote = {
            ProductId: parseInt(this.state.ProductID),
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

        //const apiUrl = 'https://localhost:5002/nw/products/' + this.state.ProductID;

        let apiUrl = 'https://aspnet-react-northwind.azurewebsites.net/nw/products/' + this.state.ProductID;

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
                    <label>Tuotenimi</label>
                    <input type="text" value={this.state.ProductName} placeholder="ProductName" onChange={this.handleChangeProductName} />
                    <label>Toimittajakoodi</label>
                    <input type="number" value={this.state.SupplierID} placeholder="SupplierID" onChange={this.handleChangeSupplierID} />
                    <label>Kategoriakoodi</label>
                    <input type="number" value={this.state.CategoryID} placeholder="CategoryID" onChange={this.handleChangeCategoryID} />
                    <label>Pakkauskoko</label>
                    <input type="text" value={this.state.QuantityPerUnit} placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} />
                    <label>Yksikkö hinta alv 0</label>
                    <input type="number" value={this.state.UnitPrice} placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} />
                    <label>Varastosaldo</label>
                    <input type="number" value={this.state.UnitsInStock} placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} />
                    <label>Tilauskanta kpl</label>
                    <input type="number" value={this.state.UnitsOnOrder} placeholder="UnitsOnOrder" onChange={this.handleChangeUnitsOnOrder} />
                    <label>Tilauskynnys</label>
                    <input type="number" value={this.state.ReorderLevel} placeholder="ReorderLevel" onChange={this.handleChangeReorderLevel} />

                    <label>Poistotuote</label><br />
                    <div onChange={this.handleChangeDiscontinued.bind(this)}>
                        <input type="radio" value="true" name="disc" /> Kyllä
                    <input type="radio" value="false" name="disc" /> Ei
                    </div>
                    <br />
                    <button type="submit">Talleta muutokset</button>
                </form>
            </div>
        );
    }
}

export default NWProductsEdit