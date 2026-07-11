import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api';
import {
	Container,
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
	file: yup
		.mixed()
		.test('required', 'Escolha um arquivo para continuar', (value) => {
			return value && value.length > 0;
		})
		.test('fileSize', 'Carregue arquivos até 3mb', (value) => {
			return value && value.length > 0 && value[0].size <= 30000;
		})
		.test('type', 'Carregue apenas imagem PNG ou JPEG', (value) => {
			return (
				value &&
				value.length > 0 &&
				(value[0].type === 'image/jpeg' || value[0].type === 'image/png')
			);
		}),
});

export function NewProduct() {
	const [fileName, setFileName] = useState(null);
	const [categories, setCategories] = useState([]);

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
		const productFormData = new FormData()

		productFormData.append('name', data.name)
		productFormData.append('price', data.price * 100 )
		productFormData.append('category_id', data.category.id)
		productFormData.append('file', data.file[0])

		await toast.promise( api.post('/products', productFormData), {
			pending: 'Adicionando o produto...',
			success: 'Produto criado com sucesso',
			error: 'Falha ao adicionar o produto, tente novamente',
		})
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputGroup>
					<Label>Nome</Label>
					<Input type="text" {...register('name')} />
					<ErrorMessage>{errors?.name?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<Label>Preço</Label>
					<Input type="number" {...register('price')} />
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
						render={({ field }) => (
							<Select
								{...field}
								options={categories}
								getOptionLabel={(category) => category.name}
								getOptionValue={(category) => category.id}
								placeholder="Categorias"
								menuPortalTarget={document.body}
							/>
						)}
					/>

					<ErrorMessage>{errors?.category?.message}</ErrorMessage>
				</InputGroup>

				<SubmitButton>Adicionar Produtos</SubmitButton>
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
