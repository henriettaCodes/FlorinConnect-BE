# LAP 2 Project - Florin Connect [Back-end]

This is the back-end code designed to be paired with the front-end of Florin Connect.

It contains various endpoints that allow the Florin Connect web app to operate.


| Route | Method | Response |
| --- | --- | --- |
| `/` | `GET` | Returns a JSON object describing the API. |
| `/users/register` | `POST` | Registers a user to the service, hashing their password. |
| `/users/login` | `POST` | Validates a user's login credentials and assigns them a token if all is ok. |
| `/users/:token` | `GET` | Returns the details of the account attached to the token. |
| `/posts` | `POST` | Creates a new post. |
| `/posts/:id` | `GET` | Returns the specified post. |
| `/posts/search` | `GET` | Returns all posts. |
| `/posts/search/:search` | `GET` | Returns all posts that contain the substring you searched for in either the title or content. |
| `/posts/category/:category` | `GET` | Returns all posts of the category searched for. |
| `/posts/:id` | `PATCH` | Updates the specified post. |
| `/posts/:id` | `DELETE` | Deletes the specified post. |
| `/replies/:id` | `POST` | Adds a reply to the specified post. |
| `/replies/post/:id` | `GET` | Returns all replies to the specified post. |
| `/replies/:id` | `GET` | Returns the specified reply. |
| `/replies/:id` | `PATCH` | Updates the specified reply. |
| `/replies/:id` | `DELETE` | Deletes the specified reply. |