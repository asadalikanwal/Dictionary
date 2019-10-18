# MWA - Homework 14 - Angular 04
## Coding Exercise
* Create a Data-Driven sign-up and sign-in forms with an async validation that emails are alwayas unique.
* Create a Restful API using `express`, after sign-up or sign-in, the backend API will generate a JWT and send it to your Angular app (to be saved in the `localStorage`). Password must be encrypted (use `bcrypt` and `jsonwebtoken`)
* Create a backend route to `/api/protected` and write a middleware to verify and allow tokenized requests only to pass through. The route will send back a secret JSON object as a response.
* Create a frontend route to `/client/protected`, this component will try to fetch data from `/api/protected/, make sure to intercept all requests and attach the JWT in the request header, so the backend API will approve the request, your frontend route should be protected with a Guard to allow users with a valid JWT to pass through and see the secret JSON.



