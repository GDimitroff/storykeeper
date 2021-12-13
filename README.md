# Storykeeper - Meet your next favorite story

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Live demo can be found here: https://story-keeper-3343a.web.app/

## Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Functionality overview

The example application is a social site for books (i.e. a very simple Goodreads clone) called "Storykeeper". It uses a Firebase as backend.

**General functionality:**

- Authenticate users via Firebase
- CRU* users (sign up & settings page - no deleting required)
- CRUD Books
- GET and display paginated lists of books. No authentication required for GET.
- Personal profile page with added favorite books and liked books. 

**The general page breakdown looks like this:**
- Home page (URL: /#/ )
    - Showcase and landing page
- Books page (URL: /#/books/books-slug-here )
    - Dynamic view with list of all books and modal for details page
    - Clicking add new book or edit already added one renders new dynamic view as modal
    - Delete and edit book button (only shown to book's author)
- Sign in/Sign up pages (URL: /#/auth)
    - Store the token in localStorage
    - Single page for login/register page with dynamic switch mode
- Profile page (URL: /#/profile)
    - Show basic user info
    - List of books populated from author's added books
    - List of liked books

## Technologies
- React, HTML, CSS
- React Router, FontAwesome
