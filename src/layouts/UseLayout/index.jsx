import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';

export function UseLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
