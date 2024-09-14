'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
import getOneRecepies from '@/actions/getOneRecepie';
import updateRecepie from '@/actions/updateRecepie';

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

interface Recepie {
	id: number;
	title: string;
	ingredients: string;
	instructions: string;
	created_at: Date;
}

export default function Edit() {
	const [recepieId, setRecepieId] = useState<number | null>();
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			ingredients: '',
			instructions: ''
		}
	});

	useEffect(() => {
		const fetchRecepie = async (id: number) => {
			try {
				const data = await getOneRecepies(id);
				form.reset({
					title: data?.title,
					ingredients: data?.ingredients,
					instructions: data?.instructions
				});
				setRecepieId(data?.id);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecepie(+id);
	}, []);

	if (loading) {
		return (
			<p className='text-xl flex flex-col justify-center items-center h-screen'>
				Loading...
			</p>
		);
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (recepieId) {
				await updateRecepie(+recepieId, values);
			}
			router.push('/');
		} catch (error) {
			throw new Error('Could not update recepie');
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
						Изменить рецепт
					</Button>
				</form>
			</Form>
		</div>
	);
}
