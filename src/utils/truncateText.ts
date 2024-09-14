export default function truncateText(str: string) {
	if (str.length > 50) {
		return str.slice(0, 49) + '...';
	} else {
		return str;
	}
}
