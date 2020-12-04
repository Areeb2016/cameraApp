import {ADD_IMAGE, DELETE_IMAGE} from '../actions/types'

const initialState = {
    data:[]
}

const imageReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_IMAGE:
            return {
                ...state,
                data: state.data.concat({
                    key: Math.random(),
                    name: action.data
            })
        };
        case DELETE_IMAGE:
            return{
                ...state,
                data: state.data.filter((item) => item.key !== action.key)
            };
        default:
            return state;
    }
}

export default imageReducer;