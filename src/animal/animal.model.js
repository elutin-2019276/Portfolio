import { model , Schema } from "mongoose"

const animalSchema = Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },  
    keeper:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false //Desahabilitar el _v (version del documento) 

})

export default model('animal', animalSchema)
