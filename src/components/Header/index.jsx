import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';
import {
	Container,
	Content,
	HeaderLink,
	LinkContainer,
	Logout,
	Navigtion,
	Options,
	Profile,
} from './styles';

export function Header() {
	return (
		<Container>
			<Content>
				<Navigtion>
					<div>
						<HeaderLink>Home</HeaderLink>
						<HeaderLink>Cardápio</HeaderLink>
					</div>
				</Navigtion>
				<Options>
					<Profile>
						<UserCircleIcon color="#fff" size={24} />
						<div>
							<p>
								Olá, <span>Laércio</span>
							</p>
							<Logout>Sair</Logout>
						</div>
					</Profile>
					<LinkContainer>
						<ShoppingCartIcon color="#fff" size={24} />
						<HeaderLink>Carrinho</HeaderLink>
					</LinkContainer>
				</Options>
			</Content>
		</Container>
	);
}
