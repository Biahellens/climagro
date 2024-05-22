import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "@models/User";
import { UserService } from "@services/userService";

const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
  handleLogin: (email: string, password: string) => Promise<User | null | undefined>;
  updateUserInfo: (updatedUser: User) => void;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<User | null | undefined> => {
    try {
      const response = await UserService.Login(email, password);
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response?.user);
        return response?.user
      }
    } catch (error) {
      throw new Error("Usuario ou senha inválidos");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);

    } catch (error) {
      console.log(error);
    }
  };

  const updateUserInfo = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
};

  const contextValue: UserContextProps = {
    user,
    setUser,
    handleLogin,
    handleLogout,
    updateUserInfo
  };

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext };
