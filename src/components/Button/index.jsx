import PropTypes from 'prop-types'
import { ContainerButton } from "./styles"

export function Button({ children }) {
    
    return (
        <ContainerButton>{children}</ContainerButton>
    )
}

Button.prototype = {
    children: PropTypes.string,
};