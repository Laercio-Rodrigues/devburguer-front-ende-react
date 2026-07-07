import { SignOutIcon } from '@phosphor-icons/react';
import { useResolvedPath } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { useUser } from '../../hooks/UserContext';
import { navLinks } from './navLinks';
import { 
    Container, 
    Footer, 
    NavLink, 
    NavLinkContaner, 
} from './styles';

export function SideNavAdmin() {
	const { logout } = useUser();
    const { pathname } = useResolvedPath()

    console.log(pathname)

	return (
		<Container>
			<img src={Logo} alt="Hamburgue Logo DevBurger" />
			<NavLinkContaner>
				{navLinks.map((link) => (
					<NavLink 
                    key={link.id} 
                    to={link.path}
                    $isActive={pathname === link.path}
                    >
						{link.icon}
                        <span>{link.label}</span>
					</NavLink>
				))}
			</NavLinkContaner>
			<Footer>
				<NavLink to="/login" onClick={logout}>
					<SignOutIcon />
					<span>Sair</span>
				</NavLink>
			</Footer>
		</Container>
	);
}
