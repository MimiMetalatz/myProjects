/******************************************************************************************

    nodemon (an automatic code reloader) by default, out of the box, does not work well with clustering.

    CLUSTERING IMPLEMENTATION: use 'Cluster' module

    Cluster module is responsible for creating:
        1. Cluster Manager AND 
        2. Worker Instance(s)
    
    by using cluster.fork() method.

******************************************************************************************/
const cluster = require('cluster');

console.log(`Is Master:${cluster.isMaster}`);

// is the file being executed in 'master' mode?
if(cluster.isMaster) {
    // causes index.js to be executed again but in 'slave' ('child') mode.
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    // I am a slave (child), and I am going to act like a server
    const express = require('express');
    const app = express();

    // purpose of this func is to simulate 
    // doing as much cpu processing power as possible.
    const doWork = duration => {
        const start = Date.now();
        let counter = 0;

        while(Date.now() - start < duration) {
            console.log(counter++);
        }

        console.log('DONE!');
    }


    app.get('/', (req, res) => {
        // This call is blocking the entire event loop for the current thread,
        // thus making the entire server doing nothing while this request is being processed.
        // As another requests come, they will be processed once the previous request has been finished.
        doWork(5000);
        res.send('hello world');
    });

    app.get('/fast', (req, res) => {
        res.send('This is fast');
    });

    app.listen(3000, () => {
        console.log('server is listenting to port 3000');
    });
}

