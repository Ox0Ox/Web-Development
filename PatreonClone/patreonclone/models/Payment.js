import mongoose from "mongoose";
import { defaultConfig } from "next/dist/server/config-shared";

const {Schema, model} = mongoose

const PaymentSchema = new Schema({
    name: {type: String, required: true},
    to_user: {type: String, required: true},
    message: {type: String},
    amount: {type: String, required: true},
    createdate: {type: Date, default: Date.now},
    updatedate: {type: Date, default: Date.now},
    done: {type: Boolean, default: false}
})

export default mongoose.models.Payment || model('Payment', PaymentSchema)