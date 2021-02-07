import {createSlice} from '@reduxjs/toolkit'

export const inititialStateForm = {  form: {}, editFicheForm:{} }

const formSlice = createSlice({

    name:"form",

    initialState: inititialStateForm,

    reducers:{

        createForm:(state,{payload}) => {state.form = payload},

        setEditFicheForm:(state,{payload}) => {state.editFicheForm = payload}
    }
})


export const {createForm,setEditFicheForm} = formSlice.actions;

export const formSelector = (state) => state.formStore.form;
export const editFicheFormSelector = (state) => state.formStore.editFicheForm;

export default formSlice.reducer

