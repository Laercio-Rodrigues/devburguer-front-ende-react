import { createBrowserRouter } from 'react-router-dom';
import { Header } from '../components/Header';
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
		element: <Menu />,
	},
]);
