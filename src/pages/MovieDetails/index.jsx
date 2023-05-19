import { Container, Info } from './styles';
import { Header } from '../../components/Header';
import { Tag } from '../../components/Tag';
import {
	RiArrowLeftLine,
	RiStarFill,
	RiStarLine,
	RiTimeLine,
	RiDeleteBin2Fill,
} from 'react-icons/ri';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

export function MovieDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState(null);

	const user = JSON.parse(localStorage.getItem('@rocketmovies:user')) || {};
	const { name, avatar } = user;

	async function handleDeleteMovie() {
		const confirm = window.confirm('Deseja realmente excluir este filme?');

		if (confirm) {
			try {
				await api.delete(`/movies/${id}`).then(() => {
					setData(null);
					navigate('/');
				});
			} catch (err) {
				console.log(err.response.data.error);
			}
		} else {
			return alert('Operação cancelada');
		}
	}

	useEffect(() => {
		async function getMovie() {
			try {
				const response = await api.get(`/movies/${id}`);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		}

		getMovie();
	}, [id]);

	if (data === null) {
		return <div>Carregando...</div>;
	}

	const { title, rating, tags, description } = data;

	function getStars(rating) {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < rating) {
				stars.push(<RiStarFill key={i} />);
			} else {
				stars.push(<RiStarLine key={i} />);
			}
		}
		return stars;
	}

	return (
		<Container>
			<Header />
			{data && (
				<main>
					<Info>
						<div className='actions'>
							<Link to='/'>
								<p>
									<RiArrowLeftLine />
									Voltar
								</p>
							</Link>
							<Button
								title='Excluir filme'
								icon={RiDeleteBin2Fill}
								onClick={handleDeleteMovie}
							/>
						</div>

						<div id='movie-info'>
							<h1>{title}</h1>
							<div id='rating'>{getStars(rating)}</div>
						</div>

						<div id='created-by'>
							<p>
								<img
									src={avatar ? `${api.defaults.baseURL}/files/${avatar}` : avatarPlaceholder}
									alt='foto de perfil do usuario'
								/>
								Por {name}
							</p>
							<p>
								<RiTimeLine />
								{new Date().toLocaleTimeString('pt-BR', {
									day: 'numeric',
									month: 'long',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
					</Info>

					<div id='tags'>
						{tags.map((tag) => (
							<Tag
								key={tag.id}
								title={tag.name}
							/>
						))}
					</div>
					<p id='movie-summary'>{description}</p>
				</main>
			)}
		</Container>
	);
}
