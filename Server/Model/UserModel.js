import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    },
    // image: {
    //     type: File,
    // }
})
export default mongoose.model('User', userschema);