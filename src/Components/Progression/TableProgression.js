import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProgressions,progresssionsSelector} from '../../Store/modules/progressionStore'
import {ficheSelector} from '../../Store/modules/ficheStore'
import {Tooltip,Icon} from '@material-ui/core'
import '../Table/module.Table.scss'
import {iconActionsChild,iconActionsParent} from '../../Constants'
import {sortArrayByIndex} from '../../Utils'
const TableProgression = (props) => {

    const dispatch = useDispatch()

    const currentFiche = useSelector(ficheSelector)

    const progressions = useSelector(progresssionsSelector)

    let copyArr = [...progressions];

    sortArrayByIndex(copyArr,"numero")

    useEffect(() => {

        dispatch(fetchProgressions(currentFiche.ficheId))

    },[dispatch,currentFiche])


    return(
        <table>
            <thead>
                <tr>    
                    <th className="ingredient">Etapes de réalisation
                        <Tooltip title="ajouter titre">
                            <Icon onClick={()=>props.handleOpenFormTitre({},"ajouter","progression","titre de l'étape")} className="icon" style={{marginLeft:"5px"}}>add_circle_outline</Icon>
                        </Tooltip>
                    </th>
                </tr>
            </thead>
            { copyArr.map((etap,index) =>
            
                <tbody key={index}>
                    <tr>
                        <td>
                        {iconActionsParent.map((icon,index)=>
                            <Tooltip key={index} title={ icon.action ==="ajouter" ? `${icon.action} une étape` :`${icon.action} titre de l'étape` }>
                                <Icon onClick={()=>props.handleOpenForm(etap,icon.action,"progression","l'étape",etap.progressTitreId)} style={ {paddingTop:"10px"}} className={icon.class}>{icon.icon}</Icon>
                            </Tooltip>)}
                        </td> 
                        <td className="titre">{etap.nom}</td>
                    </tr>
                    {etap.subArray.length > 0 &&

                        etap.subArray.map((item,index) =>
                        
                        <tr key={index}>
                            <td>
                            {iconActionsChild.map((icon,index)=>
                                <Tooltip key={index} title={ `${icon.action} l'étape` }>
                                    <Icon onClick={()=>props.handleOpenForm(item,icon.action,"progression","l'étape",etap.progressTitreId)} style={ {paddingTop:"10px"}} className={icon.class}>{icon.icon}</Icon>
                                </Tooltip>)}
                            </td> 
                            <td><span>-</span>{item.nom}</td>
                        </tr>
                        )
                    }
                </tbody>
            )}
        </table>
    )
}


export default TableProgression