import { CategoriesCarousel } from "../../components/CategoriesCasousel";
import { OffersCarousel } from "../../components/OffersCarousel";
import { Banner, Container } from "./styles";

export function Home() {
	return (
		<main>
			<Banner>
				<h1>Bem-Vindo!</h1>
			</Banner>
			<Container>
				<div>
					<CategoriesCarousel />
					<OffersCarousel />
				</div>
			</Container>
		</main>
	);
}
