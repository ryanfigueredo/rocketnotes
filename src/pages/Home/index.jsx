import { Container } from './styles';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { MovieCard } from '../../components/MovieCard';
import { RiAddFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function Home() {
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState('');

	const navigate = useNavigate();

	function handleDetails(id) {
		navigate(`/movies/${id}`);
	}

	function handleSearch(query) {
		setSearch(query);
	}

	useEffect(() => {
		async function getMovies() {
			const { data } = await api.get('/movies');
			setMovies(data);
		}
		getMovies();
	}, []);

	useEffect(() => {
		const filtered = movies.filter((movie) =>
			movie.title.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredMovies(filtered);
	}, [movies, search]);

	return (
		<Container>
			<Header onSearch={handleSearch} />
			<main>
				<header>
					<h1>Meus filmes</h1>
					<Link to='/new-movie'>
						<Button
							title='Adicionar Filme'
							icon={RiAddFill}
						/>
					</Link>
				</header>
				<section className='movies'>
					{filteredMovies.map((movie) => (
						<MovieCard
							key={String(movie.id)}
							data={movie}
							onClick={() => handleDetails(movie.id)}
						/>
					))}
				</section>
			</main>
		</Container>
	);
}
