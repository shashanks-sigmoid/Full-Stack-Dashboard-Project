import { configureStore } from '@reduxjs/toolkit'
import SideBarReducer from '../features/sidebar/SideBarSlice'
import DetailPreviewReducer from '../features/details/DetailPreviewSlice'

const store = configureStore({
    reducer: {
        sideBar: SideBarReducer,
        detailPreview: DetailPreviewReducer
    }
})

export default store;