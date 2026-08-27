// npm init
// npm i express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")
app.post("/cliente", async (req, res) => {
    try {
        const cliente = req.body
        const senhaCript = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCript

        // envio para o BD
        const resultado = await db.pool.query(
            `INSERT INTO cliente (
                nome, cpf, celular, email, senha
            ) VALUES ( ?, ?, ?, ?, ? )`,
            [cliente.nome, cliente.cpf, cliente.celular,
             cliente.email, cliente.senha]
        )
        res.status(201).json({
            mensagem: "Cliente cadastrado, ID = " + resultado[0].insertId
        })
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})

app.get("/cliente", async (req, res) => {
    try {

        const resultado = await db.pool.query(
            `SELECT id, nome, cpf, celular, email
             FROM cliente`
        )

        res.status(200).json(resultado[0])

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

app.get("/cliente/:id", async (req, res) => {
    try {

        const id = req.params.id

        const resultado = await db.pool.query(
            `SELECT id, nome, cpf, celular, email
             FROM cliente
             WHERE id = ?`,
            [id]
        )

        if (resultado[0].length === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }

        res.status(200).json(resultado[0][0])

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

app.put("/cliente/:id", async (req, res) => {
    try {

        const id = req.params.id
        const cliente = req.body

        const resultado = await db.pool.query(
            `UPDATE cliente
             SET nome = ?,
                 cpf = ?,
                 celular = ?,
                 email = ?
             WHERE id = ?`,
            [
                cliente.nome,
                cliente.cpf,
                cliente.celular,
                cliente.email,
                id
            ]
        )

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }

        res.status(200).json({
            mensagem: "Cliente alterado com sucesso"
        })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

app.delete("/cliente/:id", async (req, res) => {
    try {

        const id = req.params.id

        const resultado = await db.pool.query(
            `DELETE FROM cliente
             WHERE id = ?`,
            [id]
        )

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }

        res.status(200).json({
            mensagem: "Cliente excluído com sucesso"
        })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})


app.listen(port, () => {
    console.log("API rodando na porta " + port)
})
