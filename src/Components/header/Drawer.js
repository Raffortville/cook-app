import React from 'react'
import Navigation from './Navigation'
import {IconButton} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

import "../header/module.topHeader.scss"    

const Drawer = (props) => {

    const {openDrawer} = props

    return(
        <div className={`drawerWrap ${openDrawer ? 'open' : ''}`}>
            {openDrawer &&
                <>
                    <div>
                        <p className="h3 textPrimary" style={{padding:"12px"}}>COOK APP</p>
                    </div>
                        <Navigation/>
                    <div className="drawerWrapIcon"> 
                        <IconButton onClick={()=>props.close()}>
                            <Icon className="textMain">close</Icon>
                        </IconButton>   
                    </div>
             </>
            }
        </div>
    )
}


export default Drawer