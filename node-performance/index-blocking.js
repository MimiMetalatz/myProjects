/*
    nodemon (an automatic code reloader) by default, out of the box, does not work well with clustering.
*/
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
}

app.get('/', (req, res) => {
    // This call is blocking the entire event loop for the current thread,
    // thus making the entire server doing nothing while this request is being processed.
    // As another requests come, they will be processed once the previous request has been finished.
    doWork(5000);
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('server is listenting to port 3000');
})