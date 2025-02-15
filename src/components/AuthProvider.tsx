import { createContext, ReactNode, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser as UserInfo } from "../../ts/types";
import {
  setUserInfo as setUserAction,
  setToken as setTokenAction,
  RootState, AppDispatch
} from "../../ts/redux";

interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  setUser: (user: UserInfo | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const token = useSelector((state: RootState) => state.user.token);
  
  const dispatch: AppDispatch = useDispatch();

  const setUser = (user: UserInfo | null) => {
    if (user) dispatch(setUserAction(user));
  };

  const setToken = (token: string | null) => {
    if (token) dispatch(setTokenAction(token));
  };

  const logout = () => {
    dispatch(setUserAction(null));
    dispatch(setTokenAction(null));
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
