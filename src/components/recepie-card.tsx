import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import truncateText from '@/utils/truncateText';

interface Recepie {
	id: number;
	title: string;
	ingredients: string;
	instructions: string;
	created_at: Date;
}

export default function RecepieCard({ recepie }: { recepie: Recepie }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{recepie.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='italic text-slate-600'>{truncateText(recepie.ingredients)}</p>
				<p>{truncateText(recepie.instructions)}</p>
			</CardContent>
			<CardFooter className='flex gap-2'>
				<Link href={`/show/${recepie.id}`}>
					<Button>Посмотреть рецепт</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
