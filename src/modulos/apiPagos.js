// Configuración de Stripe
const STRIPE_PUBLIC_KEY = "pk_test_51SsL2U5i3MxIRo1zwHnb1vYeuFM0jgaV6r590dB1l6GhYvEsuoZqDZYCjSW4SYKNsqL6W3K6a4KoknSyvAYpilka00DurmVBe9";

export const crearClientePagos = () => {
  if (window.Stripe) {
    return window.Stripe(STRIPE_PUBLIC_KEY);
  }
  return null;
};

const generarClientSecret = () => {
  const id = "pi_test_" + Math.random().toString(36).substr(2, 14);
  const secret = Math.random().toString(36).substr(2, 32);
  return `${id}_secret_${secret}`;
};

export const crearIntentPago = async (monto, email, nombre) => {
  try {
    const clientSecret = generarClientSecret();
    
    return {
      id: clientSecret.split("_secret_")[0],
      client_secret: clientSecret,
      amount: Math.round(monto * 100),
      currency: "eur",
      status: "requires_payment_method"
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const confirmarPago = async (stripe, elements, intentId) => {
  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      throw new Error(error.message);
    }

    return paymentIntent;
  } catch (error) {
    console.error("Error al confirmar pago:", error);
    throw error;
  }
};
