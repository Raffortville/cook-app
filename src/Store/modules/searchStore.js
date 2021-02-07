import {createSlice} from '@reduxjs/toolkit'

export const initialState = { 
    
    searchMode:false,

    searchBy: {cuisson:false,categorie:false,nom:true,typeSelected:"Nom de la fiche"},
}

const searchSlice = createSlice({

    name:"search",

    initialState,

    reducers: {

        setSearchMode:(state,{payload}) => {state.searchMode = payload},

        setSearchBy:(state,{payload}) => {state.searchBy = payload},
    }
});

export const selectSearchType = (payload) => dispatch => {

  
    if(payload === "nom"){

        dispatch(setSearchBy(initialState.searchBy))
    
    } else if(payload === "cuisson") {

     
     dispatch(setSearchBy({[payload]:true ,nom:false,categorie:false,typeSelected:"Mode de cuisson"}))
     

    } else {

     dispatch(setSearchBy({[payload]:true,nom:false,cuisson:false,typeSelected:"Catégorie"}))
     
    }
}


export const {setSearchBy,setSearchMode} = searchSlice.actions;

export const searchSelector = (state) => state.searchStore.searchMode;
export const searchBySelector = (state) => state.searchStore.searchBy;

export default searchSlice.reducer