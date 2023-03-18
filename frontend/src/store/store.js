import { configureStore } from '@reduxjs/toolkit'
import SideBarReducer from '../features/sidebar/SideBarSlice'
import DetailPreviewReducer from '../features/details/DetailPreviewSlice'
import LoadDataReducer from '../features/details/LoadDataSlice'

const store = configureStore({
    reducer: {
        sideBar: SideBarReducer,
        detailPreview: DetailPreviewReducer,
        loadData: LoadDataReducer,
    }
})

export default store;