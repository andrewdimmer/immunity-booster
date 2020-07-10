import { foodRef } from "../config/firebaseConfig";
import { logReturnFalse } from "../helpers/errorHelpers";

export const reorderFoods = async (json: any): Promise<boolean> => {
  return foodRef
    .update(json)
    .then(() => true)
    .catch(logReturnFalse);
};
