'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RecepieData {
	title: string;
	ingredients: string;
	instructions: string;
}

export default async function updateRecepie(id: number, data: RecepieData) {
	const { title, ingredients, instructions } = data;
	try {
		await prisma.recepie.update({
			where: {
				id
			},
			data: {
				title,
				ingredients,
				instructions
			}
		});

		await prisma.$disconnect();
	} catch (error) {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	}
}
