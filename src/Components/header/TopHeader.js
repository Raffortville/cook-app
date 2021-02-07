import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import {Link,useHistory} from 'react-router-dom'
import "../header/module.topHeader.scss"
import {Avatar,IconButton} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import {searchSelector} from '../../Store/modules/searchStore'
import {userSelector,userLogSelector} from '../../Store/modules/userStore'
import Navigation from './Navigation'
import Drawer from './Drawer'
import SearchBar from './SearchBar'

const TopHeader = () => {  

    const history = useHistory()

    const searchMode = useSelector(searchSelector)

    const user = useSelector(userSelector)

    const userLog = useSelector(userLogSelector)

    const [openDrawer,setOpenDrawer] = useState(false)

    const handleToggleDrawer = () => !openDrawer ? setOpenDrawer(true) : setOpenDrawer(false);

    return(
        
        <header>
            {openDrawer && <Drawer close={handleToggleDrawer}/>}
            <div className="logoTitre">
                <div>{!openDrawer &&

                    <IconButton onClick={()=> handleToggleDrawer()}>
                        <Icon className="textMain">menu</Icon>
                    </IconButton>
                }
                </div>
                <div>
                    {!openDrawer && <Link className="removeLinkStyle" to="/"><p className="h3 textPrimary">COOK APP</p></Link>}  
                </div>
            </div>
            <div className="navWrap">
                { searchMode && <SearchBar/>}
                { userLog && 
                <div className="borderButton">  
                    <IconButton  onClick={()=> history.push('/search')}>
                        <Icon>search</Icon>
                    </IconButton>
                </div>
                }
                <div>
                    <Navigation/>   
                </div>
                {user.username !== "" && 

                    <Link className="removeLinkStyle" to="/profil">
                        <div className="wrapName">
                            <p className="p2">{user.username}</p>
                        </div>
                    </Link>
                }
                <div className="avatarWrap">
                    <Link to="/profil">
                        {user.avatar !== "" ?
                        
                            <img className="imgAvatar" alt='/' src={user.avatar}/> :
                            <Avatar className="avatarSmall"></Avatar>
                        }
                    </Link>
                </div>
            </div>
        </header>
    )
}


export default TopHeader