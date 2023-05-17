const request = require("supertest")
const baseURL = "http://localhost:3000"

describe("GET /loans", () => {
  const loan = {
    loanId: 1,
    borrowers: [{
        pairId: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "555-555-5555"
    }]
  };

  beforeAll(async () => {
    await request(baseURL).post("/loan").send(loan);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/loan/${loan.loanId}`);
  });

  it('should return the loans', async () => {
    const response = await request(baseURL).get("/loans");
    console.log('response', response.body);
    expect(response.body.length).toEqual(1);
  })
});

describe("GET /loan/:loanId", () => {
  const loan = {
    loanId: 1,
    borrowers: [{
        pairId: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "555-555-5555"
    }]
  };

  beforeAll(async () => {
    await request(baseURL).post("/loan").send(loan);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/loan/${loan.loanId}`);
  });

  it('should return the loans', async () => {
    const expectedLoanId = loan.loanId;
    const response = await request(baseURL).get(`/loan/${expectedLoanId}`);
    console.log('response', response.body);
    expect(response.body.loanId).toEqual(expectedLoanId);
  })
});
describe("POST /loan", () => {
  const loan = {
    loanId: 1,
    borrowers: [{
        pairId: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "555-555-5555"
    }]
  };

  afterAll(async () => {
    await request(baseURL).delete(`/loan/${loan.loanId}`);
  });

  it('should create a new loan', async () => {
    const loansBeforeCreate = await request(baseURL).get("/loans");
    expect(loansBeforeCreate.body.length).toEqual(0);

    await request(baseURL).post("/loan").send(loan);

    const loansAfterCreate = await request(baseURL).get("/loans");
    expect(loansAfterCreate.body.length).toEqual(1);
  })
});

describe("PATCH /borrower", () => {
  const loan = {
    loanId: 1,
    borrowers: [{
        pairId: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "555-555-5555"
    }]
  };

  beforeAll(async () => {
    await request(baseURL).post("/loan").send(loan);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/loan/${loan.loanId}`);
  });


  // it('should return the loans', async () => {
  //   const expectedLoanId = loan.loanId;
  //   const response = await request(baseURL).get(`/loan/${expectedLoanId}`);
  //   console.log('response', response.body);
  //   expect(response.body.loanId).toEqual(expectedLoanId);
  // })

  it('should update the provider borrower info based on loanId and pairId', async () => {
    const requestBody = {
      firstName: "Jane"
    }

    const expectedLoanId = loan.loanId;
    console.log('here');
    const responseBeforeUpdate = await request(baseURL).get(`/loan/${expectedLoanId}`);
    expect(responseBeforeUpdate.body.borrowers[0].firstName).toEqual(loan.borrowers[0].firstName);

    await request(baseURL).patch(`/borrower?loanId=${loan.loanId}&pairId=${loan.borrowers[0].pairId}`).send(requestBody);

    const responseAfterUpdate = await request(baseURL).get(`/loan/${expectedLoanId}`);
    expect(responseAfterUpdate.body.borrowers[0].firstName).toEqual(requestBody.firstName);
  })
});