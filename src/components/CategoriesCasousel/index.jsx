import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function CategoriesCarousel() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');

			console.log(response);

			setCategories(data);
			console.log(data);
		}

		loadCategories();
	}, []);

	return (
		<div>
			<h1>Ok</h1>
		</div>
	);
}
