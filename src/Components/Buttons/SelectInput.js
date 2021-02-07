import React from 'react'
import {Select,MenuItem,InputLabel} from '@material-ui/core'

const SelectInput = (props) => {

    return(

        <div style={{width:"150px"}} >
            
            <InputLabel>{props.name}</InputLabel>
            <Select fullWidth name={props.name} onChange={(e)=>props.handleOnChange(e)} value={props.state}>
                {props.array.map((nom,index) =>
                    <MenuItem value={nom} key={index}>{nom}</MenuItem>
                )}
            </Select>
        </div>
    )
}


export default SelectInput