const express = require('express');
const router = express.Router();
// importo il controller della risorsa post
const controller = require('../controllers/controller');

router.get('/', controller.index);
// troviamo la rotta e ritorniamo una singola post
router.get('/:id', controller.show);
//Store route per creare una nuova post
router.post('/', controller.store);
// Modifica integrale post
router.put('/:id',controller.update);
//Modifica parziale del post
router.patch('/:id', controller.modify);
// Destroy route per cancelare un post in base al id
router.delete('/:id', controller.destroy);
module.exports = router;