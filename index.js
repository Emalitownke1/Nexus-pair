const express = require('express');
const path = require('path');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let qrRoute = require('./routers/qr');
let pairRoute = require('./routers/pair');
let validateRoute = require('./routers/validate');
require('events').EventEmitter.defaultMaxListeners = 1500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/qr', qrRoute);
app.use('/code', pairRoute);
app.use('/giftedValidate.php', validateRoute);


app.get('/validate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'validate.html'));
});

app.get('/pair', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
Deployment Successful!

 Gifted-Session-Server Running on http://localhost:` + PORT);
    
    // Verify environment variables
    console.log('\n=== ENVIRONMENT VALIDATION ===');
    console.log(`MONGODB_URI configured: ${!!process.env.MONGODB_URI}`);
    if (process.env.MONGODB_URI) {
        console.log(`MONGODB_URI starts with mongodb: ${process.env.MONGODB_URI.startsWith('mongodb')}`);
    } else {
        console.error('❌ WARNING: MONGODB_URI not found in environment variables');
    }
    console.log('===============================\n');
})

module.exports = app
