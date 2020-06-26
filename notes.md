# Notes about Microservices with NodeJs and React course ✍

#### What is a microservice?

- ***Monolithic Solution***
    - All the code necessary to create and mantain all the features of app, in a 'box', only in one solution.
    Problem? - If some part of app crashes, all the others features crashes togheter.

- ***Microservices Solution***
    - All the code necessary to create **one stand-alone feature** is created with:
        - Your own router
        - Your own auth module
        - Even your own database
    
So looking to the microservices solution, if some random app feature crashes, all the another features of the app keep working as well. 🙋‍♂️

So... what is a microservice? (Concept, working definition)
A microservice is the architeture solution where a microservice contains all the code required to make **one feature** work correctly.

#### Challenges about microservices

- Data management between services
    - Each service gets its own database (if it needs one)
    - Services will **never**, ever reach into another services database

#### Database-per-service Pattern
That just means every service has its own database, and we want each service to run independently of other services.

Database schema/structure might change unexpectedly. For example, service A have some select to service B database (that's not what we want ❌)... and for some reason, the service B team change the B database schema, something like change some schema property:

**From:**
```json
{"name": "Felipe"};
```
**To:**
```json
{"firstName": "Felipe"};
```
...
So in this case, the select from service A to the service B database will crash.
...

Antoher reason is that some services might function more efficiently with differnt types of databases. (SQL, NoSQL...)

**Synchronous communication style in microservices:**
Services communicate with each other using direct request, not necessary http requests, but any kind of direct communication between the service A and service B.

- **Up sides**
    - Conceptually easy to understand 👍
    - A new service won't need a database if some another service, already have on their own database, the information that we need on service D query.
- **Down sides**
    - Introduces a dependency between services.
    - Any inter-service request fails, the overall request fails.
    - The entire request is only as fast as the slowlest request. 
    **For example**... if some request take 10ms, and another one that we need to get all the data as we want to return to our request, take for some reason, 20s, all the request on our new service, will take 20s with 10ms.
    - Can easily introduce webs of requests (Services three dependencies).

**Asynchronous communication style in microservices**
Sercices communicate with each other using events.

**Event-based communication:**
