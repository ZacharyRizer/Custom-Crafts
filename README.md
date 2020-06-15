# Custom Crafts

### *Need to planet hop? Interested in interstellar exploration? We have your vehicle needs covered!*

#### Created By:
> *Zachary Rizer, Ian Magenta, William Schrader & Abdullah Wafy*

### Project Description:
> Custom Crafts is a store application where you can view and purchase custom-designed spaceships/spacecrafts. The app allows users to sign-in and become return customers with profile and purchase history features. Customers may shop for different and varying styles of spacecrafts \- performance \(i.e. racing), luxury, military, etc. \- designed to suit their taste and whet their palates.

* Screenshots of App:
![GitHub Logo](/documentation/ReadmeScreenShot2.png)
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
     * pipenv install in terminal \(for dependencies)
     * create user \*custom_crafts\* with password and createdb, database \*custom_crafts_db\* with owner in psql.
     * create .env file with variables from .env example file:
     * get into shell: pipenv shell
     * then: flask db upgrade
     * seed data with command: python3 seed.py
2. Run app:
   * Frontend:
     * npm start
   * Backend:
     * if in shell: flask run
     * otherwise: pipenv run flask run
3. login with github or gmail via Auth0 to use app fully.
4. Alternatively, you can log-in as a Demo User via Auth0 as user: demoadmin@demo.com, password: DemoAdmin0
5. Enjoy! :rocket:

### Technologies used:
* HTML5
* CSS3
* JavaScript
* React.js (with hooks)
* Python3
* Flask (server)
* PostgreSQL (RDBMS)
* SQLAlchemy (ORM)
* Alembic
* GraphQL (API)
* Apollo
* Auth0
* Arwes Sci-Fi library: [Arwes](https://arwes.dev/)
* Material Design icons: [MaterialDesignIcons](https://materialdesignicons.com/)
* GitHub version control
* Model Viewer: [ModelViewer](https://modelviewer.dev/)
* Blender 3D Modeling: [Blender](https://www.blender.org/)
* Heroku (app deployment for production)

*end of Readme*
