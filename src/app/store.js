import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore, persistReducer, FLUSH, REHYDRATE,
  PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import masterReducer from '../features/master/masterSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  master: masterReducer,   // master NOT persisted (re-fetch on login)
})

const persistedReducer = persistReducer({
  key: 'root',
  storage: storage.default || storage,
  whitelist: ['auth'],  // only auth survives page refresh
}, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
})

export const persistor = persistStore(store)