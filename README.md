# Welcome to Hangin!

***[Hangin](https://hangin-hangin.herokuapp.com/)*** is a clone of LinkedIn that focuses on connecting aerialists and cultivating a community for professional networking and collaboration opportunities.

## Overall Structure

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white%22%3E" /> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white%22/%3E" />
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white">
<img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white%22%3E" />
<img alt="Python" src="https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white"/>
<img alt="Flask" src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/SQL-Alchemy-orange?style=for-the-badge&logoColor=white">
<img alt="Heroku" src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white"/>

## Technologies Used
* React.js/Redux
* SQLAlchemy
* CSS3
* Flask
* Unsplash Image API
* AWS S3

## How to Use Hangin

1.  Go to  [https://hangin-hangin.herokuapp.com/](https://hangin-hangin.herokuapp.com/)
2. Choose Demo or create an account to connect with other users. 
3. Users can network by following other users, post images or videos and comment and like other users posts.

## UI Design

### Splash page:
<a href="https://ibb.co/Qfx0c2C"><img src="https://i.ibb.co/rmX9tCc/Screen-Shot-2021-07-29-at-19-59-01.png" alt="Screen-Shot-2021-07-29-at-19-59-01" border="0"></a><br />

### Feed page:
   
<a href="https://ibb.co/Mcy6CCC"><img src="https://i.ibb.co/ZBRmMMM/Screen-Shot-2021-07-29-at-20-00-27.png" alt="Screen-Shot-2021-07-29-at-20-00-27" border="0"></a><br />

### Networking page:
   
<a href="https://ibb.co/Ch0kJKL"><img src="https://i.ibb.co/nzkH3Mp/Screen-Shot-2021-07-29-at-20-01-05.png" alt="Screen-Shot-2021-07-29-at-20-01-05" border="0"></a>

### Comments:
   
<a href="https://ibb.co/RHcwRp8"><img src="https://i.ibb.co/MN70FDd/Screen-Shot-2021-07-29-at-20-03-50.png" alt="Screen-Shot-2021-07-29-at-20-03-50" border="0"></a>

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/mimike/hangIn
   ```

2. Install dependencies
pip install --dev -r dev-requirements.txt && pip install -r requirements.txt

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***



