import Logo from '../../assets/logo.svg';
import {
	Button,
	Container,
	Form,
	InputContainer,
	LeftContainer,
	Link,
	RightContainer,
	Title,
} from './styles';

export function Login() {
	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburguer" />
			</LeftContainer>
			<RightContainer>
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span> Acesse{' '}
					<span>com seu Login e senha.</span>
				</Title>
				<Form>
					<InputContainer>
						<labe>Email</labe>
						<input type="email" />
					</InputContainer>

					<InputContainer>
						<labe>Senha</labe>
						<input type="password" />
					</InputContainer>
					<Link>Esqueci minha senha</Link>
					<Button>Entrar</Button>
				</Form>
				<Link>Não possui conta? Clique aqui.</Link>
			</RightContainer>
		</Container>
	);
}
