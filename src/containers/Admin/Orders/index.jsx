import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { orderStatusOptions } from './orderStatus';
import { Row } from './row';
import { Filter, FilterOptions } from './styles';

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
	const [orders, setOrders] = useState([]); // BACKUP
	const [filterredOrders, setFilterredOders] = useState([]); // OS VALORES QUE ESTÃO NA TELA
	const [activeStatus, setActiveStatus] = useState(0);

	const [rows, setRows] = useState([]);

	useEffect(() => {
		async function loadOrders() {
			const { data } = await api.get('Orders');

			setOrders(data);
			setFilterredOders(data);

			console.log(data);
		}

		loadOrders();
	}, []);

	useEffect(() => {
		const newRows = filterredOrders.map((order) => createData(order));

		setRows(newRows);
	}, [filterredOrders]);

	function handleStatus(status) {
		if (status.id === 0) {
			setFilterredOders(orders);
		} else {
			const newOrders = orders.filter((order) => order.status === status.value);

			setFilterredOders(newOrders);
		}

		setActiveStatus(status.id)
	}

	return (
		<>
			<Filter>
				{orderStatusOptions.map((status) => (
					<FilterOptions 
					key={status.id} 
					onClick={() => handleStatus(status)}
					$isActiveStatus={activeStatus === status.id}
					>
						{status.label}
					</FilterOptions>
				))}
			</Filter>
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
						{rows.map((row) => (
							<Row
								key={row.orderId}
								row={row}
								orders={orders}
								setOrders={setOrders}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
