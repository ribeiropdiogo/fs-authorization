# fs-authorization
Filesystem with Authorization for Linux. This project was built for the **SSI** course at **University of Minho**, and consists in adding authorization to a FUSE filesystem. If a user wants to execute a certain operation on another user's resource, an access request is sent to the **authorization server**. The authorization server creates 2 codes: an **authorization code** that is sent to the resource's owner, and an **consulting code**, which is sent to the filesystem in order to check the request's status. If the request is granted withtin the defined time window(30s), the user is able to perform the operation.

## Getting Started

In order to run the authorization server, you need to have `node`, `npm` and `mongo` installed on your machine. After installing these prerequisites, execute the following commands on the server's directory:

1. `npm i`
2. `npm start`

## Authorization Server

The authorization server was built using `Node.js`and `MongoDB` and runs on **port 3000**. The routes exposed by the server are the following:

```javascript
// This route presents the Form Page were authorization codes can be inserted
GET /

// This route returns the specified request's authorization status (true or false)
GET /access/:id

// This route is used to create new authorization requests and returns the consult code
POST /access
```

The POST requests of this API need to have the following structure:
```
{
    "user": "chuck",
    "owner": "root",
    "operation": "read",
    "target": "top-secret-file.txt"
}
```

### Configuration file

The authorization server has an configuration file containing the username and respective email. This file is protected with superuser privileges in order to prevent unwanted access, and has the following structure:

```javascript
var config = {};

let users = new Map()

users.set('root',  {email: "root@email.com"})
users.set('chuck', {email: "chuck@norris.com"})

config.users = users;

module.exports = config;
```


## FUSE Filesystem
