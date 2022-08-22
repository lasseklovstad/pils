``docker run --name pils-db-postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:14.2``

## Intellij plugins
Tailwind Css

## Deploy 
install heroku cli and run
````bash
heroku login
heroku git:remote -a pilscontroller
git push heroku
````
