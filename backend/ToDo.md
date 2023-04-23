## Description

This is a to do list that contains some of implementations I would do with more time, this was a project that had to be built in 4 hours.

## Better sync with the team

I would config the tool called Husky and convetional commits to all members of project needed to use convetional commits as chore: feat: to better maintainability.

## User and login implementation

I would create an user model and table and some CRUD operations to access that user and do login implementation with JWT or some external
tool like firebase.
Also the signup functionality and login functionality.

## User Operation
So with Login implemented I would not let the user access reminders created by others used except in the case that this user is an ADMIN.
Therefore the user couldn't acess or do alterations on someone's reminders.

## Docker

I would create a Docker Compose file to run my project on some production server with pm2 and nginx amplify to observe that deploy.
I would create another docker container running my PostgreSQL.

## Tests

I would build an database of tests to be used in the tests and build e2e tests.

## Database

Here i used sqlite file to be faster than PostgreSQL but I would change to PostgreSQL because of it's perfomance and scability.

## Error Handling

So in the time provided I didn't make handling errors so I would implement based on some conditions like: 

1. If you try to delete all reminders on a date that doesn't have any reminders I would notify the frontend that this operation is not allowed.
2. Or lost some connection to database or some user that isn't signed up.

## Delete unecessary reminders

I would implement a job that runs everyday and delete all past reminders.Therefore the database would be cleaner and more efficient.
