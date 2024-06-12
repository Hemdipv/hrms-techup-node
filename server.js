const express = require("express");
const cors = require("cors");
// const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const fs = require("fs");
// var corsOptions = {
//   origin: [
//     "http://localhost:61775",
//     "http://localhost:3000",
//     "http://localhost:53748",
//     "http://localhost:50053",
//     "http://localhost:4200",
//   ],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

//middleware
// const __dirname = path.resolve();

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(express.static(`${__dirname} /uploads`));

// var storage = multer.diskStorage({
//     dest: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.png')
//     }
// })
// const upload = multer({ storage: storage });
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

app.use(cors());
// app.use(bodyParser.text({ type: '/' }));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload({
//     useTempFiles: true
// }))

app.use("/uploads", express.static("uploads"));
// app.use('/public', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('dev'));

// cloudinary.config({
//     cloud_name: "dgiye4daz",
//     api_key: "449121857626744",
//     api_secret: "xzjwfM_K105S1wdd8e1PPOLoVX0"
// });

// const jwt = require("jsonwebtoken");
// const verifyToken = async (req, res, next) => {
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   try {
//     const token = req.headers[tokenHeaderKey];

//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) {
//       return next();
//     } else {
//       // Access Denied
//       return res.status(401).send({
//         flag: false,
//         message: "Access Denied",
//       });
//     }
//   } catch (error) {
//     // Access Denied
//     return res.status(401).send({
//       flag: false,
//       message: "Access Denied",
//     });
//   }
// };

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//routers
const CandidateRouter = require("./routes/CandidateRouter");
const StaffRouter = require("./routes/StaffRouter");
const UserRouter = require("./routes/userRouter");
const UserLogin = require("./routes/userLogin");
const SkillRouter = require("./routes/skillRouter.js");
const RoleRouter = require("./routes/roleRouter.js");
const StatusRouter = require("./routes/statusRouter.js");
const RoleModuleRouter = require("./routes/roleModuleRouter.js");
const ModuleRouter = require("./routes/moduleRouter");
const DepartmentRouter = require("./routes/departmentRouter.js");
const verifyToken = require("./middleware/isAuth");
const developerRouter = require("./routes/developerRouter");
const contactUsRouter = require("./routes/ContactUsRouter");
const chatbotRouter = require("./routes/ChatbotRouter");
const developerCVRouter = require("./routes/developerCVRouter");
const leaveRouter = require("./routes/leaveRouter");

app.use("/api/candidate",  CandidateRouter);
app.use("/api/staff",  StaffRouter);
app.use("/api/user", UserLogin);
app.use("/api/user",  UserRouter);
app.use("/api/skill",  SkillRouter);
app.use("/api/role",  RoleRouter);
app.use("/api/status",  StatusRouter);
app.use("/api/roleModule",  RoleModuleRouter);
app.use("/api/module",  ModuleRouter);
app.use("/api/department",  DepartmentRouter);
app.use("/developer", developerRouter);
app.use("/contactus", contactUsRouter);
app.use("/chatbot", chatbotRouter);
app.use("/api", developerCVRouter);
app.use("/api/leave", leaveRouter);

// app.post("/api/create-html", (req, res) => {
//   const templateContent = fs.readFileSync("index.html", "utf8");

//   // Compile the template
//   const template = Handlebars.compile(templateContent);

//   // Generate HTML content by passing data to the template
//   const htmlContent = template(req.body);

//   // Write the HTML content to a file
//   fs.writeFileSync("user_info.html", htmlContent);

//   (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Set the HTML content on the page
//     await page.setContent(htmlContent);

//     await page.evaluate(() => {
//       const style = document.createElement("style");
//       style.textContent = `
//         @media screen {
//           body { visibility: hidden; }
//         }
//         @media print {
//           body { visibility: visible; }
//         }
//       `;
//       document.head.appendChild(style);
//     });

//     // Generate PDF
//     await page.pdf({
//       path: `uploads/developerCV/${req.body.name.trim()}.pdf`,
//       format: "A4",
//       printBackground: true,
//     });

//     await browser.close();
//     console.log("PDF file generated successfully.");
//     return res.status(200).json({
//       message: "CV Genrated successfully",

//       path: `/uploads/developerCV/${req.body.name.trim()}.pdf`,
//     });
//     // return res.sendFile(`${__dirname}/DeveloperCV/${req.body.name}.pdf`);
//   })();
// });
// testing api

// app.post('/api/test/fileUploads', upload.any(), (req, res) => {
//     res.json({ message: 'Hello' })

// })

// const PORT = process.env.PORT || 8088

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     // host: "smtp.gmail.com",
//     // port: 587,
//     // authentication: "plain",
//     type: OAuth2,
//     user: process.env.EMAIL,
//     pass: "Durgesh@123",
//     // scope: "https://mail.google.com/",
//     // token_type: "Bearer",
//     // expires_in: 3599,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     access_token:
//       "ya29.a0AfB_byCmzvBV-3ZmY0sHvSsuAlumyNyB4Srj3NbxtYsiF4fdxG7fDNRdYHA2d-snLZtw2tv4zKMgNpTFrwS8nA23vvGpTGBqtOzU3LiOmLPpYyNRLkguQUuffnGdqCpXkymBZzg6dDnb14yDmzXtSMMYdxmOYvU7ymYkaCgYKAaASAQ4SFQHGX2MirQr6jEy2KtT_tJZ2Jl5MxA0171",
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });

// var mailOptions = {
//   from: "durgesh.usefor.techup@gmail.com",
//   to: "durgesh.techup@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
//server
// const PORT = require("./config/config.env")
// console.log("PORT", PORT.PORT)
//Config
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  // console.log(`Server is running on port ${port}`);
});
