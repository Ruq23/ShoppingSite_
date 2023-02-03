const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')


const UserSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose)

// userSchema.statics.findAndValidate = async function (username, password) {
//     const foundUser = await this.findOne({ username })
//     const isValid = await bcrypt.compare(password, foundUser.password)
//     return isValid? foundUser : false
// }

// userSchema.pre('save', async function(next) {
//     if(!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// })


module.exports = mongoose.model('User', UserSchema)