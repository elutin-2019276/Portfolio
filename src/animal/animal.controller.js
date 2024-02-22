'use strict'

import User from '../user/user.model.js'
import Animal from './animal.model.js'
export const test = (req, res)=>{
    return res.send
}


export const save = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body
        //Validar que el Keeper exista (Buscar a la BD)
        let user = User.findOne({_id: data.keeper})
        if(!user) return res.status(400).send({message: 'Keeper not found'})
        //Crear la 'Instancia' del 'Animal'
        let animal = new Animal(data)
        //Guardar el animal 
        await animal.save()
        //Responder si todo sale bien
        return res.send({message: 'Animal saved succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving animal'})

        
    }
}

export const get = async(req, res)=>{
    try{
        let animals = await Animal.find() //Encuentre o no encuentre
        if(!animals.length == 0) return res.status(400).send({message: 'Not found'})
        return res.send({animals})
        return res.send({animals})
    }catch(err){
        consolee.error(err)
        return res.status(500).send({message: 'Error getting animals'})
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submited some'})
        return res.send({message: 'Animal updated succesfully', updatedAnimal})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating animal'})
    }
}

export const deleteA = async(req, res)=>{
    try{
        //X verificar si tiene una reunión en proceso X
        //Capturar el id del 'animal' a eliminar
        let { id } = req.params
        //Eliminar
        let deletedAnimal = await Animal.delteOne({_id: id})
        //Validar que si se eliminó
        if(deletedAnimal.deletedCount == 0) return res.status(400).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: 'Deleted animal succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})
    }
}


export const search = async(req, res)=>{
    try{
        //Obtener el parámetro de búsqueda
        let { search } = req.body
        //Buscar
        let animals = await Animal.find(
            {name: search}
        ).populate('keeper', ['name', 'phone'])
        //Validar la repuestas
        if(animals.length == 0) return res.status(404).send({message: 'Animals not found'}) 
        //Responder si todo sale bien 
        return res.send({message: 'Animals found', animals})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching animals'})
    }
}
