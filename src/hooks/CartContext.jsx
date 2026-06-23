import { useContext, createContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
	const [cartProducts, setCartProducts] = useState([]);

	const putProductInCart = () => {};

	const clearCart = () => {};

	const deleteProducts = (product) => {};

	const increaseProduct = (productId) => {};

	const decreaseProducts = (productId) => {};

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

    if(!context){
        throw new Error('useCart must be used with a context')
    }

    return context
};
