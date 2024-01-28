import { ClassNameValue, twMerge } from 'tailwind-merge';

export function cn(...args: ClassNameValue[]) {
  return twMerge(...args)
}

export function dateCompare(a: Date | string, b: Date | string, cb: (a: string, b: string) => boolean) {
  return cb(new Date(a).toLocaleDateString(), new Date(b).toLocaleDateString())
}