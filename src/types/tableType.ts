export type Table = {
  tableName: String;
  _id: String;
  orders?: [
    {
      date: Date;
      currentOrder?: any;
      customerId: String;
      status: String;
    }
  ];
};
