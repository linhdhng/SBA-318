

// Use at least three different data categories (e.g., users, posts, or comments).
// Utilize reasonable data structuring practices.
// Create GET routes for all data that should be exposed to the client.
// Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.
// Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.
// Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request.
// Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters.
// Utilize route parameters, where appropriate.
// Adhere to the guiding principles of REST.
// Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.
// If you are stuck on how to approach this, think about ways you could render the current state of your API's data for easy viewing.
// Use simple CSS to style the rendered views.
// Include a form within a rendered view that allows for interaction with your RESTful API.

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = 3000;

const users = require()

// Create and use at least two pieces of custom middleware.

// Create and use error-handling middleware.

app.get("/api/users", (req, res) => {
    res.json(users)
})

app.get("/", (req,res) => {
    res.send("Work")
})

// Custom middleware
app.use((req,res) => {
    res.status(404).json({ error: "Resource Not Found"})
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})