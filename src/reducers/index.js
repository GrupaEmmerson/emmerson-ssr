import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import locationReducer from './location_reducer';
import viewportReducer from './viewport_reducer';
import offersReducer from './offers_reducer';
import isLoadedReducer from './is_loaded_reducer';
import searchPropertiesReducer from './search_properties_reducer';
import searchReducer from './search_reducer';
import searchDataReducer from './search_data_reducer';
import rowsCountReducer from './rows_count_reducer';
import placesChangedReducer from './places_changed_reducer';
import searchLocationReducer from './search_location_reducer';


const rootReducer = combineReducers({
  form,
  location: locationReducer,
  viewport: viewportReducer,
  offers: offersReducer,
  isLoaded: isLoadedReducer,
  searchProperties: searchPropertiesReducer,
  rowsCount: rowsCountReducer,
  placesChanged: placesChangedReducer,
  search: searchReducer,
  searchData: searchDataReducer,
  searchLocation: searchLocationReducer
});

export default rootReducer;
