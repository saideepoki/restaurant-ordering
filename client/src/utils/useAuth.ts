import {AuthContext} from "../components/AuthContext";
import {useContext} from 'react';

export const useAuth = () => useContext(AuthContext);