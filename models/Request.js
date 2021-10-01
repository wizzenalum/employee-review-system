const {Schema,model} = require('mongoose');

const requestSchema = new Schema({
    requestBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
},
{
  timestamps: true,
})

const Request = model("Request",requestSchema);
module.exports = Request;
