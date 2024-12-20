import { createSlice } from '@reduxjs/toolkit';
import initialState from './initial';

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {

        setAuthPayload: (state, { payload }) => {
            return {
                ...state,
                authPayload: payload
            }
        },

        resetAuthPayload: (state, { payload }) => {
            return {
                ...state,
                authPayload: null
            }
        },


        setStatus: (state, { payload }) => {
            return {
                ...state,
                status: payload
            }
        },

        resetStatus: (state, { payload }) => {
            return {
                ...state,
                status: null
            }
        },
    }
});


// Exportación .
export const {
    //aqui va la carga de data
    setAuthPayload,
    resetAuthPayload,

    //estado de autentificacion
    setStatus,
    resetStatus
} = authSlice.actions;