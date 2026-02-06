import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as contactUsRoute } from './routes/contactRoute';
import { router as ProductRoute } from "./routes/productRoute";
import { router as userRoute } from "./routes/userRoute";
import { router as paymentRoute } from "./routes/paymentRoute";
import { router as rantingAndReviewsRoute } from "./routes/ratingAndReviewsRoute";
import { connect } from "../../../packages/shared/config/database";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connect();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp"
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

cloudinaryConnect();

app.use("/api/v1/auth", userRoute);
app.use("api/v1/contactUs", contactUsRoute);
app.use("api/v1/product", ProductRoute);
app.use("api/v1/payment", paymentRoute);
app.use("api/v1/ratingAndReviews", rantingAndReviewsRoute);

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to the api"
    })
});

app.listen(PORT, () => {
    console.log(`Your app is running on port ${PORT}`)
});

