const express = require('express');
const api = express();
const axios = require('axios');


api.use(express.urlencoded({extended: true}));
api.use(express.json());

api.get('/api/mundo', async (req, res)=>{
    try {
        const response = ({ message: 'HOLA MUNDO'});
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'Tuvimos un error'})
        
    }

});

api.get('/api/suma', async (req, res)=>{
    try {
        const num1 = 4;
        const num2 = 3;
        const suma = ({ Result : num1+num2});
        res.status(200).json(suma)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'Tuvimos un error'})
        
    }

});

api.get('/api/user/:name', async (req, res)=>{
    try {
        const name= req.params.name;
        if(!name){
            throw new Error('falta el parametro nombre')
        }
        const user = { 'usuario' : name};
        res.status(200).json(user)  
    } catch (error) {
        console.error(error)
        res.status(400).json({error: 'error en la solicitud'})
        
    }

});

api.get('/api/swapi/:id', async (req, res) => {
    try {
        const characterId = req.params.id; 
        const response = await axios.get(`https://swapi.dev/api/people/${characterId}/`);
        const character = response.data;
        const characterResponse = {
            'personaje': {
                'name': character.name,
                'height': character.height,
                'gender': character.gender,
                'films': character.films,
            }
        };
        res.status(200).json(characterResponse); 
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error en la solicitud' });
    }
});

api.put('/api/body', async (req, res)=>{
    try {
        const body= req.body;
        if(!body){
            throw new Error('agrega un body')
        }
        const user = { 'body' : body};
        res.status(200).json(user)  
    } catch (error) {
        console.error(error)
        res.status(400).json({error: 'error en la solicitud'})
        
    }

});

api.post('/api/suma', async (req, res)=>{
    try {
        const suma= Number(req.body.num1)+ Number(req.body.num2);
        res.status(200).json({"Result": suma});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'problemas de conexion'})
        
    }   

});

api.delete('/api/delete/:id', async (req, res)=>{
    try {
        const deleteID = req.params.id
        if (deleteID === '3') {
            res.status(200).json({message: "se ha eliminado el objero con ID 3"})
        } else {
            res.status(404).json({message: " No se encontro el objeto con el ID especifico"})
            
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({message: " conexion interrumpida"})
        
    }
    
});








api.listen(3000, ()=>{
    console.log('Ejercicio 4 de Backend con express', 'server-ON')
});