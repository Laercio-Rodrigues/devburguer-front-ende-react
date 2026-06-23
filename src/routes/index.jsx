import { createBrowserRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Cart } from '../containers/Cart';
import { Home } from '../containers/home';
import { Login } from '../containers/Login';
import { Menu } from '../containers/Menu';
import { Register } from '../containers/Register';
export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<Header />
				<Home />
				<Footer />
			</>
		),
	},
	{
		path: '/Login',
		element: <Login />,
	},
	{
		path: '/cadastro',
		element: <Register />,
	},

	{
		path: '/cardapio',
		element: (
			<>
				<Header />
				<Menu />
			</>
		),
	},
	{
		path: '/carrinho',
		element: <Cart />,
	},
]);
