const Movie = require('../models/movieModel');
const image = require('../utils/image');
                //crear
async function createMovie (req, res) {
    const movie = new Movie(req.body)
    
    if(req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        movie.image = imagePath
    };

    try{
        await movie.save();
        res.status(201).send({ msg: 'Pelicula guardada pa' });
    }catch (error) {
        res.status(500).send({ msg: 'Pelicula NO guardada' + error});
    };


};

                //obtener
async function getMovies(req, res) {
    
    try{
        const movies = await Movie.find();
        res.status(200).send(movies);
    
    } catch(error) {
        res.status(400).send({ msg: 'Error al obtener todas las peliculas' });
    }
}

                //actualizar
async function updateMovie(req, res) {
    const { id } = req.params;

    const newMovie = req.body;
    if(req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        newMovie.image = imagePath;
    };

    try {
        await Movie.findByIdAndUpdate({ _id: id }, newMovie);
        res.status(200).send({ msg: 'Pelicula actualizada correctamente'});
    } catch(error) {
        res.status(500).send({ msg: 'Pelicula NO actualizada.' + error});
    };
};
                
                //eliminar
async function deleteMovie(req, res) {
    const { id } = req.params;

    try {
        await Movie.findByIdAndDelete(id);
        res.status(200).send({ msg: 'Pelicula Eliminada.'})
    } catch(error) {
        res.status(500).send({ msg: 'Error al eliminar la pelicula.'})
    }
};

                //obtener una sola pelicula
async function getMovie(req, res) {
    const id = req.params.id;

    try {
        const movie = await Movie.findOne({ _id: id})
        res.status(200).send(movie);
    } catch(error) {
        res.status(500).send({ msg: 'Error al obtener la pelicula.'})
    }
    
}

module.exports = {
    createMovie,
    getMovies,
    updateMovie,
    deleteMovie,
    getMovie,
};