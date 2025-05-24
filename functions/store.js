import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../functions/counterReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
