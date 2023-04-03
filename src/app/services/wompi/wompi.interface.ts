export interface WompiCardData {
  "number": string,
  "exp_month": string,
  "exp_year": string,
  "cvc": string,
  "card_holder": string,
}

export interface WompichargeData {
  "currency": string,
  "amount_in_cents": number,
  "customer_email": string,
  "payment_method": {
    "type": string,
    "installments": number,
    "token": string
  },
  "reference": string,
  "acceptance_token": string
}

