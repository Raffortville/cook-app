import React from 'react'
import {Dialog,DialogContent,DialogActions} from '@material-ui/core'
import ButtonsVal from '../Buttons/ButtonsVal'

const DialogConfirm = (props) => {

    return(

        <div>
            <Dialog open={true}>
                <DialogContent>
                   <p className="p1">{props.titre}</p>
                </DialogContent>
                <DialogActions>
                    <div className="width100">
                        <ButtonsVal close={props.close} handleSubmit={props.handleSubmit} setInitialState={props.setInitialState}/>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default DialogConfirm