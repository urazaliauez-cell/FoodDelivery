export interface Food {
  id: string;
  name: string;
  category: string;
  restaurant: string;
  price: number;
  rating: number;
  time: string;
  image: string;
  description: string;
}

export const categories = [
  { id: "1", name: "All", icon: "🍽️" },
  { id: "2", name: "Pizza", icon: "🍕" },
  { id: "3", name: "Burger", icon: "🍔" },
  { id: "4", name: "Sandwich", icon: "🥪" },
  { id: "5", name: "Sushi", icon: "🍣" },
  { id: "6", name: "Dessert", icon: "🍰" },
  { id: "7", name: "Drinks", icon: "🥤" },
];

export const foods: Food[] = [
  {
    id: "1",
    name: "Pizza Calzone",
    category: "Pizza",
    restaurant: "Rose Garden Restaurant",
    price: 3490,
    rating: 4.9,
    time: "20-30 min",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700",
    description: "Delicious Italian pizza with mozzarella, fresh tomatoes, basil and homemade tomato sauce.",
  },
  {
    id: "2",
    name: "Burger Bistro",
    category: "Burger",
    restaurant: "Burger House",
    price: 2490,
    rating: 4.8,
    time: "15-25 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700",
    description: "Juicy beef burger with melted cheese, fresh lettuce, tomatoes and our special sauce.",
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    category: "Pizza",
    restaurant: "Pizza House",
    price: 3990,
    rating: 4.9,
    time: "25-30 min",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700",
    description: "Classic pepperoni pizza with mozzarella cheese and crispy Italian crust.",
  },
  {
    id: "4",
    name: "Chicken Sandwich",
    category: "Sandwich",
    restaurant: "Fresh Kitchen",
    price: 1990,
    rating: 4.6,
    time: "15-20 min",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700",
    description: "Fresh sandwich with grilled chicken, vegetables and creamy dressing.",
  },
  {
    id: "5",
    name: "Philadelphia Rolls",
    category: "Sushi",
    restaurant: "Sushi Tokyo",
    price: 4590,
    rating: 4.9,
    time: "30-40 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700",
    description: "Japanese sushi rolls with fresh salmon, cream cheese and avocado.",
  },
  {
    id: "6",
    name: "Double Cheeseburger",
    category: "Burger",
    restaurant: "Burger House",
    price: 3290,
    rating: 4.8,
    time: "20-25 min",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=700",
    description: "Double beef patties, cheddar cheese, fresh vegetables and signature burger sauce.",
  },
  {
    id: "7",
    name: "Chocolate Cake",
    category: "Dessert",
    restaurant: "Sweet Bakery",
    price: 1790,
    rating: 4.7,
    time: "15-20 min",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
    description: "Rich chocolate cake with soft layers and delicious chocolate cream.",
  },
  {
    id: "8",
    name: "Fresh Orange Juice",
    category: "Drinks",
    restaurant: "Fresh Kitchen",
    price: 990,
    rating: 4.7,
    time: "10-15 min",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=700",
    description: "Refreshing natural orange juice made from freshly squeezed oranges.",
  },
  {
    id: "9",
    name: "Caesar Salad",
    category: "Salad",
    restaurant: "Rose Garden Restaurant",
    price: 2790,
    rating: 4.8,
    time: "15-25 min",
    image: "https://images.unsplash.com/photo-1546793665-c9d1d9c791f8?w=700",
    description: "Fresh salad with grilled chicken, parmesan, lettuce and Caesar dressing.",
  },
  {
    id: "10",
    name: "Italian Pasta",
    category: "Pasta",
    restaurant: "Rose Garden Restaurant",
    price: 3590,
    rating: 4.9,
    time: "25-35 min",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700",
    description: "Traditional Italian pasta with herbs, parmesan and homemade sauce.",
  },
];
