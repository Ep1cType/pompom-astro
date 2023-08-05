const monthNames = [
	'Января',
	'Февраля',
	'Марта',
	'Апреля',
	'Мая',
	'Июня',
	'Июля',
	'Августа',
	'Сентября',
	'Октября',
	'Ноября',
	'Декабря',
];

export const getMonth = (date: Date) => monthNames[date.getMonth()];

export const getDayMonth = (date: Date) =>
	`${date.getDate()} ${getMonth(date)}`;
