import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../Button';
import { Container } from './styles';

export function CartResume() {
	const [finalPrice, setFinalPrice] = useState(0);
	const [deliveyTax] = useState(500);

	const navigate = useNavigate();

	const { cartProducts, clearCart } = useCart();

	useEffect(() => {
		const sumAllItems = cartProducts.reduce((acc, current) => {
			return current.price * current.quantity + acc;
		}, 0);

		setFinalPrice(sumAllItems);
	}, [cartProducts]);

	const submitOrder = async () => {
		const products = cartProducts.map((product) => {
			return {
				id: product.id,
				quantity: product.quantity,
				price: product.price,
			};
		});

		try {
			const { data } = await api.post('/create-payent-intent', { products });

			navigate('/checkout', {
				state: data,
			})

		} catch (_error) {
			toast.error('Erro, tente novamente!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}

		// try {
		// 	const { status } = await api.post(
		// 		'/Orders',
		// 		{ products },
		// 		{
		// 			validateStatus: () => true,
		// 		},
		// 	);

		// 	if (status === 200 || status === 201) {
		// 		setTimeout(() => {
		// 			navigate('/');
		// 		}, 2000);
		// 		clearCart();
		// 		toast.success('Pedido realizado com sucesso!');
		// 	} else if (status === 409) {
		// 		toast.error('Falha ao realizar seu pedido');
		// 	} else {
		// 		throw new Error();
		// 	}
		// } catch {
		// 	toast.error('😭 Falha no Sistema! Tente novamente');
		// }
	};

	return (
		<div>
			<Container>
				<div className="container-top">
					<h2 className="title">Resum do Pedido</h2>
					<p className="items">Itens</p>
					<p className="items-prices">{formatPrice(finalPrice)}</p>
					<p className="delivery-tax">Taxa de Entrega</p>
					<p className="delivery-tax-price">{formatPrice(deliveyTax)}</p>
				</div>
				<div className="container-bottom">
					<p>Total</p>
					<p>{formatPrice(finalPrice + deliveyTax)}</p>
				</div>
			</Container>
			<Button onClick={submitOrder}>Finalizar Pedido</Button>
		</div>
	);
}
