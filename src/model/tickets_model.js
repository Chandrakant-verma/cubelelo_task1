import mongoose, {Schema} from "mongoose";

const ticketSchema = new Schema(
    {
        customername: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        productname:{
             type: String,
             required: true
        },

        issue:{
            type: String,
            required: true
        },
  
        category: {
             type: String,
             required: true,
             enum: ["delivery delay", "replacement delay", "damaged product", "wrong item", "product quality",  "refund"]
        },

        status:{
             type: String,
             required: true,
             enum: ["open", "closed","resolved"]
        },

        priority:{
             type: String,
             required: true,
             enum: ["high", "medium", "low"]
        },

        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

export const Ticket = mongoose.model("Ticket", ticketSchema)