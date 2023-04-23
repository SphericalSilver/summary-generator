// configureStore is a utility function provided by the Redux Toolkit to
// help configure a Redux store with a set of defaults and best practices.
// It sets up the store with middleware, enhancers, and a root reducer.
import { configureStore } from "@reduxjs/toolkit";

// articleApi is an API slice created using the Redux Toolkit's createApi
// method from the rtk-query package. It represents the state, reducer,
// and middleware related to articles in your application.
import { articleApi } from "./article";

// Here, the configureStore function is called with a configuration object that
// has two properties: reducer and middleware.
export const store = configureStore({
  reducer: { [articleApi.reducerPath]: articleApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});

// getDefaultMiddleware is a Redux Toolkit function that returns the default
// middleware for the store. By calling this function and then using the concat
// method, we add the articleApi.middleware to the default middleware array.
// Middleware is used to handle side effects and other tasks related to
// dispatched actions, such as caching and data fetching.
