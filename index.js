const express = require('express');
const cowsay = require('cowsay');
const cors = require('cors');
const path = require('path');




// create server
const app = express();


// change to serve 
app.use(express.static(path.join(__dirname, 'client/build')));


// basic route
app.get('/api/cat',cors(), 
        async (req, res, next) => {
            try {
                const mow = cowsay.think({
                    text : "One one one ice-cream!",
                    f: "bill-the-cat"
                });
                res.json({ mow });
            } catch (e) {
                next(e);
            }
        })




// api route
app.get('/api/cat/:say/', cors(),
        async (req, res, next) => {
            try {
                const text = req.params.say;
                console.log(text);
                const mow = cowsay.say({ text, f: "bill-the-cat" });
                res.json({ mow });
            } catch (e) {
                next(e);
            }
        }
)



app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})




// port and start

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})