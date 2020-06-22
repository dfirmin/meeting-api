# level-ten-api

## ERD:

![Entity Relationship Diagram](./erd.jpg)

## Route Structure

GET /series?teamId=1&adminUserId=0
?GET /series/:id
GET /series/:seriesId/occurrences
GET /series/:seriesId/sections

POST /series
PUT /series/:id

GET /teams/:teamId/users

GET /occurrences/:id
PUT /occurrences/:id

POST /ids
PUT /ids/:id

GET /action-items?userId=0&complete=false
POST /action-items
PUT /action-items/:id

POST /updates
PUT /updates/:id