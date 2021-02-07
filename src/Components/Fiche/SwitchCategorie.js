import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Switch} from '@material-ui/core'
import {searchBySelector,selectSearchType} from '../../Store/modules/searchStore'
import {searchByField} from '../../Constants'


const SwitchCategorie = () => {

    const dispatch = useDispatch()

    const searchBy = useSelector(searchBySelector)

    return(
        <div className="wrapCategorie textPrimary">
            {searchByField.map((item,index) =>

                <div key={index} className="wrapSelect">
                    <p>{item.title}</p>
                    <div >
                        <Switch checked={searchBy[item.type]} name={item.type} size="small" onChange={()=>dispatch(selectSearchType(item.type))}/>
                    </div>
                </div>
            )}
        </div>
    )
}


export default SwitchCategorie