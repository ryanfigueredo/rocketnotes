import { RiArrowLeftLine } from 'react-icons/ri';
import { Container, Form, Section } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { MovieTag } from '../../components/MovieTag';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../services/api';

export function NewMovie() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState(0);

	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState('');

	const navigate = useNavigate();

	async function handleNewMovie(e) {
		e.preventDefault();

		if (!title || !description || !tags.length) {
			alert('Por favor, preencha todos os campos');
			return;
		}

		if (isNaN(rating) || rating < 1 || rating > 5) {
			alert('Por favor, preencha o campo "Avaliação" com um número entre 1 e 5');
			return;
		}

		if (
			tags.length > 5 ||
			!tags.every((tag) => typeof tag === 'string' && tag.length > 0 && tag.length <= 20)
		) {
			alert(
				'Por favor, preencha o campo "Tags" com até 5 tags separadas por vírgulas, cada uma com uma string de 1 a 10 caracteres'
			);
			return;
		}

		const { movie } = await api.post('/movies', {
			title,
			description,
			rating,
			tags,
		});

		alert('Filme cadastrado com sucesso!');
		navigate('/');
	}

	function handleAddTag(e) {
		e.preventDefault();

		if (tags.length === 5) {
			alert('Adicione até 5 tags.');
			return;
		}

		setTags((prevState) => [...prevState, newTag]);
		setNewTag('');
	}

	function handleRemoveTag(e, deletedTag) {
		e.preventDefault();
		setTags((prevState) => prevState.filter((tag) => tag !== deletedTag));
	}

	return (
		<Container>
			<Header />
			<main>
				<Link to='/'>
					<p>
						<RiArrowLeftLine />
						Voltar
					</p>
				</Link>
				<Form>
					<h2>Novo filme</h2>
					<Input
						placeholder='Título'
						type='text'
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						placeholder='Sua nota (de 1 a 5)'
						type='number'
						min='0'
						max='5'
						onChange={(e) => setRating(e.target.value)}
					/>
					<TextArea
						placeholder='Descreva o filme'
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Section>
						<span>Marcadores</span>
						<div id='tags'>
							{tags.map((tag, index) => (
								<MovieTag
									key={String(index)}
									value={tag}
									isNew={false}
									onClick={(e) => handleRemoveTag(e, tag)}
								/>
							))}
							<MovieTag
								placeholder='Adicione um marcador'
								value={newTag}
								isNew={true}
								onChange={(e) => setNewTag(e.target.value)}
								onClick={handleAddTag}
							/>
						</div>
					</Section>
					<Button
						title='Cancelar'
						id='cancel-btn'
						onClick={(e) => navigate('/')}
					/>
					<Button
						title='Salvar alterações'
						onClick={(e) => handleNewMovie(e)}
					/>
				</Form>
			</main>
		</Container>
	);
}
