const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const isLocal = true;

let loans = [];

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
		message: "✨ 👋🌏 ✨",
		stage: process.env.NODE_ENV,
	});
});

app.get("/ping", (req, res) => {
	res.json({
		message: "🏓",
	});
});

app.get("/loans", (req, res) => {
	// return all loans here
	res.json(loans);
});

app.get("/loan/:loanId", (req, res) => {
	// return load by loanId
	const loanId = req.params.loanId;
	const loanByLoanId = loans.find((loan) => loan.loanId == loanId);
	res.json(loanByLoanId);
});

app.post("/loan", (req, res) => {
	// Create new loan with borrowers
	const loan = req.body;
	const loanAlreadyExists = loans.find((existingLoan) => existingLoan.loanId === loan.loanId);

	if (loanAlreadyExists) {
		res.send('Loan with matching ID already exists')
	} else {
		loans = [
			...loans,
			loan
		];
	
		res.send('Loan added');
	}
});

app.patch("/borrower", (req, res) => {
	// update borrower based on loanId and pairId
	const loanId = req.query.loanId;
	const pairId = req.query.pairId;

	const updatedBorrowerInfo = req.body;

	const loanIndex = loans.findIndex((loan) => loan.loanId == loanId);
	const borrowersFromLoan = loans.find((loan) => loan.loanId == loanId) ? loans.find((loan) => loan.loanId == loanId).borrowers : null;

	if (borrowersFromLoan) {
		const borrowerToUpdateIndex = borrowersFromLoan.findIndex((borrower) => borrower.pairId == pairId);
		const borrowerToUpdate = borrowersFromLoan.find((borrower) => borrower.pairId == pairId);

		if (borrowerToUpdate) {
			loans[loanIndex].borrowers[borrowerToUpdateIndex] = {
				...borrowerToUpdate,
				...updatedBorrowerInfo
			}
	
			res.send('Borrower has been updated');
		} else {
			res.send('Borrower could not be found');
		}
	} else {
		res.send('Borrower could not be found');
	}
});

app.patch("/loan", (req, res) => {
	// delete borrower from loan based on loanId and pairId
	const loanId = req.query.loanId;
	const pairId = req.query.pairId;

	const loanIndex = loans.findIndex((loan) => loan.loanId == loanId);
	const borrowersFromLoan = loans.find((loan) => loan.loanId == loanId) ? loans.find((loan) => loan.loanId == loanId).borrowers : null;
	
	if (borrowersFromLoan) {
		const borrowerToUpdateIndex = borrowersFromLoan.findIndex((borrower) => borrower.pairId == pairId);
		const borrowerToUpdate = borrowersFromLoan.find((borrower) => borrower.pairId == pairId);

		if (borrowerToUpdate) {
			loans[loanIndex].borrowers.splice(borrowerToUpdateIndex, 1);
	
			res.send('Borrower has been deleted');
		} else {
			res.send('Borrower could not be found');
		}
	} else {
		res.send('Borrower could not be found');
	}
});

app.delete("/loan/:loanId", (req, res) => {
	// delete loan based on loanId 
	const loanId = req.params.loanId;

	const loanExists = loans.find((loan) => loan.loanId == loanId);

	if (loanExists) {
		loans = loans.filter((loan) => loan.loanId != loanId);

		res.send('Loan has been deleted')
	} else {
		res.send('Loan could not be found')
	}

});


if (isLocal) {
	//local host
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	});
} else {
	//for lambda export
	module.exports = app;
}
