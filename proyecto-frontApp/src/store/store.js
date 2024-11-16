import { configureStore, combineReducers } from '@reduxjs/toolkit'

// *-- Slices...
import { authSlice } from './auth'

// @dev-note: Aquí se unifican todos los reducers para facilitar su uso en la configuracion del store.
const rootReducers = combineReducers({
    auth: authSlice.reducer,
});

const appReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
    }

    return rootReducers(state, action);
}


const store = configureStore({
    reducer: appReducer,
})


export {
    store
}