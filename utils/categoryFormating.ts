// helper function for converting URL category name to friendly and more readable name
// For example "smart-watches" after this function will be "smart watches"
const formatCategoryName = (categoryName: string) => {
  const categoryNameArray = categoryName.split("-");
  return categoryNameArray.join(" ");
};

const convertProductNameToURL = (categoryName: string) => {
  const categoryNameArray = categoryName.split(" ");
  return categoryNameArray.join("-");
};

export { formatCategoryName, convertProductNameToURL };
