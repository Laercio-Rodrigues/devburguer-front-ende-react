import { CategoriesCarousel } from "../../components/CategoriesCasousel";
import { Banner, Container, Content } from "./styles";


export function Home() {
	return (
		<main>
			<Banner>
				<h1>Bem-Vindo!</h1>
			</Banner>
			<Container>
				<Content>
					<CategoriesCarousel />
					<div>Carrossel de Produtos</div>
				</Content>
			</Container>
		</main>
	);
}
