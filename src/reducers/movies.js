import {types} from "../constants";

const initialState = {
    isLoading:  false,
    data: null,
    error: null
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
    case types.FETCH_MOVIES_REQUEST:
        return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
        }
    case types.FETCH_MOVIES_SUCCESS:
        return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
        }
    case types.FETCH_MOVIES_FAILURE:
        return {
        ...state,
        isLoading: false,
        data: null,
        error: action.data,
        }
    default:
        return state
    }
}

export { moviesReducer };