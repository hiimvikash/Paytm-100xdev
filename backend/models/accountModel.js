const {Schema, model, SchemaTypes} = require('mongoose')

const accountSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = model('Account', accountSchema);

module.exports = {
	Account
}