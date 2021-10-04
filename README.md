# Employee-review-system
This application has following features with three views
1. Admin view
```sh
Add/remove/update/view employees
Add/update/view performance reviews
Assign employees to participate in another employee's performance review
```
2. Employee view
```sh
List of performance review requiring feedback 
An employee can register, only admin can make an employee an admin
```
3. sign in for admin and user.
```sh
also has super user for initialting the application once
Make 1 login for admin and employee
```

## How to setup on local machine
1. To use this repository your machine should have [node](https://nodejs.org/en/), npm, [monogodb](https://docs.mongodb.com/manual/installation/) and [git](https://git-scm.com/downloads). to check version exicute these.
```go
node --version
npm --version
git --version
```
2. Now clone this repository
```go
git clone https://github.com/wizzenalum/employee-review-system.git
```
3. Change directory to Ecomerce-API
```go
cd employee-review-system
```

3. Install dependencies
```go
npm install --save
```
4. Start mongo db this command may differ... system to system.
```go
sudo systemctl start mongod
```
5. That's... it  run the application
```go
npm start
```
## To test all the routes you can utilize rest-client.
1. i assume your system has vs-code and rest-client preinstalled
2. this api already contain one file called route-testing which has all the routes that it support.
3. you just have to click on send request only.
4. remember to change the id for different delte and update.

## File structure
here you are looking at directory structure with root level files only.
```sh
employee-review-system
├── assets
│   ├── images
│   ├── scripts
│   ├── scss
│   └── styles
├── node-modules
├── configs
├── controllers
├── index.js
├── models
├── package-lock.json
├── package.json
├── readme.md
├── routers
└── views
    ├── authentication
    └── partials
```


