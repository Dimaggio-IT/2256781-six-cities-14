import dayjs from 'dayjs';

function getStringSuperscript(str: string): string {
  return str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function formatDate(date: string, template: string): string {
  return date ? dayjs(date).format(template) : '';
}

const getRandomInteger = (a: number, b: number): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export {
  getStringSuperscript,
  formatDate,
  getRandomInteger,
};
