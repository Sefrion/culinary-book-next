'use client';
import deleteRecepie from '@/actions/deleteRecepie';
import getOneRecepie from '@/actions/getOneRecepie';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Recepie {
	id: number;
	title: string;
	ingredients: string;
	instructions: string;
	created_at: Date;
}

export default function Show() {
	const [recepie, setRecepie] = useState<Recepie | null>();
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	const router = useRouter();

	useEffect(() => {
		const fetchRecepie = async (id: number) => {
			try {
				const data = await getOneRecepie(id);

				setRecepie(data);
			} catch (error) {
				console.error(error);
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

	if (!recepie && !loading) {
		return <p className='text-center text-xl mt-12'>Рецепт не найден</p>;
	}

	const ingredients = recepie?.ingredients.split(',');

	const deleteRecord = async (id: number) => {
		try {
			await deleteRecepie(id);
			toast.success('Рецепт успешно удален');
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	if (recepie && ingredients) {
		const ingredients = recepie.ingredients.split(',');
		return (
			<>
				<div className='border mx-1 my-2 rounded-md p-2 lg:w-[80vw] xl:w-[40vw] lg:mx-auto flex flex-col gap-4'>
					<Link href='/' className='flex justify-end mt-2'>
						<Button>Назад к рецептам</Button>
					</Link>
					<h1 className='text-xl'>{recepie?.title}</h1>
					<ol
						className={`${ingredients[0] === '' ? '' : 'list-decimal pl-4'}  italic`}
					>
						{ingredients[0] === '' ? (
							<p>Нет списка ингредиентов</p>
						) : (
							ingredients?.map((ingredient, idx) => <li key={idx}>{ingredient}</li>)
						)}
					</ol>
					<p>{recepie?.instructions}</p>
					<div className='space-x-2'>
						<Link href={`/edit/${recepie?.id}`}>
							<Button>Изменить</Button>
						</Link>
						<Button onClick={() => deleteRecord(recepie?.id)}>Удалить</Button>
					</div>
				</div>
			</>
		);
	} else {
		<p className='text-center text-xl mt-12'>Рецепт не найден</p>;
	}
}
