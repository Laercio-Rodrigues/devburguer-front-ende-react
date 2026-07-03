import PropTypes from 'prop-types';
import { useCart } from '../../hooks/CartContext';
import { CardButton } from '../CardButton';
import { CardImage, Container } from './styles';

export function CardProduct({ product }) {
	const { putProductInCart } = useCart();

	return (
		<Container>
			<CardImage src={product.url} alt={product.name} />
			<div>
				<p>{product.name}</p>
				<strong>{product.currencyValue}</strong>
			</div>
			<CardButton onClick={() => putProductInCart(product)}></CardButton>
		</Container>
	);
}

CardProduct.propTypes = {
	product: PropTypes.object,
};
