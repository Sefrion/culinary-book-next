'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function deleteRecepie(id: number) {
	try {
		await prisma.recepie.delete({
			where: {
				id
			}
		});
	} catch (err) {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	}
}
