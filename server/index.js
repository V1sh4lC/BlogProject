require('dotenv').config();
const client = require('mongoose');

const doc = {
    "name":"vishal"
}

async function dbConnect() {
    try {
        await client.connect(URI)
    } catch {
        alert("Error!!")
    }
}