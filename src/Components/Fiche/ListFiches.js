import React,{useState} from "react"
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {selectFiche,fichesSearchSelector} from '../../Store/modules/ficheStore'
import {setEditFicheForm} from '../../Store/modules/formStore'
import './module.ListFiche.scss'
import {sortArrayByIndex} from '../../Utils'
import Dialog from '../Alert/Dialog'
import FicheCard from './ficheCard'
import Pagination from './Pagination'
import SwitchCategorie from './SwitchCategorie'


const ListFiches = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const [displayArr,setDisplayArr] = useState([])

    const fichesSearch = useSelector(fichesSearchSelector)

    let copyArr = [...fichesSearch]

    sortArrayByIndex(copyArr,"nom")

    const [showDialog,setShowDialog] = useState(false)

    const nbFiches = 4

    const nbPages = Math.ceil(copyArr.length / nbFiches)

    const [currentPage,setCurrentPage] = useState(1)

    const lastIndex = currentPage * nbFiches

    const firstIndex = lastIndex - nbFiches 

    const currentFiches = copyArr.slice(firstIndex,lastIndex)

    const handleDisplayArray = () => {

        fichesSearch.length <= nbFiches ? setDisplayArr(copyArr) : setDisplayArr(currentFiches)
    }

    React.useEffect(() => { 

        handleDisplayArray()

    },[fichesSearch,currentPage])


    const handleIconAction = (action,fiche) => {

        if(action === "voir"){

            dispatch(selectFiche(fiche))
            history.push(`fiche/${fiche.ficheId}`)
        }

        if(action === "modifier"){

            dispatch(setEditFicheForm(fiche))
            history.push('/formFiche');
        }

        if(action === "supprimer"){

            setShowDialog(true)
        }
    }

    const handleCurrentPage = (num) => setCurrentPage(num)

    const handleRemoveFiche = () => {

        console.log("test")
    }


    return(

        <div className="rowList">
            <SwitchCategorie/>
            <div className="outterListFiche">
                <div className='wrapListFiche'>  
                    {showDialog && <Dialog handleSubmit={handleRemoveFiche} setInitialState={()=> setShowDialog(false)} close={()=>setShowDialog(false)} titre={"Confirmez-vous la suppression ?"}/>} 
                    <ul>
                    {displayArr.map((fiche,index) =>
                        <li key={index}>
                            <FicheCard  handleIconAction={handleIconAction} fiche={fiche}/>
                        </li>
                    )}
                    </ul>
                </div>
                <Pagination nbPages={nbPages} handleCurrentPage={handleCurrentPage} currentPage={currentPage}/>
            </div>
        </div>
    )
}

export default ListFiches