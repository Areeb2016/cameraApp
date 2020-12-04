import {createStore, combineReducers} from 'redux'
import imageReducer from './reducers/imageReducer'

const rootReducer = combineReducers({
    imageReducer: imageReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;