import express from 'express'
import { connectDB } from './config/db.ts'
import dotenv from 'dotenv'
import notesRoute from './routes/notesRoutes.ts';
import cors from 'cors'
import authRoute from './routes/authRoutes.ts';
import uploadRoute from './routes/uploadRoutes.ts';
import userRoute from './routes/userRoutes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Midleware
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))
//Custom midleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// })

//Routing
app.use("/api/notes", notesRoute);
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/user", userRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server stated on PORT:" + PORT)
  })
})


