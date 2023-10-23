# CLI:PRIMITIVE DB

## Usage Instructions

1. Run the app using the `npm start` command.
2. Create a user:
   - Enter the user's name.
   - Select their gender.
   - Enter the user's age. If you enter NaN, the program will prompt you to retype.
3. Once you've entered the user's age, they will be automatically added to a text file:
   - If `db.txt` does not exist, it will be created automatically.
   - If the file is empty, it will be initialized with a structure resembling a JSON file.
4. After adding a user, the CLI app will ask if you want to add another one. If you're finished, press the ENTER key and choose one of the following options:

   - **Y** - Lists all the users in the database, allowing you to search for a specific user by name. If found, their record will be displayed; otherwise, you'll be informed that the record doesn't exist in the current database stat
   - **N** - Closes the application.
