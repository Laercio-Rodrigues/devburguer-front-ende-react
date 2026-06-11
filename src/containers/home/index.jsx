import { Banner, Container, Content } from "./styles";


export function Home() {
	return (
		<main>
			<Banner>
				<h1>Bem-Vindo!</h1>
			</Banner>
			<Container>
				<Content>
					<div>Carrossel de Categorias</div>
					<div>Carrossel de Produtos</div>
				</Content>
			</Container>
		</main>
	);
}
