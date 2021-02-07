import React from 'react'
import './module.socialButton.scss'
import Icon from '@material-ui/core/Icon'

const SocialButtons = (props) => {

    return(

        <div>
            <div className="wrapButtonGoogle" onClick={()=>props.handleLog("Gg")}>
                <span className="iconButtonGoogle"></span>
                <div className="wrapText">
                    <span className="textGoogle"> SIGNUP WITH GOOGLE</span>
                </div>
            </div>
            <div style={{width:"100%"}}>
                <p style={{textAlign:"center"}}>ou</p>
            </div>
            <div className="wrapButtonFb" onClick={()=>props.handleLog("Fb")}>
                <Icon className="iconFb" fontSize="large">facebook</Icon>
                <div className="wrapText">
                    <span className="textFb"> SIGNUP WITH FACEBOOK</span>
                </div>
            </div>
        </div>
    )
}


export default SocialButtons