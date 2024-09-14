'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

const formSchema = z.object({
	searchQuery: z.string().max(50, {
		message: 'Не больше 50 символов'
	})
});

export default function SearchForm({ whenSubmit }: { whenSubmit: Function }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchQuery: ''
		}
	});

	function onSubmit(value: z.infer<typeof formSchema>) {
		const { searchQuery } = value;
		whenSubmit(searchQuery);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex justify-center items-center'
			>
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Поиск рецепта...'
									{...field}
									className='md:w-[500px]'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>
					<SearchIcon />
				</Button>
			</form>
		</Form>
	);
}
