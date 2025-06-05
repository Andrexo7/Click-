import {Router} from 'express';
import {createOrder, receiveWebhoook} from '../controladores/control-de-pagos.js'
 

const router = Router()


router.post('/create-order',createOrder )
 
router.get('/success', (req, res) => res.send('pago exitoso'));
router.get('/failure', (req, res) => res.send('pago fallido'));
router.get('/pending', (req, res) => res.send('pago pendiente '));

router.post('/webhook',receiveWebhoook);


export default router;