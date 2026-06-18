import { createContext, useContext, useEffect, useState } from 'react';



const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({ id: 1, name: 'Laercio' });

	return (
		<UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Erro('useUser must be a valid context');
	}

	return context;
};
