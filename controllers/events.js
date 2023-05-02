const express = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = express.response)=>{


    // const eventos = await Evento.find();
    // si quiero expandir la información de un atributo... 
    const eventos = await Evento.find().populate('user', 'name password');

    return res.status(201).json({
        ok: true,
        msg: 'getEventos',
        eventos

    });    
};

const crearEvento = async(req, res = express.response)=>{

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok:true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

    // console.log(req.body)
    // const uid = req.uid;
    // const name = req.name;

    // return res.status(201).json({
    //     ok: true,
    //     msg: 'crearEventos'
    // });    
};

const actualizarEvento = async(req, res = express.response)=>{


    const eventoId = req.params.id;
    const uid = req.uid;


    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg: "evento sin existencia con ese id"

            })
        }

        console.log(evento.user.toString());
        console.log(uid);

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false, 
                msg : 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true})

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }  
};

const eliminarEvento = async(req, res = express.response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;


    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg: "evento sin existencia con ese id"

            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false, 
                msg : 'No tiene privilegio de eliminar este evento'
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);


        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado',
            evento: eventoEliminado
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    

    
};



// 
// 
// 

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}