import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';

export default function CheckoutForm() {
	const Navigate = useNavigate();
	const { cartProducts, clearCart } = useCart();
	const stripe = useStripe();
	const elements = useElements();
	const {
		state: { dpmCheckerLink },
	} = useLocation();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			console.error('Stripe ou Elements com falha, tente novamente');
			return;
		}

		setIsLoading(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		});

		if (error) {
			if (error.type === 'card_error' || error.type === 'validation_error') {
				setMessage(error.message);
				toast.error(error.message);
			} else {
				setMessage('An unexpected error occurred.');
			}
		} else if (paymentIntent && paymentIntent.status === 'succeeded') {
			setMessage('Pagamento aprovado com sucesso!');

			try {
				const products = cartProducts.map((product) => {
					return {
						id: product.id,
						quantity: product.quantity,
						price: product.price,
					};
				});

				const { status } = await api.post(
					'/Orders',
					{ products },
					{
						validateStatus: () => true,
					},
				);

				if (status === 200 || status === 201) {
					setTimeout(() => {
						Navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
						clearCart();
					}, 3000);
					clearCart();
					toast.success('Pedido realizado com sucesso!');
				} else if (status === 409) {
					toast.error('Falha ao realizar seu pedido');
				} else {
					throw new Error();
				}
			} catch {
				toast.error('😭 Falha no Sistema! Tente novamente');
			}
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'accordion',
	};

	return (
		<div className="container">
			<form id="payment-form" onSubmit={handleSubmit}>
				<PaymentElement id="payment-element" options={paymentElementOptions} />
				<button
					type="submit"
					disabled={isLoading || !stripe || !elements}
					id="submit"
					className="button"
				>
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner"></div>
						) : (
							'Pagar Agora'
						)}
					</span>
				</button>
				{message && <div id="payment-message">{message}</div>}
				{dpmCheckerLink && (
					<div id="dpm-annotation">
						<p className="descrition">
							Os métodos de pagamento são disponibilizados de acordo com a sua
							região.{' '}
							<a
								href={dpmCheckerLink}
								target="_blank"
								rel="noopener noreferrer"
								id="dpm-integration-checker"
							>
								Ver métodos de pagamento
							</a>
						</p>
					</div>
				)}
			</form>
		</div>
	);
}
