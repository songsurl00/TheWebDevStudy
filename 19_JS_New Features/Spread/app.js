const nums = [13, 4, 5, 21, 3, 3, 1, 2, 7, 6, 4, 2, 53456];
// SPREAD IN FUNCTIONS
Math.max(nums); //NaN
Math.max(...nums); //53456

// SPREAD IN ARRAYS
const cats = ['Blue', 'Scout', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];

const allPets = [...cats, ...dogs];

// SPREAD IN OBJECTS
const feline = { legs: 4, family: 'Felidae' };
const canine = { isFurry: true, family: 'Caninae' };

const catDog = { ...feline, ...canine };

const dataFromForm = {
  email: 'blueman@gmail.com',
  password: 'tobias123!',
  username: 'tfunke'
};
const newUser = { ...dataFromForm, id: 2345, isAdmin: false };
