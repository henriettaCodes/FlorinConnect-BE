# LAP 2 Project - Florin Connect [Back-end]

This is the back-end code designed to be paired with the front-end of Florin Connect.

It contains various endpoints that allow the Florin Connect web app to operate.


| Route | Method | Response |
| --- | --- | --- |
| `/` | `GET` | Returns a JSON object describing the API. |
| `/users/register` | `POST` | Registers a user to the account table, hashing their password. |
| `/users/login` | `POST` | Validates a user's login credentials and assigns them a token if all is ok. |