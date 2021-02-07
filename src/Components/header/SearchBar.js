import React,{useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {fichesSelector,setFichesSearch} from '../../Store/modules/ficheStore'
import {searchBySelector} from '../../Store/modules/searchStore'
import {addAlert} from '../../Store/modules/alertStore'
import TextField from '@material-ui/core/TextField';
import {categories,cuissons} from '../../Constants'
import SelectInput from '../Buttons/SelectInput'
import '../header/module.topHeader.scss'
import {capitalize} from '../../Utils'


const SearchBar = () => {

  const dispatch = useDispatch()

  const [state,setState] = useState({nom:"",categorie:"",cuisson:""})

  const fiches = useSelector(fichesSelector)

  const searchBy = useSelector(searchBySelector)

  let copyArr = [...fiches]

  const handleOnChange = (e) => {

    if(fiches.length === 0){

      dispatch(addAlert({message:"Veuillez créer une fiche !", class:"warning"}))
    }

    let arr = []

    const {value,name} = e.target;

    setState({...state,[name]:capitalize(value)})

    arr = copyArr.filter(fiche => fiche[name].includes(capitalize(value)))

    dispatch(setFichesSearch(arr)) 

  }


  const RenderSearchInput = () => {

    if(searchBy.cuisson){

      return( <SelectInput array={cuissons} handleOnChange={handleOnChange} name={"cuisson"} state={state.cuisson}/>)

    } else if(searchBy.categorie) {

      return(<SelectInput array={categories} handleOnChange={handleOnChange} name={"categorie"} state={state.categorie}/>)

    } else {

      return(
      <TextField
      label={searchBy.typeSelected}
      name="nom"
      value={state.nom}
      onChange={handleOnChange}
      />
      )
    }
  }
  
  return(
    <div> 

      {RenderSearchInput()}
      
    </div>
  )
}


export default SearchBar