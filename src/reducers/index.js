import { combineReducers } from 'redux';
import {
    moviesReducer
} from './movies';

const Reducers = combineReducers({
    MoviesState: moviesReducer
});

export default Reducers;