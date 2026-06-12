import { CategoriesCarousel } from "../../components/CategoriesCasousel";
import { OffersCarousel } from "../../components/OffersCarousel";
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
					<OffersCarousel />
					<div>Carrossel de Produtos</div>
				</Content>
			</Container>
		</main>
	);
}
