const express = require('express'),
    router = express.Router();

const apiCtrls = {
    public: require('../controllers/api/public'),
}

// Pessoa
    // ADD
    router.post('/api/public/add', apiCtrls.public.add);

    // DELETE
    router.post('/api/public/delete', apiCtrls.public.delete);

    // EDIT
    router.post('/api/public/edit', apiCtrls.public.edit);

    // GET BY ID
    router.post('/api/public/get/:id', apiCtrls.public.get);

    // GET ALL
    router.get('/api/public/getAll', apiCtrls.public.getAll);

module.exports = router;