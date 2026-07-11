import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
	Container,
	Form,
	InputGroup,
	Label,
	Input,
	LabelUpload,
	Select,
    SubmitButton
} from './styles';

const schema = yup
	.object({
		firstName: yup.string().required(),
		age: yup.number().positive().integer().required(),
	})
	.required();

export function NewProduct() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => console.log(data);

	return (
		<Container>
			<Form>
				<InputGroup>
					<Label>None</Label>
					<Input />
				</InputGroup>

				<InputGroup>
					<Label>Preço</Label>
					<Input />
				</InputGroup>

				<InputGroup>
					<LabelUpload>
						<ImageIcon />
						<input type="file" />
					</LabelUpload>
				</InputGroup>

				<InputGroup>
					<Label>Caterorias</Label>
					<Select />
				</InputGroup>

                <SubmitButton>Adicionar Produtos</SubmitButton>
			</Form>
		</Container>
	);
}
