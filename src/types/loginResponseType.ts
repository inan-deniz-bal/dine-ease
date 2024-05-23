export type loginRes = {
  status: string;
  message: string;
  data: {
    email: string;
    userid: string;
    userType: string;
  };
};
