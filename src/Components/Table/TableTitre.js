import React from 'react'
import './module.TableTitre.scss'
import {capitalizeAll} from '../../Utils'

const TableTitre = (props) => {

    return(

        <div className=" wrapTableTitre">
            <h2 >{capitalizeAll(props.fiche.nom)}</h2>
            <p>{props.fiche.description}</p>
            <p> {props.fiche.categorie} <span style={{marginLeft:"5px"}}> {props.fiche.cuisson}</span></p>
        </div>
    )
}


export default TableTitre