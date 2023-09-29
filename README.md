# TagHash Assignment - Polling system and trend analysis
## **Node.js + express + React + Postgres + redis 🔥 🔥 🔥**

## Quick Introduction:
This assignment is given for the full-stack intern role at TagHash. It is a polling system and based on the poll data it shows some charts. \
In this project, I've used node.js and express for the backend, react for the frontend, PostgreSQL for the database, and Introduced caching(Redis + upstash) mechanism.

## Infrastructure Diagram the polling system:

![diagram](https://github.com/cybrog-x/Polling-System/assets/97340980/c3d45af2-8259-459c-ae88-6ced56707507)

## Assignment Demo: 
https://drive.google.com/file/d/18hJCP4X6pn9FDGu2MWzd9HdDaCcoU89v/view?usp=sharing

## Postman API Link:
https://www.postman.com/spacecraft-geoscientist-33857433/workspace/taghash/request/23164752-8f4cfdc5-9e13-4153-9d45-b2766c5ee7ef

## Assignment walkthrough

(Note: While completing the assignment my main focus was to create all the functionalities mentioned in the assignment. \
So, I've created a very simple Frontend by using React, Tailwind CSS, and Chakra UI. 
Also, just to show my skills and ensure my internship I have created an extra Doughnut Chart and used Redis for query optimization.)


**Input Page** 👇\
On this page, the user can give the name and choice as input. The current date is automatically detected.  
![Taghash1](https://github.com/cybrog-x/Polling-System/assets/97340980/29e0d42c-94e9-46ec-83c0-a7a0516778e0)


**Analysis Page** 👇\
This page included a Bar Chart, Line Chart, Doughnut Chart, and all the polls.\
The doughnut chart was not mentioned in the assignment but I have added it just to show my skills.
![taghash2](https://github.com/cybrog-x/Polling-System/assets/97340980/92b70534-b5ff-4729-af40-19a8ea728c8f)

## Optimization using a caching mechanism 
Again just to ensure my internship, I have used implemented caching using (Redis + upstash) which reduces the query response time by 35%-40%.
\
**Demo in the postman**

https://github.com/cybrog-x/Polling-System/assets/97340980/f22c0946-216e-4ddb-934b-2fae5c3e5398

**Backend with Redis link**
Since it was not mentioned in the assignment. So, I thought to keep the backend with Redis in a separate repository.

https://github.com/cybrog-x/Polling-System-Backend

## Changes I was told to make
**1. Add pagination when you fetch all data**\
**2. Use Knex ORM to write the query**\
**3. Group the date of the line chart.**

**Pagination 👇**
![taghash3](https://github.com/cybrog-x/Polling-System/assets/97340980/a7e3d29c-7639-4d02-bdc8-8a2a2bd2d691)


**Filter Date 👇**
![taghash4](https://github.com/cybrog-x/Polling-System/assets/97340980/8c1db63b-c716-4711-88ee-542e10e0d3d0)




## Dependencies/Libraries Required:

**Client Side**

1) React
2) Tailwind CSS
3) Chakra UI
4) Chart.js
5) React Icons
6) Redux Toolkit
7) React router dom

**Server Side**

1) Node.js
2) Express
3) Cors
4) Dotenv
5) nodemon
6) pg
7) ioredis
8) Knex

**Databases**

1) Postgres SQL
2) Redis + Upstash
   
## How to run this Project 

To run this project, you should have node.js and Postgres installed in your system.
Then, clone this repository. 
Run this command  ```npm install ---legacy-peer-deps``` in the both frontend and backend file. 
Create a config.env in the config file of the backend. Add these environment variables there. 

`PORT`
`FRONTEND_URL`
`DATABASE_PASSWORD`
`REDIS_URL`
\
Create a new database in the Postgres and add this table. 
```CREATE TABLE data(
  voter_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  choice BOOLEAN,
  date DATE
);
```

Now, to run the server give the command ```npm run dev``` in the backend folder and to run the frontend give the command ```npm run dev``` in the main folder. 



## Closing Note:
I successfully completed this assignment for the full-stack internship role at TagHash.
