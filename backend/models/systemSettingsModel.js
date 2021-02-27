import mongoose from 'mongoose'

const systemSettingsSchema = mongoose.Schema({
	name: {type: String, required: false},
	data: {},
})

const SystemSettings = mongoose.model('SystemSettings', systemSettingsSchema)

export default SystemSettings
