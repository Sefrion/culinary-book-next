import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ToastContainer } from 'react-toastify';

const inter = Inter({
	weight: ['400', '600', '700'],
	subsets: ['latin', 'cyrillic']
});

export const metadata: Metadata = {
	title: 'Culinary Book',
	description: 'Culinary book for saving recepies'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<main>{children}</main>
					<ToastContainer />
				</ThemeProvider>
			</body>
		</html>
	);
}
