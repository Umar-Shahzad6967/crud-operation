import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
    }

})
export let User = mongoose.model('Auth', Schema)
// export { authModel as User }
