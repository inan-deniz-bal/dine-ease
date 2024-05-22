export type Card = {
  _id?: String;
  cardNo: string;
  cardHolder: string;
  cvv: string;
  expirityDate: {
    month: string;
    year: string;
  };
  customerId?: String;
};
