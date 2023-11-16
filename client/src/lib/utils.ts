import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeConversion(dateString: string): string {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const secondsAgo = Math.floor(timeDifference / 1000);

  const days = Math.floor(secondsAgo / 86400);
  const hours = Math.floor((secondsAgo % 86400) / 3600);
  const minutes = Math.floor(((secondsAgo % 86400) % 3600) / 60);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${secondsAgo} ${secondsAgo === 1 ? "second" : "seconds"} ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
