
const express = require('express');
const app = express();
const port = 3000;  

app.use(express.static('public'));

function checkWorkingHours(req, res, next) {
    const now = new Date();
    const currentHour = now.getHours();  
    const currentDay = now.getDay(); 

    
    const isWorkingDay = currentDay >= 1 && currentDay <= 5;
    
 
    const isWorkingHour = currentHour >= 9 && currentHour < 17;

    if (isWorkingDay && isWorkingHour) {
        console.log('Accès autorisé : il est dans les heures et jours de travail');
        next();  
    } else {
        console.log('Accès refusé : en dehors des heures ou jours de travail');
        res.send(`
            <h1>Accès refusé</h1>
            <p>L'application est disponible uniquement du lundi au vendredi, de 9h00 à 17h00.</p>
        `);
    }
}

app.use(checkWorkingHours);

function checkTime(req, res, next) {
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour < 17) {
        console.log('Accès autorisé : il est entre 9h00 et 17h00');
        next();  
    } else {
        console.log('Accès refusé : en dehors des heures d\'ouverture');
        res.send(`
            <h1>Accès refusé</h1>
            <p>Le site est accessible uniquement de 9h00 à 17h00.</p>
        `);
    }
}


app.use(checkTime);


app.get('/', (req, res) => {
    res.send(`
        <link rel="stylesheet" href="/style.css">
        <h1>Bienvenue sur la page d'accueil</h1>
        <p>Ceci est la page d'accueil de notre site web.</p>
        <a href="/services">Nos services</a><br>
        <a href="/contact">Nous contacter</a>
    `);
});

app.get('/services', (req, res) => {
    res.send(`
        <h1>Nos services</h1>
        <p>Découvrez nos services ici.</p>
        <a href="/">Retour à l'accueil</a><br>
        <a href="/contact">Nous contacter</a>
    `);
});

app.get('/contact', (req, res) => {
    res.send(`
        <h1>Nous contacter</h1>
        <p>Vous pouvez nous contacter via cette page.</p>
        <a href="/">Retour à l'accueil</a><br>
        <a href="/services">Nos services</a>
    `);
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:${port}`);
});
