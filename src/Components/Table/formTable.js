import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Paper,TextField} from "@material-ui/core"
import '../Table/module.formTable.scss'
import ButtonVal from '../Buttons/ButtonsVal'
import Alert from '../Alert/Alert'
import {formSelector} from '../../Store/modules/formStore'
import {createProgression,createProgressionTitre,patchProgression,patchProgressionTitre} from '../../Store/modules/progressionStore'
import {createIngredientTitre,createIngredient,patchIngredient,patchIngredientTitre} from '../../Store/modules/ingredientStore' 
import {addAlert} from '../../Store/modules/alertStore'
import {capitalize} from '../../Utils'


const FormTable = (props) => {

    const dispatch = useDispatch()

    const form = useSelector(formSelector)

    const [state,setState] = useState(form)

    useEffect(() => {

        setState(form)

    },[form])

    const handleChange = (e) => {

        const {name,value} = e.target;
        
        setState({...state,[name]:capitalize(value),created:Date.now()})
    }

    const handleSubmit = () => {   

        if(state.nom !== ""){

            if(state.titre && state.header.includes("ajouter")){

                state.table !== "progression" ? dispatch(createIngredientTitre(state)) : dispatch(createProgressionTitre(state))

            } else if(!state.titre && state.header.includes("ajouter")){

                state.table !== "progression" ? dispatch(createIngredient(state)) : dispatch(createProgression(state))

            } else if(!state.titre && state.header.includes("modifier")){

                state.table !=="progression" ? dispatch(patchIngredient(state)) : dispatch(patchProgression(state))

            } else if(state.titre && state.header.includes("modifier")){

              state.table !== "progression" ?  dispatch(patchIngredientTitre(state)) : dispatch(patchProgressionTitre(state))
            }   

            props.close()

        } else {    

            dispatch(addAlert({message:"veuillez saisir un nom !",class:"error"}))
        }
    }

    return(

        <div className="wrapForm">
            <Paper className="paper" elevation={3}>
                    <p className="titre h3">{state.table}</p>
                <p className="p1">{state.header}</p>   
                <div>
                    <TextField fullWidth required name="nom" value={state.nom} onChange={handleChange} label={state.header}/>
                </div>
                {state.header.includes("ingrédient")  &&
                    <div>
                        <div>
                            <TextField fullWidth name="qte" value={state.qte} label="Quantité" onChange={handleChange}/>
                        </div>
                        <div>
                            <TextField fullWidth name="prix" value={state.prix} label="Prix" onChange={handleChange}/>
                        </div>
                    </div>
                }
                {
                    state.table === "progression" && state.titre &&

                    <TextField InputProps={{ inputProps: { min: 0, max: 10 } }} fullWidth  type="number" label="Numéro de l'étape" value={state.numero} name="numero" onChange={handleChange}/>
                }
                <div className="wrapButton">
                    <ButtonVal close={props.close} handleSubmit={handleSubmit} />
                </div>
            </Paper>
            <Alert/>
        </div>
    )
}


export default FormTable
