import mercadopago from 'mercadopago';
import dotenv from 'dotenv'

dotenv.config()

export const createOrder = async (req, res) => {
  
  try {
    
    const carrito = req.body.carrito;
    console.log("carrito recibido en backend", carrito);

      if (!carrito || carrito.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });

    const items = carrito.map(producto => ({
      title: producto.nombre,
      unit_price: Number(producto.precio_oferta ?? producto.precio),
      quantity: producto.cantidad,
      currency_id: "COP"
    }));

    const result = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: "https://648b-2800-e2-5980-1040-e833-191e-9863-fc06.ngrok-free.app/pagos/success",
        failure: "https://648b-2800-e2-5980-1040-e833-191e-9863-fc06.ngrok-free.app/pagos/failure",
        pending: "https://648b-2800-e2-5980-1040-e833-191e-9863-fc06.ngrok-free.app/pagos/pending"
      },
      auto_return: "approved",
      notification_url: "https://648b-2800-e2-5980-1040-e833-191e-9863-fc06.ngrok-free.app/pagos/webhook"
    });

    res.json({ init_point: result.body.init_point });
  } catch (error) {
    console.error("❌ Error al crear orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
};



export const receiveWebhoook = async (req, res) => {
    console.log(req.query);
    const payment = req.query

    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)
            //guardar en base de datos
        }

        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ error: error.message })
    }
};
