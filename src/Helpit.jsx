import React, { Component } from 'react'
import './App.css'
class Helpit extends Component {
    render() {

        if (this.props.moduli === "NWCustomerFetch") {
            return (
                <div><br />
                    <h4>Voit hakea ja muokata asiakastietoja.</h4>
                    <br />
                    <h4>Järjestelmä on turvallinen:</h4>
                    <h5>Asiakkaita, joilla on tilauksia ei järjestelmästä voi poistaa.</h5>
                </div>
            )
        }
        else if (this.props.moduli === "UserFetch") {
            return (
                <div>
                    <br />
                    <h4>Täällä voit selata ja ylläpitää käyttäjätietoja.</h4>
                    <h5>Uudelle käyttäjälle voi luoda salasanan.</h5>
                    <h5>Muissa salasanoja koskevissa asioissa palvelee Pohjoistuuli Oy:n IT -osasto. </h5>
                </div>
            )
        }
        else if (this.props.moduli === "NWProductsFetch") {
            return (
                <div><br />
                    <h4>Voit hakea ja muokata tuotetietoja.</h4>
                    <br />
                    <h4>Järjestelmä on turvallinen:</h4>
                    <h5>Tuotteita, joilla on tilauksia tai varastosaldoa ei voi poistaa.</h5>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>OoOoOoOops!! Helppiä ei löydykään...</p>
                </div>
            )
        }
    }
}
export default Helpit
