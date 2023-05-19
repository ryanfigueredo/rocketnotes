import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({});

function AuthProvider({ children }) {
	const [data, setData] = useState({});

	async function signIn({ email, password }) {
		try {
			const res = await api.post('sessions', {
				email,
				password,
			});

			const { user, token } = res.data;
			const { name, avatar } = user;
			localStorage.setItem('@rocketmovies:user', JSON.stringify({ name, email, avatar }));
			localStorage.setItem('@rocketmovies:token', token);

			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			setData({ user, token });
		} catch (err) {
			alert(err.response.data.error);
		}
	}

	function signOut() {
		localStorage.removeItem('@rocketmovies:user');
		localStorage.removeItem('@rocketmovies:token');

		setData({});
	}

	async function updateProfile({ user, profileImgFile }) {
		try {
			if (profileImgFile) {
				const formData = new FormData();
				formData.append('avatar', profileImgFile);

				const response = await api.patch('users/avatar', formData);
				user.avatar = response.data.avatar;
			}
			await api.put('users', user);
			const { name, email, avatar } = user;

			localStorage.setItem('@rocketmovies:user', JSON.stringify({ name, email, avatar }));
			localStorage.setItem('@rocketmovies:token', data.token);
			setData({ user, token: data.token });

			alert('Perfil atualizado com sucesso!');
		} catch (err) {
			alert(err.response.data.error);
		}
	}

	useEffect(() => {
		const user = localStorage.getItem('@rocketmovies:user');
		const token = localStorage.getItem('@rocketmovies:token');

		if (user && token) {
			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			setData({ user: JSON.parse(user), token });
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				updateProfile,
				user: data.user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth };
