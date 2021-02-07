import React from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectFiche} from '../../Store/modules/ficheStore'
import {Tooltip} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import './module.ListFiche.scss'
import {iconListFiche} from '../../Constants'


const FicheCard = (props) => { 

    const dispatch = useDispatch()

    return(

        <div className="CardRoot">
            
            {props.fiche.image !== undefined  &&
            <img  className="wrapFicheImg" alt="img" src={props.fiche.image}/>}

                <div className="wrapCarcContent">
                <p className="p4 textSecondary">{props.fiche.categorie}</p>
                <div className="wrapTitre">
                <Link className="removeLinkStyle" onClick={()=>dispatch(selectFiche(props.fiche))} to={`fiche/${props.fiche.ficheId}`}>
                    <p className="h4 textPrimary">{props.fiche.nom}</p>
                </Link>
                </div>
                <div className="wrapTitre">
                    <p className="p3">{props.fiche.description}</p>
                </div>
                <div className="wrapTitre">
                    <p className="p4">{props.fiche.cuisson}</p>
                </div>
                <div className="wrapIcons" >
                {iconListFiche.map((icon,index) =>
                    <span key={index}>
                        <Tooltip title={icon.title}>
                            <Icon onClick={()=> props.handleIconAction(icon.action,props.fiche)} className="icon">{icon.icon}</Icon>
                        </Tooltip>
                    </span>             
                )}
                </div>
            </div>
        </div>
    )
}

export default FicheCard