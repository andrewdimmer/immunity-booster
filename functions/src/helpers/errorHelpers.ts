export const logReturnFalse = (err: any) => {
  console.log(err);
  return false;
};

export const logReturnNull = (err: any) => {
  console.log(err);
  return null;
};

export const logReturnEmptyArray = (err: any) => {
  console.log(err);
  return [] as any[];
};
