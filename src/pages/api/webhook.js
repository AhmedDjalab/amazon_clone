import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure Connection to firebase from the backend
const serviceAccount = require("../../../permissions.json");
const app =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fulfillOrder = async (session) => {
  console.log("fulfill order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to db`);
    })
    .catch((err) => console.log("db error ", err.message));
};
export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;
    // verifiy that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

      // verifiy that event came from stripe
    } catch (err) {
      console.log("error", err.message);
      return res.status(400).send(`Webhooks error: ${err.message}`);
    }

    // handle the checkout session complete event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // fulfill the <order className=""></order>
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch(
          (err) => res.status(400).send(`Webhook Error :${err.message}`),
          console.log(`Webhook Error :${err.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
