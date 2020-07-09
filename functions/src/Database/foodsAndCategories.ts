export const categories = [
  "Vitamin A",
  "Vitamin C",
  "Vitamin E",
  "Glutathione",
  "Prebiotic",
  "Probiotic",
];

const foods = {
  vitA: [
    "Dark green leafy vegetables: spinach and chard",
    "Orange-fleshed sweet potatoes",
    "Carrots",
    "Squashes",
    "Pumpkins",
    "Animal sources: Liver, eggs",
    "Red palm oil",
    "Cod liver oil",
  ],
  vitC: [
    "Citrus fruits (such as lemons, oranges and grapefruits)",
    "Kiwi fruit",
    "Strawberries",
    "Red and green peppers (raw)",
    "Broccoli (LIGHTLY steamed)",
    "Brussel sprouts",
  ],
  vitE: [
    "Cashews",
    "Almonds",
    "Chickpeas",
    "Grass-fed meat",
    "Lentils",
    "Eggs",
    "Seeds: hemp, flax, pumpkin or squash seeds (raw)",
    "Spinach",
  ],
  glutathione: [
    "Avocado",
    "Garlic",
    "Cabbage",
    "Brussel sprouts",
    "Asparagus",
    "Spinach",
  ],
  prebiotic: [
    "Chia seeds",
    "Hemp seeds",
    "Flax seeds",
    "Asparagus",
    "Artichokes",
  ],
  probiotic: [
    "Sauerkraut",
    "Kimchi",
    "Probiotic-rich yogurts",
    "Probiotic-rich drinks – kombucha, kefir water",
    "Raw dairy kefi",
  ],
};

export declare interface FoodObject {
  label: string;
  category: string;
}

declare type Categories = keyof typeof foods;

const catConvert = (category: string): Categories => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes("vitamin a")) {
    return "vitA";
  } else if (categoryLower.includes("vitamin c")) {
    return "vitC";
  } else if (categoryLower.includes("vitamin e")) {
    return "vitE";
  } else if (categoryLower.includes("glutathione")) {
    return "glutathione";
  } else if (categoryLower.includes("prebiotic")) {
    return "prebiotic";
  } else if (categoryLower.includes("probiotic")) {
    return "probiotic";
  } else {
    throw new Error("Category Not Found!");
  }
};

export const getRandomItem = (category: string) =>
  foods[catConvert(category)][
    Math.random() * foods[catConvert(category)].length
  ];

export const foodToCategory = (foodParam: string) => {
  for (const category in categories) {
    for (const food in foods[catConvert(category)]) {
      if (food.toLowerCase().includes(foodParam.toLowerCase())) {
        return category;
      }
    }
  }
  throw new Error("That food does not appear in a category!");
};
