export type Table = {
  tableName: String;
  orders?: [
    {
      date: Date;
      currentOrder?: any;
      customerId: String;
      status: String;
    }
  ];
};
