'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getOneRecepies(id: number) {
	try {
		const recepie = await prisma.recepie.findUnique({
			where: {
				id
			}
		});

		await prisma.$disconnect();

		return recepie;
	} catch (err) {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	}
}
