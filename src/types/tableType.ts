export type Table = {
  tableName: String;
  _id: String;
  orders: [
    {
      date: Date;
      currentOrder: string;
      customerId: String;
      status: String;
    }
  ];
};
