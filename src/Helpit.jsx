import React, { Component } from 'react'
import './App.css'
class Helpit extends Component {
    render() {
        if (this.props.moduli === "viestit") {
            return (
                <div>
                    <p>Minäpä kerron miten Viestit-ohjelmaa käytetään...</p>
                </div>
            )
        } else if (this.props.moduli === "AnalogWatch") {
            return (
                <div>
                    <p>Minäpä kerron miten AnalogWatch-ohjelmaa käytetään...</p>
                </div>
            )
        }
        else if (this.props.moduli === "NWCustomerFetch") {
            return (
                <div>
                    <p>Voit hakea asiakkaita sekä muokata heitä</p>
                </div>
            )
        }
        else if (this.props.moduli === "UserFetch") {
            return (
                <div>
                    <p>Näet täältä käyttäjälistauksen ja voit lisätä uusia 2-A tason käyttäjiä.</p>
                    <p>Poistoa, muokkausta tai 1. tason tunnuksia varten ota yhteys järjestelmän ylläpitoon:</p>
                    <p>northwind-admin@azureweb.fi</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Helppiä ei löydy</p>
                </div>
            )
        }
    }
}
export default Helpit
