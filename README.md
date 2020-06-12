# Project ReadMe

### *Need to planet hop? Interested in interstellar exploration? We have your vehicle needs covered!*

### Project Name:
> **Custom Crafts** created by: *Zachary Rizer, Ian Magenta, William Schrader & Abdullah Wafy*

### Project Description:
> Custom Crafts is basically a store application where you can view and purchase custom-designed spaceships/spacecrafts. The app allows users to sign-in and become return customers with profile and purchase history features. Customers may shop for different and varying styles of spacecrafts \- performance \(i.e. racing), luxury, military, etc. \- designed to suit their taste and whet their palettes.

* Screenshots of App:
![GitHub Logo](/documentation/ReadmeScreenShot1.png)
![GitHub Logo](/documentation/ReadmeScreenShot2.png)
![GitHub Logo](/documentation/ReadmeScreenShot3.png)
![GitHub Logo](/documentation/ReadmeScreenShot4.png)
![GitHub Logo](/documentation/ReadmeScreenShot5.png)
![GitHub Logo](/documentation/ReadmeScreenShot6.png)
![GitHub Logo](/documentation/ReadmeScreenShot7.png)
![GitHub Logo](/documentation/ReadmeScreenShot8.png)

* Backend Repo Link:
[GitHub](https://github.com/ZacharyRizer/Custom-Crafts-api)

* Link to App - Heroku Deployed:
[Heroku](https://customcrafts.herokuapp.com)

* FeatureList Documentation link:
[GitHub](https://github.com/ZacharyRizer/Custom-Crafts/blob/master/documentation/featureList.md)

* Database Schema link:
[GitHub](https://github.com/ZacharyRizer/Custom-Crafts/blob/master/documentation/database.md)

* Code Snippets:
  * Frontend Shopping Cart Quantity \(Increasing/Decreasing) Implementation:
![GitHub Logo](/documentation/CodeSnippet-cartjs.png)
  * Frontend Sidebar dropdown menu implementation:
![GitHub Logo](/documentation/CodeSnippet-dropdown-sidebar.png)
  * Backend GraphQL implementation:
![GitHub Logo](/documentation/CodeSnippet-gqlschema.png)

### How to install, run and use the App:
1. Installation:
   * Copy frontend and backend repos from Github.
     * git clone in directory of choice.
   * Frontend:
     * cd into directory where frontend repo was cloned.
     * npm intall in terminal \(for dependencies)
   * Backend:
     * cd into directory where backend repo was cloned.
     * pipenv intall in terminal \(for dependencies)
     * create user \*custom_crafts\* with password and createdb, database \*custom_crafts_db\* with owner in psql.
     * create .env file with variables from .env example file: ```
FLASK_ENV=development
SECRET_KEY=secrety_key
DATABASE_URL='postgresql://custom_crafts:password@localhost/custom_crafts_db'```
     * flask migrate command: flask db migrate
     * then: flask db upgrade
     * seed data with command: python3 seed.py
     * get into shell: pipenv shell
2. Run app:
   * Frontend:
     * npm start
   * Backend:
     * if in shell: flask run
     * otherwise: pipenv run flask run
3. localhost:3000 for frontend, localhost:5000 for backend
4. login with github or gmail via Auth0 to use app fully.
5. Enjoy! :rocket:

### Technologies used:
* HTML5
* CSS3
* JavaScript
* React.js
* JSX
* React Hooks
* Python3
* Flask (server)
* PostgreSQL (RDBMS)
* SQLAlchemy (ORM)
* Alembic
* GraphQL (API Routes)
* Apollo
* Auth0
* Arwes Sci-Fi library: [Arwes](https://arwes.dev/)
* Material Design icons: [MaterialDesignIcons](https://materialdesignicons.com/)
* Visual Studio Code editor
* GitHub version control
* Model Viewer: [ModelViewer](https://modelviewer.dev/)
* Blender 3D Modeling: [Blender](https://www.blender.org/)

*end of Readme*
