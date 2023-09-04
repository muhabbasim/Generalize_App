import { Schema, model, models } from "mongoose"

const postSchema = new Schema({
  
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'registereduser' // refrence to the user
  },
  
  thought: {
    type: String,
    required: [true, "Post is required"],
  },

  tag: {
    type: String,
    required: [true, "Tag is required"],
  },

}, {
  timestamps: true // for initialzation and update time
})


// check first if the user exists in the models before creating one 
const Post = models.Post || model('Post', postSchema)
export default Post