import express from "express"
import dotenv from "dotenv"
import router from "./routes/userRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {console.log(`Сервер был запущен на порте ${PORT}`)})
