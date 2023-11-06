const arrData = require('./usb_data.json')
const express = require('express')
const fs = require('fs');
const interval = 200; // 100ms
const duration = 60 * 60 * 1000; // 60 minutes
const outputFile = 'usb_packets.json';
const app = express()
const cors = require('cors')

const port = 5001

app.use(cors({
  origin: '*'
}))
app.use(cors())

app.get('/', async (req, res) => await generatePackets())


app.get('/get-data', async (req, res) => {
  console.log("/get-data hittt")
  res.status(200).send({ data: arrData.table.slice(0, req.query.stopIndex) })
})

app.get('/get-data-pagination', async (req, res) => {
  console.log("/get-data-pagination hittt")
  res.status(200).send({ data: arrData.table.slice(req.query.startIndex, req.query.stopIndex) })
})

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})

const generatePackets = () => {
  const timestamp = new Date().toISOString();
  const packetName = 'PacketName'; // Generate your packet name
  const header = 'Header'; // Generate your header
  const payload = 'Payload'; // Generate your payload
  const error = 'Error'; // Generate your error data
  const rawData = 'RawData'; // Generate your raw data

  var obj = {
    table: []
  };
  
  for (let i = 1; i <= 100000; i++) {
    const packet = {
      Index: `${i}`, timestamp: `${timestamp}`, packetName: `${packetName} ${i}`, header: `${header}`, payload: `${payload}`, error: `${error}`, rawData: `${rawData}`
    };
    obj.table.push(packet);
  }

  var json = JSON.stringify(obj);

  fs.readFile('usb_data.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile('usb_data.json', json, 'utf8', err => {
        if (err) {
          console.log("errr", err)
        }
      }); // write it back 
    }
  });
};

// generatePackets()