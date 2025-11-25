const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // cors paketini ekleyin

const app = express();
app.use(express.json()); // JSON verileri işlemek için gerekli middleware
app.use(cors()); // CORS'u etkinleştirin

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'hospital'; // Veritabanı adı

// Asenkron işlevle MongoDB'ye bağlanma ve veriyi kaydetme
app.post('/submit', async (req, res) => {
  const { name, number, email, date } = req.body; // İstek gövdesinden verileri çıkarın

  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Veritabanına başarıyla bağlanıldı');

    const db = client.db(dbName);
    const collection = db.collection('appointments');

    const appointment = { name, number, email, date };
    const result = await collection.insertOne(appointment);

    console.log('Randevu başarıyla kaydedildi:', result.insertedId);
    res.status(201).send('Randevu başarıyla kaydedildi');

    client.close();
  } catch (err) {
    console.error('Veritabanına bağlanılamadı veya randevu kaydedilemedi:', err);
    res.status(500).send('Veritabanına bağlanılamadı veya randevu kaydedilemedi');
  }
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
