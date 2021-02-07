import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Paper,TextField,Avatar,Button} from '@material-ui/core'
import {userSelector,patchUserProfil} from '../../Store/modules/userStore'
import ButtonVal from '../Buttons/ButtonsVal'
import './module.ProfilCard.scss'

const ProfilCard = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const user = useSelector(userSelector)

    const [state,setState] = useState(user)

    const [avatarSrc,setAvatarSrc] = useState(user.avatar)

    const handleChange = (e) => {

        const {value,name} = e.target;

        setState({...state,[name]:value})
    }

    const handleChangeImg = (e) => {

        let reader = new FileReader()

        let file = e.target.files[0]

        reader.readAsDataURL(file)

        reader.addEventListener('load', () => setAvatarSrc(reader.result))
        
    }

    const setInitialState = () => {

        setState(user);
        setAvatarSrc(user.avatar)
    }

    const handleClose = () => {

        setInitialState()
        history.push('/')
    }

    const handleSubmit = () => {

        dispatch(patchUserProfil(state,avatarSrc))
        history.push('/')
    }

    return(
        
        <Paper elevation={3} className="paper">
            <p className="h3 textPrimary">Votre Profil</p>
            <ul>
                <li>
                    <TextField onChange={handleChange} className="liProfil"  label="Nom d'utilisateur" name="username" value={state.username}/>
                </li>
                <li>
                    <TextField onChange={handleChange} className="liProfil" label="Email de contact" name="emailContact" value={state.emailContact}/>
                </li>
                <li className="liProfil">
                    <Button component="label"  variant="outlined"><p className="textSecondary">ajouter avatar</p>
                        <input onChange={handleChangeImg}  style={{display:"none"}} type="file" accept=".jpg,.png"/>
                    </Button>
                </li>
                <li className="d-flex liProfil">
                    {avatarSrc === "" ? 
                    
                        (<Avatar></Avatar>) :

                        <img className="imgAvatar" src={avatarSrc} alt="/"/>
                    }
                </li>
            </ul>
            <div className="wrapButton">
                <ButtonVal handleSubmit={handleSubmit} setInitialState={setInitialState} close={handleClose}/>
            </div>
        </Paper>
       
    )
}


export default ProfilCard