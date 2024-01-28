import { createContext } from "react";

export type AuthDataType = {
  isAuth: boolean;
  token: string;
}

export type AuthContextType = {
  auth: AuthDataType;
  setAuth: (auth: AuthDataType) => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: { isAuth: false, token: "" },
  setAuth: () => { },
})

export default AuthContext