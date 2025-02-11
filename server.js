import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Configurazione della connessione al database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        console.error(err);
    } else {
        console.log('MySQL Connected...');
    }
});

// Crea un nuovo record
app.post('/', (req, res) => {
    const newUser = req.body.name;
    const sql = 'INSERT INTO users (`name`) VALUES (?)';
    db.query(sql, [newUser], (err, result) => {
        if(!err){
            res.status(201).send({message: 'Utente creato con successo'});
        } else {
            res.status(500).json({message: 'Errore durante la creazione dell\'utente'});
        }
    });
});

// Questo serve per dare la lista degli id al client
app.get('/', (req, res) => {
    const sql = 'SELECT id FROM users';
    db.query(sql, (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            res.status(500).json({message: 'Errore durante la lettura degli ID degli utenti'});
        }
    });
});

// Aggiorno il record che ha l'id passato

app.put('/', (req, res) => {
    const id = req.body.id;
    const newName = req.body.name;
    const sql = 'UPDATE users SET name = ? WHERE id = ?';
    db.query(sql, [newName, id], (err, result) => {
        if(!err){
            res.status(200).send({message: 'Utente aggiornato con successo'});
        } else {
            res.status(500).json({message: 'Errore durante l\'aggiornamento dell\'utente'});
        }
    });
});

// Cancello il record che ha l'id passato
app.delete('/', (req, res) => {
    const id = req.body.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if(!err){
            res.status(200).send({message: 'Utente eliminato con successo'});
        } else {
            res.status(500).json({message: 'Errore durante l\'eliminazione dell\'utente'});
        }
    });
});

// GET degli utenti

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            res.status(500).json({message: 'Errore durante la lettura degli utenti'});
        }
    });
});

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            res.status(500).json({message: 'Errore durante la lettura dell\'utente'});
        }
    });
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});