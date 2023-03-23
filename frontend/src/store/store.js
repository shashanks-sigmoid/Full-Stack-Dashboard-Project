import { configureStore, combineReducers } from '@reduxjs/toolkit';
import SideBarReducer from '../features/sidebar/SideBarSlice';
import DetailPreviewReducer from '../features/details/DetailPreviewSlice';
import LoadDataReducer from '../features/details/LoadDataSlice';
import SignInReducer from '../features/user/SignInSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
  } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['sideBar','detailPreview','loadData'],
}

const rootReducer = combineReducers({
    sideBar: SideBarReducer,
    detailPreview: DetailPreviewReducer,
    loadData: LoadDataReducer,
    signIn: SignInReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store);