import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
	const [cartProducts, setCartProducts] = useState([]);

	const putProductInCart = (product) => {
		/*
            Regras de Negócios

            - Produto chegou

            - SE SIM
                - Aumenta a quantidade dele

            - SE NÃO
                - Adicionar ele ao carrinho
         */

		const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);
		console.log(cartIndex);

		let newProductsInCart = [];

		if (cartIndex >= 0) {
			newProductsInCart = cartProducts;

			newProductsInCart[cartIndex].quantity =
				newProductsInCart[cartIndex].quantity + 1;

			setCartProducts(newProductsInCart);
		} else {
			product.quantity = 1;
			newProductsInCart = [...cartProducts, product];
			setCartProducts(newProductsInCart);
		}

		updateLocalStorage(newProductsInCart);
	};

	const clearCart = () => {};

	const deleteProducts = (productId) => {
		const newCart = cartProducts.filter((prd) => prd.id !== productId);

		setCartProducts(newCart);
		updateLocalStorage(newCart);
	};

	const increaseProduct = (productId) => {
		const newCart = cartProducts.map((prd) => {
			return prd.id === productId
				? { ...prd, quantity: prd.quantity + 1 }
				: prd;
		});

		setCartProducts(newCart);
		updateLocalStorage(newCart);
	};

	const decreaseProducts = (productId) => {
		/*
            Encontrar o item -> Tirar 1 de quantidade
            SE o item for igual 1 de quantity
                - Não fazer NADA
                - Deletar o produto do carrinho        
        */

		const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

		if (cartProducts[cartIndex].quantity > 1) {
			const newCart = cartProducts.map((prd) => {
				return prd.id === productId
					? { ...prd, quantity: prd.quantity - 1 }
					: prd;
			});

			setCartProducts(newCart);
			updateLocalStorage(newCart);
		} else {
			deleteProducts(productId);
		}
	};

	const updateLocalStorage = (products) => {
		localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
	};
	useEffect(() => {
		const clientCartData = localStorage.getItem('devburger:cartInfo')

        if(clientCartData){
            setCartProducts(JSON.parse(clientCartData))
        }
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				putProductInCart,
				clearCart,
				deleteProducts,
				increaseProduct,
				decreaseProducts,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used with a context');
	}

	return context;
};
