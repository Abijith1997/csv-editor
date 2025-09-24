import { faker } from "@faker-js/faker";
import type { BookRow } from "../types/types";

interface GenerateSampleDataProps {
  count?: number;
  setLoading?: (loading: boolean) => void;
}

export const generateSampleData = ({
  count = 1000,
  setLoading,
}: GenerateSampleDataProps): Promise<BookRow[]> => {
  setLoading?.(true);

  return new Promise((resolve) => {
    setTimeout(() => {
      const genres = [
        "Fiction",
        "Non-Fiction",
        "Sci-Fi",
        "Fantasy",
        "Mystery",
        "Romance",
        "History",
        "Biography",
      ];

      const d = new Array(count).fill(0).map(() => ({
        Title: faker.lorem.words(faker.number.int({ min: 2, max: 6 })),
        Author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        Genre: genres[faker.number.int({ min: 0, max: genres.length - 1 })],
        PublishedYear: faker.number.int({ min: 1900, max: 2025 }).toString(),
        ISBN: faker.string.numeric(13),
      }));

      setLoading?.(false);
      resolve(d); // ✅ resolves to the caller
    }, 50);
  });
};
