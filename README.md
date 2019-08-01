# GraphQL-API-MongoDB-Database-Search
Quickly integrate a search feature to your app. Search for different values in your database.

**Tools**
* [x] **[Node.JS](https://nodejs.org)** v10.x.x
* [x] **[Express](https://github.com/expressjs/express)**
* [x] [MongoDB](https://www.mongodb.com/) with [Mongoose](https://github.com/Automattic/mongoose)
* [x] **[GraphQL](http://graphql.org/)**
* [x] [Cluster](https://nodejs.org/api/cluster.html)

**Debugging Tools**
* [x] [ESLint](https://eslint.org/) v5.x.x

## Usage

Install dependencies
```
$ npm install
```
or
```
yarn
```

For development
```bash
$ npm start
```

Run ESLint to check for ES6
```bash
$ npm run lint
```

Run ESLint to fix all fixable errors
```bash
$ npm run lint-fix
```

For production
```bash
$ npm run cluster
```

### How to Use

Update the .env file to change the API secret key, and add your database URL's and secret keys. Currently, out of the box, this app allows for 5 different databases, but you can easily change this by adding or removing them. 

To add a database, go to the /main/configs/db folder and update the two files 'db_configs.js' and 'db_connection.js'. Follow the same structure of the current databases, and the app will recognize them.

The lastly, go to the /main/configs/searchSchema file and update the array the format shown. 
Note: All variables searched must be on the surface document level. This does not search for elements within arrays or objects.

Accepted Searching Variable Types:
* [x] String
* [x] Int
* [x] Float
* [x] Boolean

```txt
module.exports = [
  {
    model: 'ModelName',
    database: 'datbase (ex: db1)',
    variables: [
      ['variableName', 'variableType']
    ]
  },
  {
    model: 'Admin',
    database: 'db1',
    variables: [
      // [variableName, variableType]
      ['username', 'String'],
      ['ofAge', 'Boolean'],
      ['age', 'Int'],
      ['weight', 'Float']
    ]
  },
];
```

Start up the server and make a 'GET' request to it.
An example of the call using [Superagent](https://www.npmjs.com/package/superagent):
```txt
const result = await superagent.get('${process.env.API_URL}/search')
  .send({
    key: process.env.API_KEY,
    search: req.body.searchInput
  }).then(response => response.body);
```