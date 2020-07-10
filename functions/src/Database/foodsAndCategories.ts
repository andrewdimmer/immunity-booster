export const categories = [
  "Vitamin B6",
  "Vitamin C",
  "Vitamin E",
  "Prebiotic",
  "Probiotic",
];

const b6Foods = ["Chicken", "Salmon", "Tuna", "Trout", "Chickpeas"];
const cFoods = [
  "Oranges",
  "Grapefruits",
  "Tangerines",
  "Strawberries",
  "Kiwifruit",
  "Red bell peppers",
  "Brussel sprouts",
  "Cauliflower",
];
const eFoods = [
  "Almonds",
  "Peanuts",
  "Hazelnuts",
  "Avocado",
  "Sunflower seeds",
  "Spinach",
  "Kale",
  "Broccoli",
];
const preFoods = ["Flaxseeds", "Asparagus", "Garlic", "Onion", "Artichokes"];
const proFoods = ["Sauerkraut", "Kimchi", "Yogurt", "Kefir"];

const foods = [b6Foods, cFoods, eFoods, preFoods, proFoods];

export declare interface FoodObject {
  label: string;
  category: string;
}

export const getRandomItem = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes("vitamin b6")) {
    return b6Foods[Math.floor(Math.random() * b6Foods.length)];
  } else if (categoryLower.includes("vitamin c")) {
    return cFoods[Math.floor(Math.random() * cFoods.length)];
  } else if (categoryLower.includes("vitamin e")) {
    return eFoods[Math.floor(Math.random() * eFoods.length)];
  } else if (categoryLower.includes("prebiotic")) {
    return preFoods[Math.floor(Math.random() * preFoods.length)];
  } else if (categoryLower.includes("probiotic")) {
    return proFoods[Math.floor(Math.random() * proFoods.length)];
  } else {
    throw new Error("Category Not Found!");
  }
};

export const foodToCategory = (foodParam: string) => {
  for (let i = 0; i < foods.length; i++) {
    for (const food of foods[i]) {
      if (food.toLowerCase().includes(foodParam.toLowerCase())) {
        return categories[i];
      }
    }
  }
  throw new Error("That food does not appear in a category!");
};
