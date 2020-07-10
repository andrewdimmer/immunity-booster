import { FoodObject, categories, getRandomItem } from "./foodsAndCategories";
import { foodRef } from "../config/firebaseConfig";
import { logReturnEmptyArray } from "../helpers/errorHelpers";

export const newDay = async (): Promise<FoodObject[] | null> => {
  return foodRef
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data) {
        const list: FoodObject[] = data.list;
        for (const category of categories) {
          let exists = false;
          for (const item of list) {
            if (item.category.includes(category)) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            list.push({ label: getRandomItem(category), category });
          }
        }
        return foodRef
          .update({ list })
          .then(() => list)
          .catch(logReturnEmptyArray);
      } else {
        console.log("No data!");
        return [];
      }
    })
    .catch(logReturnEmptyArray);
};

export const getFoods = async (): Promise<FoodObject[] | null> => {
  return foodRef
    .get()
    .then((doc) => {
      const data = doc.data();
      return data ? (data.list as FoodObject[]) : null;
    })
    .catch(logReturnEmptyArray);
};
