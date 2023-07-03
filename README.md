# Recipe project

<hr>
Search, create, and save your favorite recipes in one place!


## ⭐ About this project

<hr>
In this web application, you can search for recipes of any kind. Besides searching, you can save your favorite recipes and create your own ones with just a few clicks. Check the demo 
[here](https://neluchetraru.github.io/recipes-project/) .

## 🛠 Built with

<hr>

1. HTML
2. CSS
3. TypeScript
4. React.JS
5. Zustand
6. Axios
7. Firebase
8. Material UI
9. Vite

## Prerequisites

<hr>

1. Git
2. Node.JS

## Run the application
<hr>

Clone the repository and change the current directory:

```Bash
git clone https://github.com/neluchetraru/recipes-project && cd recipes-project
```

Install the dependencies:

```Bash
npm install
```

Start the local server:

```Bash
npm run dev
```

The web application will open in browser.

## 📜 API Reference
A free API was used to retrieve recipes. See the whole documentation of the API [here](https://spoonacular.com/food-api/docs).

## 🔑 Environmental Variables
To run the web application locally, the following environmental variable are needed in a .env.local file:

Recipes API:

```Bash
VITE_API_KEY
```

Firebase API:

```Bash
VITE_FIREBASE_API_KEY
VITE_FIREBASE_APP_ID
```

*firebase.ts* file must be configured with your own firebase authentication configuration.

