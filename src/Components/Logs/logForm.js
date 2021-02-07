import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {TextField,Paper} from '@material-ui/core'
import './module.logForm.scss'
import ButtonVal from '../Buttons/ButtonsVal'
import {initialState,createUser,logUser} from '../../Store/modules/userStore'
import {addAlert} from '../../Store/modules/alertStore'
    
const LogForm = (props) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const [state,setState] = useState(initialState.user)

    const handleChange = (e) => {

        const {name,value} = e.target;

        setState({...state,[name]:value})
    }

    const handleSubmit = () => {

        if(props.title !== "IDENTIFIEZ-VOUS"){

            if(state.username === "" || state.email === "" || state.password === ""){

                dispatch(addAlert({message:"Champ manquant !", class:"error"}))

            } else { 

                dispatch(createUser(state));
                history.push('/')
            }

        } else {

            if(state.email === "" || state.password === ""){

                dispatch(addAlert({message:"Champ manquant !", class:"error"}))

            } else {

                dispatch(logUser(state));
                history.push('/')
            }
        }
    }

    const setInitialState = () => {

        setState(initialState.user)
    }

    const handleClose = () => {

        setInitialState();
        history.push('/')
    }

    return (

        <Paper className="paper" elevation={1}>
            <p className="h3 textPrimary">{props.title}</p>
            <ul>
            {props.title !== "IDENTIFIEZ-VOUS" && 
                <li>
                    <TextField onChange={handleChange} required name="username" value={state.username} label="Nom d'utilisateur"/>
                </li>
            }               
                
                <li>
                    <TextField onChange={handleChange} required type="email" name="email" value={state.email} label="email"/>
                </li>
               
                <li>
                    <TextField onChange={handleChange} required type="password" name="password" value={state.password} label="Mot de passe"/>
                </li>
            
            </ul>
            <div className="wrapButton">
                <ButtonVal handleSubmit={handleSubmit} setInitialState={setInitialState} close={handleClose}/>
            </div>
        </Paper>
        
    )
}


export default LogForm