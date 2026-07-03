import { Elements } from '@stripe/react-stripe-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import stripePromise from './config/stripeConfig';
import AppProvider from './hooks';
import { router } from './routes';
import GlbalStyles from './styles/globalStyles';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProvider>
			<Elements stripe={stripePromise}>
			<RouterProvider router={router} />
			</Elements>
			<GlbalStyles />
			<ToastContainer autoClose={2000} theme="colored" />
		</AppProvider>
	</StrictMode>,
);
