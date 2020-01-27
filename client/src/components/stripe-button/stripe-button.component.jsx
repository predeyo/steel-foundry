import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  // Stripe want to see price in cents
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_t57K16iBmY4FVdhJEpT78Wuv00GsU4Xglh";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert("succesful payment");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert(
          "There was an issue with your payment! Please make sure you use the provided credit card."
        );
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Spēka Rota Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
