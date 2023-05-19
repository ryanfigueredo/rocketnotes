import { Container, Form } from './styles';
import { RiArrowLeftLine, RiCameraLine, RiMailLine, RiUserLine, RiLockLine } from 'react-icons/ri';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { api } from '../../services/api';

export function Profile() {
	const { user, updateProfile } = useAuth();

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [newPassword, setNewPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');

	const avatarUrl = user.avatar
		? `${api.defaults.baseURL}/files/${user.avatar}`
		: avatarPlaceholder;
	const [profileImg, setProfileImg] = useState(avatarUrl);
	const [profileImgFile, setProfileImgFile] = useState(null);

	async function handleUpdate(e) {
		e.preventDefault();

		const newInfo = {
			name,
			email,
			old_password: currentPassword,
			password: newPassword,
		};

		const updatedUser = Object.assign(user, newInfo);

		await updateProfile({ user: updatedUser, profileImgFile });
	}

	async function handleChangeAvatar(e) {
		const file = e.target.files[0];
		setProfileImgFile(file);

		setProfileImg(URL.createObjectURL(file));
	}

	return (
		<Container>
			<header>
				<Link to='/'>
					<p>
						<RiArrowLeftLine />
						Voltar
					</p>
				</Link>
			</header>
			<Form>
				<div className='image-container'>
					<img
						src={profileImg}
						alt='Foto de perfil'
					/>
					<label htmlFor='profile-img'>
						<RiCameraLine />
						<input
							type='file'
							id='profile-img'
							onChange={handleChangeAvatar}
						/>
					</label>
				</div>

				<Input
					placeholder='Nome'
					type='text'
					icon={RiUserLine}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder='E-mail'
					type='email'
					icon={RiMailLine}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder='Senha atual'
					type='password'
					icon={RiLockLine}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<Input
					placeholder='Nova senha'
					type='password'
					icon={RiLockLine}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<Button
					title='Salvar'
					type='submit'
					onClick={handleUpdate}
				/>
			</Form>
		</Container>
	);
}
