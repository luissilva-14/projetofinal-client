// npm init -y
// npm i express mysql2 bcrypt jsonwebtoken dotenv cors

require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const db = require("./db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const { criar_tabelas } = require("./migration")

app.use(express.json())
app.use(cors())

// ===================== ROTAS =====================

// POST /cliente  → Cadastro
app.post("/cliente", async (req, res) => {
    try {
        const cliente = req.body
        const senhaCript = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCript

        const resultado = await db.pool.query(
            `INSERT INTO cliente (nome, cpf, celular, email, senha)
             VALUES (?, ?, ?, ?, ?)`,
            [cliente.nome, cliente.cpf, cliente.celular, cliente.email, cliente.senha]
        )

        res.status(201).json({
            msg: "Cliente cadastrado com sucesso! ID = " + resultado[0].insertId
        })
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
})

// POST /login
app.post("/login", async (req, res) => {
    try {
        const user = req.body

        const resultado = await db.pool.query(
            "SELECT id, nome, email, senha FROM cliente WHERE email = ?",
            [user.email]
        )

        const dados_bd = resultado[0][0]

        if (!dados_bd) {
            return res.status(401).json({ msg: "Email não cadastrado!" })
        }

        const senha_valida = await bcrypt.compare(user.senha, dados_bd.senha)

        if (!senha_valida) {
            return res.status(401).json({ msg: "Credenciais inválidas!" })
        }

        const payload = {
            id: dados_bd.id,
            email: dados_bd.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })

        return res.status(200).json({
            nome: dados_bd.nome,
            token: token
        })

    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
})

// Middleware de autenticação JWT
function autenticar(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            erro: "Token não enviado. Use: Authorization Bearer <token>"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ erro: "Token inválido ou expirado" })
        }
        req.usuario = usuario
        next()
    })
}

// GET /cliente/perfil  → Rota protegida
app.get("/cliente/perfil", autenticar, async (req, res) => {
    try {
        const id = req.usuario.id
        const result = await db.pool.query(
            "SELECT id, nome, cpf, celular, email FROM cliente WHERE id = ?",
            [id]
        )

        const perfil = result[0][0]

        if (!perfil) {
            return res.status(404).json({ erro: "Cliente não encontrado" })
        }

        res.status(200).json(perfil)
    } catch (err) {
        res.status(500).json({ erro: "Erro interno do servidor" })
    }
})

// ===================== INICIAR SERVIDOR =====================

async function iniciar() {
    try {
        console.log("🔄 Executando migration...")
        await criar_tabelas()          // ← Automação da migration
        console.log("✅ Migration concluída!")

        app.listen(port, () => {
            console.log(`🚀 API rodando na porta ${port}`)
        })
    } catch (error) {
        console.error("❌ Erro ao iniciar a API:", error.message)
        process.exit(1)
    }
}

iniciar()