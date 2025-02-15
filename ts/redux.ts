import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { IUser as UserInfo } from './types';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";


const SET_USER_INFO = 'SET_USER_INFO';
const SET_TOKEN = 'SET_TOKEN';

// Define action interfaces
interface SetUserInfoAction {
    type: typeof SET_USER_INFO;
    payload: UserInfo | null;
}

interface SetTokenAction {
    type: typeof SET_TOKEN;
    payload: string | null;
}

type UserActionTypes = SetUserInfoAction | SetTokenAction;

interface UserState {
    userInfo: UserInfo | null;
    token: string | null;
}

const initialUserState: UserState = {
    userInfo: null,
    token: null,
};

const userReducer = (state = initialUserState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
    user: persistedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }),
});

export const persistor = persistStore(store);

export const setUserInfo = (userInfo: UserInfo | null): SetUserInfoAction => ({
    type: SET_USER_INFO,
    payload: userInfo,
});

export const setToken = (token: string  | null): SetTokenAction => ({
    type: SET_TOKEN,
    payload: token,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;