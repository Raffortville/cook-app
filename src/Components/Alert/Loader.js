import React from 'react'
import './module.Alert.scss'
import CircularProgress from '@material-ui/core/CircularProgress';


const Loader = () => {
 
    return(

        <div className="wrapLoader">
            <CircularProgress  size="70px"/>
        </div>
    )
}


export default Loader