import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import '../header/module.topHeader.scss'
import Icon from '@material-ui/core/Icon'
import {IconButton} from "@material-ui/core"
import {navFieldIn,navFieldOut} from '../../Constants'
import {setEditFicheForm} from '../../Store/modules/formStore'
import {initialState} from '../../Store/modules/ficheStore'
import {userLogSelector} from '../../Store/modules/userStore'

const Navigation = (props) => {

    let history = useHistory()

    const dispatch = useDispatch()
   
    const userLog = useSelector(userLogSelector)

    const [navField,setNavField] = useState([])

    const {className} = props

    useEffect(() => {
        
        !userLog ? setNavField(navFieldOut) : setNavField(navFieldIn)
        
    },[userLog])

    const handleLinksAction = (field) => {

       if(field.link === "/formFiche"){
        
        dispatch(setEditFicheForm(initialState.fiche))
       }

       history.push(field.link)
    }

    return(
        <nav>
            <ul className={className ? className : ''} >
                {navField.map((field,index) => 
                
                <li onClick={()=>handleLinksAction(field)} className="p2 textSecondary" key={index}>
                    <span>
                        <IconButton style={{marginBottom:"5px"}} color="inherit">
                            <Icon fontSize="small">{field.icon}</Icon>
                        </IconButton>
                    </span>
                   <span style={{cursor:"pointer"}}> {field.name} </span>
                </li>
                )}
            </ul>
        </nav>
    )
}

export default Navigation