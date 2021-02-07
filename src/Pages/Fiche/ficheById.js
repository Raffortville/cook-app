import React from 'react'
import {useDispatch} from 'react-redux'
import {setSearchMode} from '../../Store/modules/searchStore'
import Table from '../../Components/Table/Table'


const FicheById = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {

        dispatch(setSearchMode(false))

    },[dispatch])

    return(

        <div style={{height:"90vh"}} >
            <Table/>
        </div>
    )
}

export default FicheById