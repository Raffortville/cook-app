import React from 'react'
import '../Buttons/module.buttons.scss'
import Icon from '@material-ui/core/Icon'
import {Button,IconButton} from '@material-ui/core'


const ButtonsVal = (props) => {

    return(

        <div className="wrapButton">
            <div>
                <IconButton onClick={()=>props.close()}> 
                    <Icon  className="icon">close</Icon>
                </IconButton>
            </div>
            <div>
                <Button onClick={()=>props.setInitialState()} className="button"><p >ANNULER</p></Button>
                <Button onClick={()=>props.handleSubmit()} className="button"><p >VALIDER</p></Button>
            </div>
        </div>
    )
}


export default ButtonsVal