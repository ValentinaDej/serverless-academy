# CLI: Interactive Sort

## 1. Starting the App

1. Clone the repository.
2. Execute `npm start`.

## 2. Inputting Data

Provide a sequence of words or numbers.

- **Words**: `apple banana Cherry dATE fRUIT`
- **Numbers**: `492 32 81 903 21`
- **Mixed**: `apple 492 banana 32 Cherry`
  > (Note: Operations targeting words will ignore numbers and vice versa. A value like `492banana` is treated as a word.)

## 3. Selecting an Operation

Choose from the following operations:

- Sort words alphabetically
- Show numbers from lesser to greater
- Show numbers from bigger to smaller
- Display words in ascending order by number of letters in the word
- Show only unique words
- Display only unique values from the set of words and numbers entered by the user

## 4. Reiteration

After executing your chosen operation, the program will present the list of operations again. At this point, input a new string to continue.

**To exit the program, enter `exit`.**
