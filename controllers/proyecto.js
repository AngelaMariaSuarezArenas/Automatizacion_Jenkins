const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const TipoProyecto = require('../models/tipoProyecto')
const Cliente = require('../models/cliente')
//const Universidad = require('../models/universidad')
//const Etapa = require('../models/etapa')

// crear
const createProyecto = async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { tipoProyecto, cliente } = data;
        //validando tipo proyecto
        const tipoProyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'tipo proyecto invalido'})
        }
        // validando cliente
        const clienteDB = Cliente.findOne({
            _id: cliente._id
        })
        if(!clienteDB){
            return res.status(400).json({msg: 'cliente invalido'})
        }
        // validando universidad
        /*const universidadDB = Universidad.findOne({
            _id: universidad._id
        })
        if(universidadDB){
            return res.status(400).json({msg: 'universidad invalida'})
        }
        // validando etapa
        const etapaDB = Etapa.findOne({
            _id: etapa._id
        })
        if(etapaDB){
            return res.status(400).json({msg: 'etapa invalida'})
        }*/
        // validad proyecto
         const proyectoDB = Proyecto.findOne({
            _id: proyecto._id
         })
         if(proyectoDB){
            return res.status(400).json({msg: 'proyecto invalido'})
         }
      const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyectos = async (req = request, 
    res = response) => {
        try{
            console.log('Petición...')
            const proyectoDB = await Proyecto.find()
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'cliente'
                })
               /* .populate({
                    path: 'universidad'
                })
                .populate({
                    path: 'etapa'
                })*/
                .populate({
                    path: 'proyecto'
                })
                
            return res.json(tipoProyectoDB, clienteDB, proyectoDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar proyecto
/*const updateProyectoByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const proyecto  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}*/

module.exports = { 
    createProyecto, 
    getProyectos, 
   // updateProyectoByID 
}