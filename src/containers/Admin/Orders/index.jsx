import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Row } from './row';

function createData(order) {
	return {
		name: order.user.name,
		orderId: order._id,
		date: order.createdAt,
		status: order.status,
		products: order.products,
	};
}

export function Orders() {
	const [orders, setOrders] = useState([]);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		async function loadOrders() {
			const { data } = await api.get('Orders');

			setOrders(data);

			console.log(data);
		}

		loadOrders();
	}, []);
	

	useEffect(() => {
		const newRows = orders.map((order) => createData(order));

		setRows(newRows);
	}, [orders]);

	// const rows = [

	// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
	// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
	// 	createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
	// 	createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
	// 	createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
	// ];

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Pedido</TableCell>
						<TableCell>Cliente</TableCell>
						<TableCell>Data do Pedido</TableCell>
						<TableCell>Status</TableCell>
						
					</TableRow>
				</TableHead>
				<TableBody>
					{/* {rows.map((row) => (
						<Row key={row._id} row={row} />
					))} */}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
