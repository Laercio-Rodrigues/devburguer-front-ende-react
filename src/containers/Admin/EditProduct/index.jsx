import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api';
import {
	Container,
	ContainerCheckBox,
	ErrorMessage,
	Form,
	Input,
	InputGroup,
	Label,
	LabelUpload,
	Select,
	SubmitButton,
} from './styles';

const schema = yup.object({
	name: yup.string().required('Digite o nome do produto'),
	price: yup
		.number()
		.positive()
		.required('Digite o preço do produto')
		.typeError('Digite o preço do produto'),
	category: yup.object().required('Escolha uma categoria'),
    offer: yup.bool(),
});

export function EditProduct() {
	const [fileName, setFileName] = useState(null);
	const [categories, setCategories] = useState([]);

    const navigate = useNavigate()

	const {
		state: { product },
	} = useLocation();

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');

			setCategories(data);
		}
		loadCategories();
	}, []);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		const productFormData = new FormData();

		productFormData.append('name', data.name);
		productFormData.append('price', data.price * 100);
		productFormData.append('category_id', data.category.id);
		productFormData.append('file', data.file[0]);
		productFormData.append('offer', data.offer);

		await toast.promise(api.put(`/products/${product.id}`, productFormData), {
			pending: 'Editando o produto...',
			success: 'Produto editado com sucesso',
			error: 'Falha ao editar o produto, tente novamente',
		});

        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputGroup>
					<Label>Nome</Label>
					<Input
						type="text"
						{...register('name')}
						defaultValue={product.name}
					/>
					<ErrorMessage>{errors?.name?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<Label>Preço</Label>
					<Input
						type="number"
						{...register('price')}
						defaultValue={product.price / 100}
					/>
					<ErrorMessage>{errors?.price?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<LabelUpload>
						<ImageIcon />
						<input
							type="file"
							{...register('file')}
							accept="image/png, image/jpeg"
							onChange={(value) => {
								setFileName(value?.target?.files[0]?.name);
								register('file').onChange(value);
							}}
						/>

						{fileName || 'Upload do Produto'}
					</LabelUpload>

					<ErrorMessage>{errors?.file?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<Label>Caterorias</Label>
					<Controller
						name="category"
						control={control}
						defaultValue={product.category}
						render={({ field }) => (
							<Select
								{...field}
								options={categories}
								getOptionLabel={(category) => category.name}
								getOptionValue={(category) => category.id}
								placeholder="Categorias"
								menuPortalTarget={document.body}
								defaultValue={product.category}
							/>
						)}
					/>

					<ErrorMessage>{errors?.category?.message}</ErrorMessage>
				</InputGroup>
				<InputGroup>
					<ContainerCheckBox>
						<input
							type="checkbox"
							defaultChecked={product.offer}
							{...register('offer')}
						/>
						<Label>Produto em oferta ?</Label>
					</ContainerCheckBox>
				</InputGroup>

				<SubmitButton>Editar Produtos</SubmitButton>
			</Form>
		</Container>
	);
}

// Quando falamos em elementos de formulário no React
// (como campos de texto, seleções, caixas de seleção),
// temos duas formas de lidar com eles:

// Elementos Controlados: o React controla tudo o que é digitado ou selecionado.
// A cada mudança, o valor do campo é atualizado no estado do componente React,
// e o componente React é responsável por armazenar e atualizar esses dados.

// Elementos Não Controlados: o navegador controla os valores dos campos,
// e o React só coleta o valor do campo quando necessário (como quando o formulário é enviado).

// React Select é uma biblioteca que fornece um campo de seleção especial (dropdown),
// que permite fazer escolhas como uma lista suspensa. Ele é um elemento
// "não controlado" porque o valor selecionado não é automaticamente gerenciado pelo React.
