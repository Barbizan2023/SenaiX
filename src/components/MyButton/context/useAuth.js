import AsyncStorage from "@react-native-community/async-storage";
import { Children, createContext, useState, useEffect, useCallback } from "react";
import { api } from "../../../services/api";


const AuthContext = createContext({});

export default AuthProvider = ({children}) => {
    const [data, setData] = useState();


    useEffect(() => {
        async function loadStorageData(){
        

            const[token, user]= await AsyncStorage.multiGet([
                "@senaiX:token",
                "@senaiX:user",
            ]);
            if(token[1] && user[1]){
                api.defaults.headers.authorization= 'Bearer ${token[1]}';
                setData({token: token[1], user: JSON.parse(user[1])});

            }

        }
        loadStorageData()
        const signIn = useCallback(async ({email, password}) => {
            const response = api.post("login", {email, password});
            const {token, user} = response.data;
            await AsyncStorage.multiSet([
                ["@SenaiX:token", token],
                ["@SenaiX:user", JSON.stringify(user)],
            ]);
        },[]);

        const singOut  = useCallback(async () => {
            await AsyncStorage.multiRemove([
                "@SenaiX:token",
                "@SenaiX:user",
            ]) 
            setData({});
    }, []);

    return (
        <AuthContext.Provider value={{...data, signIn, singOut}}>
            {children}
        </AuthContext.Provider>
    );

  });
};

export const useAuth = () => useContext(AuthContext);