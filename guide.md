## Overview

Video guide: https://www.youtube.com/watch?v=vpvtZZi5ZWk

This uses: React.js, Vite, Tailwind, Redux Toolkit, and RapidAPI (as a wrapper on top of Open API). Rapid AI's AI Summarizer API is used to drive the core functionality of this app.

RapidAPI link: https://rapidapi.com/hub
Vitejs Setup guide: https://vitejs.dev/guide/
Tailwind CSS installation for Vite: https://tailwindcss.com/docs/guides/vite
Redux toolkit starter guide: https://redux-toolkit.js.org/tutorials/quick-start

## Setup

- 4:30 - Setup using Vite.js (https://vitejs.dev/). In the terminal, we run `npm create vite@latest`
- 5:20 - Deleting everything in `src` except for `main.tsx` to get started from scratch.
- 5:50 - Install required packages by running `npm install @reduxjs/toolkit`. We also download [assets](https://drive.google.com/file/d/11DLzrWADT-GyhuHpWXobhUwqV8peC0ef/view) and add them to the `src` folder.
- 7:10 - Creating `App.jsx` file.
- 7:50 - Create `App.css`, and then copy the styles from the github gist.
- 8:40 - Installing tailwind css with vite (https://tailwindcss.com/docs/guides/vite). The command was `npm install -D tailwindcss postcss autoprefixer`. Then, we run `3`. After that, we copy the snippet of `tailwind.config.js` from the site, and paste that into the `tailwind.config.js` file in our folder.
  - Note that the `App.css` file also needs to be modified to reference tailwind. In our case, this was already done when we copied the github gist.
  - Note that the `-D` flag is a shorthand for --save-dev, which indicates that the packages being installed should be saved as development dependencies in the package.json file. Development dependencies are typically packages that are required during the development process but not needed for the application to run in production.
- 11:00 - Run application by running `npm run dev`.
- 12:30 - Creating `components` folder and setting up `Demo.jsx` and `Hero.jsx` components.

## Hero Section

- 15:40 - Starting work on `Hero.jsx`

## Demo Section:

- 24:00 - Working on `Demo.jsx`.
- 29:25 - Explanation of using the `peer` tailwind class to focus other components when the user focuses on a specific component in the UI.
- 30:00 - Making API request.
- 32:20 - Introduction to redux toolkit. Run `npm install react-redux` to install redux. We then import `Provider` in the `main.jsx` file, and then we wrap the entire application in the provider.
- 34:10 - We then create a store, i.e. a global state. This is done in the `src/services/store.js` file. We also create a `src/services/article.js` file to store some boilerplate. Have a look through all these files. Look at this link for further details: https://redux-toolkit.js.org/api/configureStore
- 40:35 - Working on the Create API. We use the `/summarize` endpoint from this API: https://rapidapi.com/restyler/api/article-extractor-and-summarizer
- 49:00 - Back to `Demo.jsx` to use the Hook we just created.
- 55:00 - Saving results in local storage
- 57:05 - Working on saving history of previous queries.
- 1:07:00 - Working on clipboard.

## Deployment:

- 1:10:00 - Deployment to Netlify.

## General Notes

### Difference between vite and CRA (create react app)

Vite and Create React App are both tools used for setting up and managing React applications, but they have different approaches and features.

Vite:
Vite is a build tool and development server created by Evan You, the creator of Vue.js. It focuses on providing a fast and lightweight development experience. Vite uses native ES modules during development, enabling features like fast development server startup and hot module replacement. For production builds, Vite uses the Rollup bundler, which is optimized for tree-shaking and code-splitting. Vite is framework-agnostic and can be used with React, Vue, Svelte, or other JavaScript frameworks.

Create React App (CRA):
Create React App is an officially supported tool by Facebook for creating React applications with minimal setup. It provides a pre-configured environment, including Webpack for bundling, Babel for transpiling, and ESLint for linting. CRA is focused on React projects and hides the configuration files by default, making it easy for beginners to get started without having to deal with build configurations. However, this can also be a limitation for developers who want more control over the build process.

Here are the key differences between Vite and Create React App:

Development speed: Vite's use of native ES modules enables faster development server startup and better hot module replacement compared to CRA.
Flexibility: CRA is tailored specifically for React projects, while Vite is framework-agnostic and can be used with other frameworks like Vue and Svelte.
Configuration: CRA hides the configuration by default, making it easier for beginners but limiting for developers who want more control. Vite exposes its configuration, offering more customization options.
Build tool: CRA uses Webpack for bundling, while Vite uses Rollup for production builds. Both bundlers have their strengths and trade-offs.
In summary, Vite and Create React App are both tools for setting up React applications, but they differ in their development experience, flexibility, configuration approach, and build tools. Developers can choose between these tools based on their preferences, requirements, and level of expertise.

### How the `article.js` file works.

This article.js file creates a Redux Toolkit Query (RTK Query) API for fetching article summaries from the "Article Extractor and Summarizer" API hosted on RapidAPI. Here's a breakdown of the code:

Import createApi and fetchBaseQuery from the Redux Toolkit Query library:

```
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
```

Get the RapidAPI key from the Vite environment variables:

```
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
console.log(rapidApiKey);
```

Create the articleApi using the createApi function:

```
export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      headers.set("content-type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});
```

`reducerPath`: Sets the name of the reducer in the Redux store.
`baseQuery`: Configures the base query using fetchBaseQuery with the API's base URL and header settings. The RapidAPI key, host, and content-type are set in the headers.
`endpoints`: Defines the API endpoints using the builder. In this case, there's only one endpoint named getSummary. It's a query that takes an object with an articleUrl parameter, encodes the URL, and appends it to the request path along with the desired summary length.
Export the generated React hooks from the API:

```
export const { useLazyGetSummaryQuery } = articleApi;
```

The useLazyGetSummaryQuery hook is exported, which can be used in React components to fetch the article summary. The hook is lazy, meaning it won't automatically fetch the data when the component mounts; instead, you can trigger the fetch manually when needed.

### How the `store.js` file works.

The code in this file sets up a Redux store using the Redux Toolkit library, which is a set of tools to simplify Redux development. It's composed of several parts:

Importing configureStore from @reduxjs/toolkit:

```
import { configureStore } from "@reduxjs/toolkit";
```

configureStore is a utility function provided by the Redux Toolkit to help configure a Redux store with a set of defaults and best practices. It sets up the store with middleware, enhancers, and a root reducer.

Importing articleApi from the ./article module:

```
import { articleApi } from "./article";
```

articleApi is likely an API slice created using the Redux Toolkit's createApi method from the rtk-query package. It represents the state, reducer, and middleware related to articles in your application.

Creating and exporting the store:

```
export const store = configureStore({
  reducer: { [articleApi.reducerPath]: articleApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});
```

Here, the configureStore function is called with a configuration object that has two properties: reducer and middleware.

`reducer`: The object passed to this property contains a key-value pair, where the key is the articleApi.reducerPath (a string), and the value is articleApi.reducer (the reducer function for the article API slice). This sets up the root reducer for the store, which is used to handle actions related to the article API slice.
`middleware`: This property takes a function that receives the getDefaultMiddleware function as an argument. getDefaultMiddleware is a Redux Toolkit function that returns the default middleware for the store. By calling this function and then using the concat method, we add the articleApi.middleware to the default middleware array. Middleware is used to handle side effects and other tasks related to dispatched actions, such as caching and data fetching.
In summary, this code creates a Redux store using the Redux Toolkit's configureStore function, sets up a root reducer and middleware for the articleApi slice, and exports the created store.
