'use client';

import getAllRecepies from '@/actions/getAllRecepies';
import getSearchedrecepies from '@/actions/getSearchedRecepies';
import RecepieCard from '@/components/recepie-card';
import SearchForm from '@/components/searchForm';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

interface Recepie {
	id: number;
	title: string;
	ingredients: string;
	instructions: string;
	created_at: Date;
}

export default function Home() {
	const [recepies, setRecepies] = useState<Recepie[]>();

	useEffect(() => {
		const fetchRecepies = async () => {
			try {
				const data = await getAllRecepies();

				setRecepies(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchRecepies();
	}, []);

	async function searchRecepies(searchQuery: string) {
		try {
			const data = await getSearchedrecepies(searchQuery);
			setRecepies(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className='px-1 mt-1 md:container md:mx-auto'>
			<div className='border rounded-md px-1 flex flex-col justify-center items-center py-2 gap-2'>
				<ModeToggle />
				<h1 className='uppercase text-lg text-center'>
					Книга для вкуснейших рецептов
				</h1>
				<SearchForm whenSubmit={searchRecepies} />
			</div>
			<Link href='/create' className='flex justify-end mt-2'>
				<Button className='w-full md:w-32'>Добавить</Button>
			</Link>
			<div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 my-2'>
				{recepies?.length === 0 ? (
					<p className='text-center'>Здесь еще нет рецептов</p>
				) : (
					recepies?.map((recepie) => (
						<Suspense fallback={<div>Loading...</div>}>
							<RecepieCard key={recepie.id} recepie={recepie} />
						</Suspense>
					))
				)}
			</div>
		</div>
	);
}
