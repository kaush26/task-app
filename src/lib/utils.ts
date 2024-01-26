import { ClassNameValue, twMerge } from 'tailwind-merge';

export function cn(...args: ClassNameValue[]) {
  return twMerge(...args)
}