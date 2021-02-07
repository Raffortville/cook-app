import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {createForm} from '../../Store/modules/formStore'
import {initialStateProgress,removeProgression,removeProgressionTitre} from '../../Store/modules/progressionStore'
import {ingredientsSelector,fetchIngredients,removeIngredientTitre,removeIngredient,initialState} from '../../Store/modules/ingredientStore'
import '../Table/module.Table.scss'
import {Tooltip} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import FormTable from '../Table/formTable'
import TableTitre from '../Table/TableTitre'
import TableProgression from '../Progression/TableProgression'
import Loader from '../Alert/Loader'
import {iconActionsParent,iconActionsChild} from '../../Constants'
import {sortArrayByIndex} from '../../Utils'
import { ficheSelector } from '../../Store/modules/ficheStore'
import {loadingSelector} from '../../Store/modules/alertStore'


const Table = () => {

    const dispatch = useDispatch()

    const [openForm,setOpenForm] = useState(false)

    const ingredients = useSelector(ingredientsSelector)

    const currentFiche = useSelector(ficheSelector)

    const loading = useSelector(loadingSelector)

    let copyArr = [...ingredients]

    sortArrayByIndex(copyArr,"created")  

    useEffect(() => {

        dispatch(fetchIngredients(currentFiche.ficheId))

    },[dispatch,currentFiche])


    const handleOpenFormTitre = (item,action,table,type) => {

        if(action === "supprimer") return handleDelete(item);

        if(action === "ajouter"){

            table !== "progression" ? dispatch(createForm({...initialState.ingredientTitre,header:`${action} ${type}`,table:table,ficheId:currentFiche.ficheId})) :

            dispatch(createForm({...initialStateProgress.progressTitre,header:`${action} ${type}`,ficheId:currentFiche.ficheId,table:table}))
        }

        if(action === "modifier"){ dispatch(createForm({...item,header: `${action} ${type}`,table:table}))}
        
        setOpenForm(true) 
    }
 
    const handleOpenForm = (item,action,table,type,id) => {

        if(action === "supprimer") return handleDelete(item,table);

        if(action === "ajouter" ){

            table !== "progression" ? dispatch(createForm({...initialState.ingredient, header:`${action} ${type}`,ficheId:currentFiche.ficheId,ingredientTitreId:id,table:table})) :
            
            dispatch(createForm({...initialStateProgress.progress,header:`${action} ${type}`,table:table,ficheId:currentFiche.ficheId,progressTitreId:id}));
        }

        if(action === "modifier") { dispatch(createForm({...item,header: `${action} ${type}`,table:table}))}
       
       setOpenForm(true)
    }   


    const handleDelete = (item,table) => {

        if(table !== "progression" ){

            !item.titre ? dispatch(removeIngredient(item)) : dispatch(removeIngredientTitre(item))

        } else {

            !item.titre ? dispatch(removeProgression(item)) : dispatch(removeProgressionTitre(item))
        }
    }

    const closeForm = () => setOpenForm(false)
    
    return(
        <div>
        { loading ? <Loader/>:
           
           <div>
                <TableTitre fiche={currentFiche}/>
                <div className="wrapTables">
                    <table>
                        <thead> 
                            <tr>
                                <th>Actions</th>
                                <th className="ingredient">Ingrédients 
                                    <Tooltip title="ajouter catégorie">
                                        <Icon onClick={()=>handleOpenFormTitre({},"ajouter","ingrédient","catégorie")} className="icon" style={{marginLeft:"5px"}}>add_circle_outline</Icon>
                                    </Tooltip>
                                </th>
                                <th>Quantités</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                            {copyArr.map((item,index) =>
                                <tbody key={index}>
                                    <tr>
                                        <td>
                                            {iconActionsParent.map((icon,index)=>
                                                <Tooltip key={index} title={ icon.action ==="ajouter" ? `${icon.action} ingrédient` :`${icon.action} catégorie` }>
                                                    <Icon onClick={()=>handleOpenForm(item,icon.action,"ingrédient","ingrédient",item.ingredientTitreId)} style={ {paddingTop:"10px"}} className={icon.class}>{icon.icon}</Icon>
                                                </Tooltip>)}
                                        </td> 
                                        <td className="titre ingredient">{item.nom}</td>
                                    </tr>
                                    {item.subArray.length > 0 && 
        
                                        item.subArray.map((ingre,index) => 
        
                                        <tr key={index}>
                                            <td>
                                            {iconActionsChild.map((icon,index)=>
                                                <Tooltip key={index} title={`${icon.action} ingrédient`}>
                                                    <Icon onClick={()=>handleOpenForm(ingre,icon.action,"ingrédient","ingrédient",item.ingredientTitreId)} className={icon.class}>{icon.icon}</Icon>
                                                </Tooltip>)}
                                            </td>
                                            <td className="ingredient"><span>-</span>{ingre.nom}</td>
                                            <td >{ingre.qte}</td>
                                            <td >{ingre.prix}</td>
                                        </tr>)
                                    }
                                </tbody>
                            )} 
                    </table>
                    <TableProgression handleOpenForm={handleOpenForm} handleOpenFormTitre={handleOpenFormTitre}/>
                    <div>
                    {openForm &&  <FormTable close={closeForm}/>} 
                    </div>
                </div>
            </div>
        }
        </div>
    )
}


export default Table