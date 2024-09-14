'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getSearchedrecepies(searchQuery: string) {
	try {
		const query = '%' + searchQuery + '%';
		const recepies =
			await prisma.$queryRaw`SELECT * FROM Recepie WHERE title LIKE ${query}`;
		return recepies;
	} catch (error) {
		console.error(error);
		prisma.$disconnect();
		process.exit(1);
	}
}
