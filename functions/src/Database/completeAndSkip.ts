import { FoodObject, getRandomItem, categories } from "./foodsAndCategories";
import { foodRef } from "../config/firebaseConfig";
import { logReturnFalse, logReturnNull } from "../helpers/errorHelpers";

export const complete = async (category: string) => {
  return foodRef
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data) {
        const list: FoodObject[] = data.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].category.toLowerCase().includes(category.toLowerCase())) {
            list.splice(i, 1);
            break;
          }
        }
        return foodRef
          .update({ list })
          .then(() => true)
          .catch(logReturnFalse);
      } else {
        console.log("No data!");
        return false;
      }
    })
    .catch(logReturnFalse);
};

export const skip = async (category: string) => {
  return foodRef
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data) {
        const list: FoodObject[] = data.list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].category.toLowerCase().includes(category.toLowerCase())) {
            list.splice(i, 1);
            break;
          }
        }
        let catIndex = 0;
        for (; catIndex < categories.length; catIndex++) {
          if (
            categories[catIndex].toLowerCase().includes(category.toLowerCase())
          ) {
            break;
          }
        }
        const newFoodItem: FoodObject = {
          label: getRandomItem(category),
          category: categories[catIndex],
        };
        list.push(newFoodItem);
        return foodRef
          .update({ list })
          .then(() => newFoodItem)
          .catch(logReturnNull);
      } else {
        console.log("No data!");
        return null;
      }
    })
    .catch(logReturnNull);
};
