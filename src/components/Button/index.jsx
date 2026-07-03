import PropTypes from 'prop-types';
import { ContainerButton } from './styles';

export function Button({ children, ...props }) {
	console.log(props);
	return <ContainerButton {...props}>{children}</ContainerButton>;
}

Button.prototype = {
	children: PropTypes.string,
};
