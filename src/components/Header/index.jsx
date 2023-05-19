import { Container, Profile } from './styles';
import { Input } from '../../components/Input';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { useState } from 'react';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

export function Header(props) {
	const { signOut, user } = useAuth();
	const [search, setSearch] = useState('');

	const avatarUrl = user.avatar
		? `${api.defaults.baseURL}/files/${user.avatar}`
		: avatarPlaceholder;

	function handleSearch(e) {
		setSearch(e.target.value);
		props.onSearch(e.target.value);
	}

	return (
		<Container>
			<Link to='/'>
				<span>RocketMovies</span>
			</Link>
			<Input
				placeholder='Pesquisar por título'
				type='search'
				value={search}
				onChange={(e) => handleSearch(e)}
			/>
			<Profile>
				<div>
					<p>{user.name}</p>
					<a
						href='/'
						onClick={signOut}
					>
						Sair
					</a>
				</div>
				<Link to='/profile'>
					<img
						src={avatarUrl}
						alt='Foto de perfil'
					/>
				</Link>
			</Profile>
		</Container>
	);
}
