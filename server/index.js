const express = require("express");
const mongoose = require("mongoose");

//Allow our backend application to be available to our frontend application
//Allows us to controll the app's Cross Origin Resource Sharing Settings
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

//[SECTION] Environment setup
//const port = 4000;
require('dotenv').config();

const app = express();

app.use(express.json());

const corsOptions = {

	origin: *,
	credentials: true,
	optionsSuccessStatus: 200
}


app.use(cors(corsOptions));


//[SECTION] Database Connection
//Connect to our MongoDB database
mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
// app.use("/products", productRoutes);
// app.use("/cart", cartRoutes);
// app.use("/orders", orderRoutes);

/*if(require.main === module) {

	app.listen(process.env.PORT || 3000, () => {
		console.log(`API is now online on port ${process.env.PORT || 3000}`);
	})
}*/

module.exports = { app, mongoose };