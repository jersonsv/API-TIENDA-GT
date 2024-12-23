import express from 'express'
import  morgan from 'morgan'
import productRouter from "../routers/product.router.js"
import categoriaRouter from '../routers/cateogriaProduct.router.js'
import estado from '../routers/estado.router.js'
import cliente from '../routers/cliente.router.js'
import usuario from '../routers/usuario.router.js'
import orden from '../routers/orden.router.js'
import authRouter from '../routers/auth.router.js'

const app = express()
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('This is Express Love')
})

app.use(express.json())
//Registrar routers
app.use('/api/', authRouter);
app.use("/api/",productRouter)
app.use("/api/",categoriaRouter)
app.use("/api/",estado)
app.use("/api/",cliente)
app.use("/api/",usuario)
app.use("/api/",orden)

export default app;