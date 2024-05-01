const http = require('http');
const fs = require('fs');

const data = require('./pokedex.json');

const buscarPokemon = (query) => {
    let pokemon = null;
    if (!isNaN(query)) {
        pokemon = data.find(p => p.id === parseInt(query));
    } else {
        pokemon = data.find(p => p.name.english.toLowerCase() === query.toLowerCase());
    }
    return pokemon;
};

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('¡Servidor Pokémon en funcionamiento!');
    } else {
        const partesURL = req.url.split('/');
        const nombrePokemon = partesURL[1];

        const pokemon = buscarPokemon(nombrePokemon);
        if (pokemon) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Tipo: [${pokemon.type.join(', ')}]\nHP: ${pokemon.base.HP}\nAttack: ${pokemon.base.Attack}\nDefense: ${pokemon.base.Defense}\nSp. Attack: ${pokemon.base['Sp. Attack']}\nSp. Defense: ${pokemon.base['Sp. Defense']}\nSpeed: ${pokemon.base.Speed}`);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Pokémon no encontrado');
        }
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor Pokémon en funcionamiento en el puerto ${PORT}`);
});
