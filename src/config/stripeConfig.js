import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	'pk_test_51SUUnGPtb7nzY6BJpJbeopuJpYYLwRzzoQMwEBXab4SB4M18nmeJRsWlXGj8RSA8bgy5LqVljREafvX5NknrQwSh00jYvi38dP',
);

export default stripePromise;
