'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RecepieData {
	title: string;
	ingredients: string;
	instructions: string;
}

export default async function createRecepie(data: RecepieData) {
	const { title, ingredients, instructions } = data;

	try {
		const recepie = await prisma.recepie.create({
			data: {
				title,
				ingredients,
				instructions
			}
		});

		console.log(recepie);

		await prisma.$disconnect();
	} catch (err) {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	}
}
