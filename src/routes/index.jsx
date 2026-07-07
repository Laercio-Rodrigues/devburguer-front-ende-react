import { Route, Routes } from 'react-router-dom';

import {
	Admin,
	Cart,
	Checkout,
	CompletePayment,
	Home,
	Login,
	Menu,
	Register,
} from '../containers';
import { AdminLayout } from '../layouts/AdminLayout';
import { UseLayout } from '../layouts/UseLayout';

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<UseLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/cardapio" element={<Menu />} />
				<Route path="/carrinho" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/complete" element={<CompletePayment />} />
			</Route>
			<Route path="admin" element={<AdminLayout />}>
				<Route path="/admin/home" element={<Admin />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/cadastro" element={<Register />} />
		</Routes>
	);
}
