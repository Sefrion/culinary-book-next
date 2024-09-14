'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllRecepies() {
	try {
		const recepies = await prisma.recepie.findMany({
			orderBy: {
				created_at: 'asc'
			}
		});

		await prisma.$disconnect();

		return recepies;
	} catch (err) {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	}
}
