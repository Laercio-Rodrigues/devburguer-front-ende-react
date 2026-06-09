import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	RightContainer,
	Title,
} from './styles';

export function Register() {
	const schema = yup
		.object({
			name: yup.string().required('O nome é Obrigatório'),
			email: yup
				.string()
				.email('Digite um e-mail válido')
				.required('O e-mail é obrigatório'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres')
				.required('Digite uma senha'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais')
				.required('Confirme sua senha'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	console.log(errors);

	const onSubmit = async (data) => {
		try {
			const { status } = await api.post(
				'/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true,
				},
			);

			if (status === 200 || status === 201) {
				toast.success('Conta criada com sucesso!');
			} else if (status === 409) {
				toast.error('Email já cadastrado! Faça o login para continuar');
			} else {
				throw new Error();
			}

			console.log(status);
		} catch (error) {
			toast.error('😭 Falha no Sistema! Tente novamente');
		}
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburguer" />
			</LeftContainer>
			<RightContainer>
				<Title>Criar Conta</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label>
							Nome
							<input type="text" {...register('name')} />
						</label>
						<p>{errors?.name?.message}</p>
					</InputContainer>
					<InputContainer>
						<label>
							Email
							<input type="email" {...register('email')} />
						</label>
						<p>{errors?.email?.message}</p>
					</InputContainer>

					<InputContainer>
						<label>
							Senha
							<input type="password" {...register('password')} />
						</label>
						<p>{errors?.password?.message}</p>
					</InputContainer>
					<InputContainer>
						<label>
							Confirmar Senha
							<input type="password" {...register('confirmPassword')} />
						</label>
						<p>{errors?.confirmPassword?.message}</p>
					</InputContainer>

					<Button type="submit">Criar Conta</Button>
				</Form>
				<p>
					Já possui conta? <a href="/cadastro">Clique aqui</a>.
				</p>
			</RightContainer>
		</Container>
	);
}
