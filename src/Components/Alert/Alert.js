import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {addAlert, alertSelector,initialState} from '../../Store/modules/alertStore'

import '../Alert/module.Alert.scss'

const Alert = () => {

    const alert = useSelector(alertSelector)

    const dispatch = useDispatch()

    React.useEffect(() => {

        if(alert.message !== ""){

            setTimeout(() => {

                dispatch(addAlert(initialState.alert))
                
            }, 2000);
        }

    },[dispatch,alert])

   
    const RenderAlert = () => {

        if(alert.message !== ""){
        
           return (
        
            <div className={alert.class}>
                <p>{alert.message}</p>
            </div>
            )
        }
    }

    return(

        <div>{RenderAlert()}</div>
    )
}


export default Alert