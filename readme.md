npm init --yes (optional)
npm i install dotenv --save
npm i --save lodash   
npm install mongoose cors body-parser --save
npm install express --save
npm i joi
npm i lodash
npm i express
npm i -g nodemon (ex: nodemon index.js)

Not installed: https://ejs.co/
npm install ejs

About lodash
https://zetcode.com/javascript/lodash/

#Following project structure
Source for folder structure
https://soshace.com/how-to-architect-a-node-js-project-from-ground-up/


#DEV ED
NodeJs
https://www.youtube.com/watch?v=vjf774RKrLc

Build A Node.js API Authentication With JWT Tutorial
https://youtu.be/2jqok-WgelI


Mongo DB
1. Go to /Users/ravi/Sites/mongodb-macos-x86_64-4.4.6/bin
2. Run on terminal ./mongod --dbpath ~/Sites/study/nodejs/data/db

OR

1. ./mongod --dbpath ~/Sites/study/nodejs/data/db
2. ./mongod
    --some terminal command----
    show dbs
    use <database name>
    show collections
3. npm i -D handlebars@4.5.0

#for testing 
https://mlab.com/


Node js is Asynchronous
https://www.youtube.com/watch?v=TlB_eWDSMt4
https://www.youtube.com/watch?v=RLtyhwFtXQA
https://www.youtube.com/watch?v=JnvKXcSI7yk


@package
npm install qs
npm install dotenv

#for validation
npm install @hapi/joi

#For hashing password
npm install bcryptjs

#JWT
https://www.iana.org/assignments/jwt/jwt.xhtml
npm install jsonwebtoken


#mlab.com
user: pc_user
password: T3zrTKS0GRV0otzm

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://pc_user:<password>@pettycashcluster.m3cqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



*******************************************
OK, I'd suggest you read the other referenced issues to understand the asynchronous issue better. Here's a solution with your code:

  function findemail(val, fn){
        user.findOne({ email : val }, function (err, person) {
            if (err) return fn(false);
            fn(person != null);
       });
   }

   router.post('/avail', function(req, res, next){
        \\somecodes
        var email = \\something
        findemail(email, function(result) {
            res.send(result);
        });
   });

#on terminal (to generate secret key)
node
require('crypto').randomBytes(64).toString('hex')


npm install --save morgan http-errors

#REDIS
1. Install bew
2. brew install redis
3. npm install -g redis-commander
4. Run "redis-commander" on terminal
5. npm install redis
6. Terminal command "redis-cli"

To start redis:
  brew services start redis
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/redis/bin/redis-server /usr/local/etc/redis.conf

#error while installing redis
Error: Could not symlink Frameworks/Python.framework/Versions/3.9/Headers
Target /usr/local/Frameworks/Python.framework/Versions/3.9/Headers
is a symlink belonging to python@3.9. You can unlink it:
  brew unlink python@3.9

To force the link and overwrite all conflicting files:
  brew link --overwrite python@3.9

To list all files that would be deleted:
  brew link --overwrite --dry-run python@3.9


  ----------------------NOTE-------------------

My two cents

1. Export
####ES6####

myClass.js

export class MyClass1 {
}
export class MyClass2 {
}
other.js

import { MyClass1, MyClass2 } from './myClass';



####CommonJS Alternative####

myClass.js

class MyClass1 {
}
class MyClass2 {
}
module.exports = { MyClass1, MyClass2 }
// or
// exports = { MyClass1, MyClass2 };
other.js

const { MyClass1, MyClass2 } = require('./myClass');


2. Export Default
####ES6####

myClass.js

export default class MyClass {
}
other.js

import MyClass from './myClass';



####CommonJS Alternative####

myClass.js

module.exports = class MyClass1 {
}
other.js

const MyClass = require('./myClass');
Hope this helps
  ----------------------------