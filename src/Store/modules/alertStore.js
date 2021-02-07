import {createSlice} from '@reduxjs/toolkit'

export const initialState = { 

    alert: {message:"",class:""}, 

    loading:false,

}

const alertSlice = createSlice({

    name:"alert",

    initialState,

    reducers:{

        addAlert:(state,{payload}) => { state.alert = payload},

        setLoading:(state,{payload}) => {state.loading = payload},

    }
})



export const {addAlert,setLoading} = alertSlice.actions

export const alertSelector = (state) => state.alertStore.alert;
export const loadingSelector = (state) => state.alertStore.loading;


export default alertSlice.reducer