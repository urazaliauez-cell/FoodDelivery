export interface Restaurant {
  id: string;
  name: string;
  categories: string;
  rating: number;
  delivery: string;
  time: string;
  image: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Rose Garden Restaurant",
    categories: "Burger - Chicken - Rice - Wings",
    rating: 4.7,
    delivery: "Free",
    time: "20 min",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900",
  },
  {
    id: "2",
    name: "Burger House",
    categories: "Burger - Fries - Drinks",
    rating: 4.8,
    delivery: "Free",
    time: "25 min",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900",
  },
  {
    id: "3",
    name: "Pizza House",
    categories: "Pizza - Pasta - Italian",
    rating: 4.9,
    delivery: "Free",
    time: "30 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900",
  },
  {
    id: "4",
    name: "Sushi Tokyo",
    categories: "Sushi - Rolls - Japanese",
    rating: 4.8,
    delivery: "500 KZT",
    time: "35 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900",
  },
];
