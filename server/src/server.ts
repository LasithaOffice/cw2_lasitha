import express from 'express'
import notesRoute from './routes/notesRoutes.ts'
import { connectDB } from './config/db.ts'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Midleware
app.use(express.json())

//Custom midleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// })

//Routing
app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server stated on PORT:" + PORT)
  })
})


