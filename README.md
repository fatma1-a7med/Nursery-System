
*Nursery System Documentation*

*Project Overview*

This project is part of a small Nursery System, aiming to manage teachers, children, 
and administrative tasks. The system includes authentication, user management, and data management functionalities.


*Technologies Used*

Node.js
Express.js
MongoDB
Swagger
bcryptjs (for password encryption)
Multer (for file uploads)


*Routes Documentation*

     *Teacher Routes*
       1- Get All Teachers --> Retrieves a list of all teachers.
       2- Get Teacher by ID --> Retrieves details of a specific teacher by ID.
       3- Add New Teacher --> Adds a new teacher to the system.
       4- Update Teacher Data --> Updates the data of a specific teacher.
       5- Delete Teacher --> Deletes a specified teacher.
       6- Get All Class Supervisors --> Retrieves a list of all class supervisors.
       7- Change password --> Change  password of a specific teacher.

       
     *Child Routes*
       1- Get All Children --> Retrieves a list of all children.
       2- Get Child by ID --> Retrieves details of a specific child by ID.
       3- Add New Child --> Adds a new child to the system.
       4- Update Child Data --> Updates the data of a specific child.
       5- Delete Child --> Deletes a specified child.

     *Class Routes*
       1- Get All Classes --> Retrieves a list of all classes.
       2- Get Class by ID --> Retrieves details of a specific class by ID.
       3- Add New Class --> Adds a new class to the system.
       4- Update Class Data --> Updates the data of a specific class.
       5- Delete Class --> Deletes a specified class.
       6- Get Class Children Info --> Retrieves information of children in a specific class by class ID.
       7- Get Class Supervisor Info -->  Retrieves information of the supervisor of a specific class by class ID.



*Getting Started*

Install dependencies using *npm install*.
Set up the environment file (env) with required configurations.
Start the server using *npm run serve* (to run nodemon).
Access the Swagger documentation to explore available endpoints and their usage.
