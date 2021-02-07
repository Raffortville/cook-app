import React from 'react'
import Navigation from './Navigation'
import {IconButton} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

const Drawer = (props) => {

    return(
        <div className="drawerWrap">
            <div>
                <p className="h3 textPrimary">COOK APP</p>
            </div>
            <div className="drawerWrapMenu">
                <Navigation/>
                <div className="drawerWrapIcon"> 
                    <IconButton onClick={()=>props.close()}>
                        <Icon className="textMain">close</Icon>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}


export default Drawer