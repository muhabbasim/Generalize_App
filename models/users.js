import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required!'],
    // match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 4-20 alphanumeric letters and be unique!"]
  },

  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
    trim: true,
    // regex for email
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email"
    ]
  },

  password: {
    type: String,
    unique: false,
  },

  image: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    required: false,
  }

}, {
  timestamps: true // for initialzation and update time
})


// check first if the user exists in the models before creating one 
const RegisterUser = models.registereduser || model('registereduser', userSchema)
export default RegisterUser