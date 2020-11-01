/******************************************************************************************

    nodemon (an automatic code reloader) by default, out of the box, does not work well with clustering.

    CLUSTERING IMPLEMENTATION: use 'Cluster' module

    Cluster module is responsible for creating:
        1. Cluster Manager AND 
        2. Worker Instance(s)
    
    by using cluster.fork() method.

******************************************************************************************/
// process.env.UV_THREADPOOL_SIZE = 1 describes this below:
//
// All of the children inside our cluster will ONLY have 1 thread available in thread pool. 
// Whenever we create a cluster, every single child has their own separate threadpool.
// Normally, every child has 4 threads it can use for computation.
process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

console.log(`Is Master:${cluster.isMaster}`);

// is the file being executed in 'master' mode?
if(cluster.isMaster) {
    // causes index.js to be executed again but in 'slave' ('child') mode.
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    // cluster.fork();
} else {
    // I am a slave (child), and I am going to act like a server
    const express = require('express');
    const crypto = require('crypto');
    const app = express();

    app.get('/', (req, res) => {
        // to REALLY simulate some amount of work in the cluster, 
        // we will be using pbkdf2() hashing function.
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('hello world');
        });        
    });

    app.get('/fast', (req, res) => {
        res.send('This is fast');
    });

    app.listen(3000, () => {
        console.log('server is listenting to port 3000');
    });
}

