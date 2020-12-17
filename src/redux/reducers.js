import { combineReducers } from 'redux';
import venueReducer from '../containers/venue/venueReducer';

const rootReducer = combineReducers({
    venue: venueReducer
});

export default rootReducer;