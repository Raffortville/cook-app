import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {TextField,Paper,InputLabel,Select,MenuItem,Button} from '@material-ui/core'
import {categories,cuissons} from '../../Constants'
import ButtonsVal from '../Buttons/ButtonsVal'
import {createFiche,patchFiche} from '../../Store/modules/ficheStore'
import {editFicheFormSelector} from '../../Store/modules/formStore'
import {addAlert} from '../../Store/modules/alertStore'
import {userSelector} from '../../Store/modules/userStore'
import { capitalize } from '../../Utils'


const FormFiche = () => {

    const dispatch = useDispatch()

    let history = useHistory()

    const ficheForm = useSelector(editFicheFormSelector)

    const user = useSelector(userSelector)

    const [state,setState] = useState(ficheForm)

    const [img,setImg] = useState()

    useEffect(() => {

        setState(ficheForm)
        
    },[ficheForm])

    useEffect(() => {

        setImg(img=> state.image !== "" ? state.image : img)

    },[setImg,state.image])

    const handleChange = (e) => {

        const {name,value} = e.target

        if(name !== "description"){

            name === "nom" ? setState({...state,[name]:capitalize(value)}) : setState({...state,[name]:value});
            
        } else {

            let strMax =+ value.length
            
            strMax < 66 ? setState({...state,description:value}) : dispatch(addAlert({message:"Nombre maximum de charachères !", class:"warning"}))
        }
    }


    const handleSubmit = () => {

       if(state.nom !== ""){

        !state.ficheId ? dispatch(createFiche(state,img,user.uid)) : dispatch(patchFiche(state,img));
        history.push('/search')

       } else {

        dispatch(addAlert({message:"veuillez saisir les champs vides !",class:"error"}))
       }

    }

    const handleChangeImg = (e) => {

        let reader = new FileReader()

        let file = e.target.files[0]

        reader.readAsDataURL(file)

       reader.addEventListener('load',(e)=> {

        setImg(reader.result)
        
       })
    }   

    const setInitialState = () => {

        setImg(state.image)
        setState(ficheForm)
    }

    const RenderImg = () => img !== undefined  ? <img width="45px" height="45px" alt="" src={img}/> : null

    return(

        <div>
            <Paper className="paper" elevation={3}>
                <p className="h3 textPrimary">Fiche technique de fabrication</p>
                <ul>
                    <li>
                        <TextField onChange={handleChange} required name="nom" value={state.nom} margin="dense" size="small" fullWidth label="Nom de la recette"/>
                    </li>
                    <li>
                        <TextField onChange={handleChange} name="description" value={state.description}  variant="outlined" multiline rows={2} margin="dense" size="small" fullWidth label="Descriptif de la recette"/>
                    </li> 
                    <li>
                    <InputLabel>Catégorie</InputLabel>
                    <Select onChange={handleChange}  fullWidth name="categorie" value={state.categorie}>
                        {categories.map((nom,index) =>

                            <MenuItem value={nom} key={index}>{nom}</MenuItem>
                        )}
                    </Select>
                    </li>
                    <li>
                    <InputLabel>Mode cuisson</InputLabel>
                    <Select onChange={handleChange}  name="cuisson" value={state.cuisson} fullWidth>
                        {cuissons.map((nom,index) =>

                            <MenuItem value={nom} key={index}>{nom}</MenuItem>
                        )}
                    </Select>
                    </li>
                    <li>
                        <div className="wrapImg">
                            <Button component="label" className="buttonStyle" size="small"  variant="outlined">Ajouter Photo
                                <input onChange={handleChangeImg}  style={{display:"none"}} type="file" accept=".jpg,.png"/>
                            </Button>
                            <div>
                               {RenderImg()} 
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="wrapButton">
                   <ButtonsVal handleSubmit={handleSubmit} close={()=>history.push('/')} setInitialState={setInitialState}/>
                </div>
            </Paper>
        </div>
    )
}


export default FormFiche