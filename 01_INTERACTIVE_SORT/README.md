# CLI: Interactive Sort

1. **Starting the App**: Execute `npm start`.

2. **Inputting Data**: Provide a sequence of words or numbers. Examples:

   - Words: `apple banana Cherry dATE fRUIT`
   - Numbers: `492 32 81 903 21`
   - Mixed: `apple 492 banana 32 Cherry`
     (Note: Operations targeting words will ignore numbers and vice versa. A value like `492banana` is treated as a word.)

3. **Selecting an Operation**: Choose from the following operations:
   1.&#xA0;Sort words alphabetically
   2.&#xA0;Show numbers from lesser to greater
   3.&#xA0;Show numbers from bigger to smaller
   4.&#xA0;Display words in ascending order by number of letters in the word
   5.&#xA0;Show only unique words
   6.&#xA0;Display only unique values from the set of words and numbers entered by the user

4. **Reiteration**: After executing your chosen operation, the program will present the list of operations again. At this point, input a new string to continue.

To exit the program, enter `exit`.
