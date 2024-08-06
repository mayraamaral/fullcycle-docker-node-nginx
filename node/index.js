const express = require('express')
const app = express()

const port = 3000

const config = {
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const insert = `INSERT INTO people(name) values('Mayra Amaral')`

connection.query(insert, err => {
    if(err) console.error("Erro ao tentar inserir dados no banco de dados")
})

const select = `SELECT * FROM people`

function selectAndCreateHtmlFromDatabase() {
    return new Promise((resolve, reject) => {
        connection.query(select, (err, results) => {
            if (err) {
                console.error("Erro ao tentar carregar dados do banco de dados:", err);
                reject("Erro ao tentar carregar dados do banco de dados");

                return;
            }

            let html = `<h1>Full Cycle Rocks!!</h1>
                        <p>Resultados do banco:</p>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Id</th>    
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>`;

            results.forEach(row => {
                html += `<tr>
                            <td>${row.id}</td>
                            <td>${row.name}</td>
                        </tr>`;
            });

            html += `</tbody>
                    </table>`;

            resolve(html);
        });
    });
}

app.get('/', (req, res) => {
    selectAndCreateHtmlFromDatabase()
    .then(html => res.send(html))
    .catch(err => {
        res.send(`<p>Houve um erro ao tentar se conectar com o banco</p>`)
    })
})

process.on('SIGINT', () => {
    connection.end(err => {
        if (err) {
            console.error('Erro ao fechar a conexão com o banco de dados: ', err);
        } else {
            console.log('\nConexão com o banco de dados fechada');
        }
        process.exit(0);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})