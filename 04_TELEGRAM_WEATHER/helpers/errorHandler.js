export const badStructureError = (structure) => {
  console.log(`Error: wrong structure ${structure}`);
  return "Something went wrong while updating data. We're working on fixing this. 🛠️";
};

export const fatchingError = (error) => {
  console.log(`Error fetching data: ${error}`);
  return null;
};
