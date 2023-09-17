import { Schema, model, models } from "mongoose"

const commentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'registereduser' // refrence to the user
  },
  
  comment: {
    type: String,
    required: [true, "Comment is not required"],
  },
  
  postId: {
    type: String,
  },

}, {
  timestamps: true // for initialzation and update time
})


// check first if the user exists in the models before creating one 
const Comments = models.comment || model('comment', commentSchema)
export default Comments