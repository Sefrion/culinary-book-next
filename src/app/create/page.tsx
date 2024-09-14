'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import createRecepie from '@/actions/createRecepie';
import { toast } from 'react-toastify';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
	title: z
		.string()
		.min(2, {
			message: 'Название должно быть не короче чем 2 символа'
		})
		.max(50, {
			message: 'Название не может быть больше 50 символов'
		}),
	ingredients: z.string(),
	instructions: z.string().min(5, {
		message: 'Инструкция не может быть короче 5 символов'
	})
});

export default function Create() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			ingredients: '',
			instructions: ''
		}
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await createRecepie(values);
			toast.success('Рецепт успешно создан');
			router.push('/');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className='px-1 my-2 xl:w-[40vw] md:mx-auto'>
			<div>
				<Link href='/' className='flex justify-end mt-2'>
					<Button>Назад к рецептам</Button>
				</Link>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название рецепта</FormLabel>
								<FormControl>
									<Input placeholder='Название рецепта' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='ingredients'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Добавьте ингредиенты</FormLabel>
								<FormControl>
									<Input placeholder='Ингредиенты' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='instructions'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Опишите способ приготовления</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full md:w-32'>
						Добавить рецепт
					</Button>
				</form>
			</Form>
		</div>
	);
}
