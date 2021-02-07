import React from "react"
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {setSearchMode} from '../../Store/modules/searchStore'
import {logOut} from '../../Store/modules/userStore'
import Dialog from '../../Components/Alert/Dialog'

const Logout = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    React.useEffect(() => {

        dispatch(setSearchMode(false))

    },[dispatch])

    const handleSubmit = () => {

        dispatch(logOut())
        history.push('/')
    }

    const setInitialState = () => history.push('/')

    const handleClose = () => history.push('/')

    return(
        <div style={{height:"90vh"}}>
            <Dialog titre={"Confirmez-vous la déconnexion ?"} handleSubmit={handleSubmit} close={handleClose} setInitialState={setInitialState}/>
        </div>
    )
}


export default Logout