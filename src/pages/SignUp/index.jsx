import { useState } from 'react';
import { Container, Form, Background } from '../SignIn/styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { RiMailLine, RiLockLine, RiUserLine } from 'react-icons/ri';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	function handleSignUp(e) {
		e.preventDefault();

		if (!name || !email || !password) {
			return alert('Preencha todos os campos');
		}

		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (!emailRegex.test(email)) {
			return alert('Endereço de email inválido');
		}

		const passwordRegex =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\;:'",.<>/?-]).{8,}$/;
		if (!passwordRegex.test(password)) {
			return alert(
				'Sua senha deve conter no mínimo 8 caracteres, conter um número, uma letra minúscula e uma maiúscula e um caractere especial.'
			);
		}

		api
			.post('/users', {
				name,
				email,
				password,
			})
			.then(() => {
				alert(`Usuário ${name} cadastrado com sucesso!`);
				navigate('/');
			})
			.catch((err) => {
				alert(err.response.data.error);
			});
	}

	return (
		<Container>
			<Form>
				<h1>RocketMovies</h1>
				<p>Aplicação para acompanhar tudo que assistir!</p>
				<p>Criar sua conta</p>
				<Input
					placeholder='Nome'
					type='text'
					icon={RiUserLine}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder='Email'
					type='email'
					icon={RiMailLine}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder='Senha'
					type='password'
					icon={RiLockLine}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					title='Cadastrar'
					onClick={handleSignUp}
				/>
				<a href='/'>Já possui uma conta? Faça login</a>
			</Form>
			<Background />
		</Container>
	);
}
