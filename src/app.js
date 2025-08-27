
const express = require("express");
const session = require("express-session");
const path = require("path");
require("../src/database/connection");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const app = express();

const Register = require("./models/registers");
const Customerdetail = require("./models/customerDetails");

const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../public");
const templetes_path = path.join(__dirname, "../templetes/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'nzPUAFC]DH)V9.pZ:G',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templetes_path);
hbs.registerPartials(partials_path);

// Root / Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Read the signUp page data
app.get("/signUp", (req, res) => {
    res.render("signUp");
});

// Login page
app.get("/login", (req, res) => {
    res.render("login");
});



// Create routes for pages dynamically
for (let i = 1; i <= 8; i++) {
    app.get(`/page${i}`, (req, res) => {
        res.render(`page${i}`);
    });
}

//profile page
// app.get("/profile", (req, res) => {
//     res.render("profile");
// });


// Create the signUp page data
app.post("/signUp", async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;
        

        // Check if the password matches the confirm password
        if (password !== confirmPassword) {
            return res.status(400).send("<script>alert('Passwords do not match'); window.location.href='/signUp';</script>");
        }

        // Check if the email already exists in the database
        const existingUser = await Register.findOne({ email});
        if (existingUser) {
            // If email exists, return a message indicating that the email is already present
            return res.status(400).send("<script>alert('Email already exists'); window.location.href='/signUp';</script>");
        }

        // Check if the password length is less than 5 characters
        if (password.length <5) {
            return res.status(400).send("<script>alert('Password length must be at least 5 characters');window.location.href='/signUp';</script>");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // If email is not already present, proceed with user registration
        const registerStudents = new Register({
            firstname,
            lastname,
            email,
            password:hashedPassword, 
            // confirmPassword
        });

        const registered = await registerStudents.save();

         res.status(201).send("<script>alert('Registration successful'); window.location.href='/';</script>");
         
    } catch (err) {
        // Handle validation errors and other errors
        if (err.name === 'ValidationError') {
            if (err.errors.password) {
                return res.status(400)
            }
        }
        res.status(500).send(err);
    }
});

// Create login page
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const useremail = await Register.findOne({ email});
        if (!useremail) {
            return res.status(400).send("<script>alert('Invalid login details'); window.location.href='/login';</script>");
        }
        // password = login password.
        // useremail.password = signUp password / Database stored signUp password
         const isMatch = await bcrypt.compare(password, useremail.password);
            // console.log(isMatch);
        if (isMatch) { // if(useremail.password === password){    
            res.status(201).send("<script>alert('Login successful'); window.location.href='/';</script>");
        } else {
            res.status(400).send("<script>alert('Invalid login details'); window.location.href='/login';</script>");
        }

    } catch (err) {
        res.status(400).send("<script>alert('Invalid login details'); window.location.href='/login';</script>");
    }
});


// Read the customer details data
app.get("/Customerdetail", (req, res) => {
    res.render("Customerdetail");
});

app.post("/Customerdetail", async (req, res) => {
    
    try {
        const {name, email, address, mobile, dob, gender, pin } = req.body;
          // Create a new Customer instance
          // const Customerdetail = require("./models/customerDetails");
          const existingEmail = await Customerdetail.findOne({email});

           if(existingEmail){
            return res.status(400).send("<script>alert('Customer email already exists'); window.location.href='/Customerdetail';</script>");
           }

          
          const Customer = new Customerdetail({
            name,
            email,
            address,
            mobile,
            dob,
            gender,
            pin
        });
        await Customer.save();
        res.status(201).send(`<script>alert('Customer details saved successfully'); window.location.href='/profile/${Customer._id}';</script>`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.get("/checkemail", (req, res) => {
    res.render("checkemail");
});

// create checkemail page

app.post("/checkemail", async (req, res) => {
    try {
        const { email, password } = req.body;

        const useremail = await Register.findOne({ email});
        if (!useremail) {
            return res.status(400).send("<script>alert('Invalid login details'); window.location.href='/checkemail';</script>");
        }
        // password = login password.
        // useremail.password = signUp password / Database stored signUp password
         const isMatch = await bcrypt.compare(password, useremail.password);
        if (isMatch) { // if(useremail.password === password){    
            const customer = await Customerdetail.findOne({ email });
            if (customer) {
                res.status(201).send(`<script>alert('Login successful'); window.location.href='/profile/${customer._id}';</script>`);
            } else {
                res.status(400).send("<script>alert('No customer details found for this email'); window.location.href='/checkemail';</script>");
            }
        } else {
            res.status(400).send("<script>alert('Invalid login details'); window.location.href='/checkemail';</script>");
        }

    } catch (err) {
        res.status(400).send("<script>alert('Invalid login details'); window.location.href='/checkemail';</script>");
    }
});

//read the profile page.
app.get("/profile/:id", async (req, res) => {
    try {
        const customer = await Customerdetail.findById(req.params.id);
        if (!customer) {
            return res.status(404).send("Customer not found");
        }
        res.render("profile", { customer });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});
