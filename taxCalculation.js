// Known 2019 tax payable table like bottom:

/* |--------------------|------------|-------------------------------------------|
-- | Income thresholds  |    Rate    |         Tax payable on this income        |
-- |--------------------|------------|-------------------------------------------|
-- | $0 - $18,200       |     0%     |  Nil                                      |
-- | $18,201 - $37,000  |     19%    | 19c for each $1 over 18,200               |
-- | $37,001 - $90,000  |    32.5%   | $3,572 plus 32.5% of amounts over $37,000 |
-- | $90,001 - $180,000 |     37%    | $20,797 plus 37% of amounts over $90,000  |
-- | $180,001 and over  |     45%    | $54,096 plus 45% of amounts over $180,000 |
--------------------------------------------------------------------------------*/

const taxTable2019 = [
  {
    minIncome: 0,
    maxIncome: 18200,
    rate: 0,
    base: 0,
    message: 'Nil'
  },
  {
    minIncome: 18200,
    maxIncome: 37000,
    rate: 0.19,
    base: 0,
    message: '19c for each $1 over $18,200'
  },
  {
    minIncome: 37000,
    maxIncome: 90000,
    rate: 0.325,
    base: 3572,
    message: '$3,572 plus 32.5% of amounts over $37,000'
  },
  {
    minIncome: 90000,
    maxIncome: 180000,
    rate: 0.37,
    base: 20797,
    message: '$20,797 plus 37% of amounts over $90,000'
  },
  {
    minIncome: 180000,
    maxIncome: Infinity,
    rate: 0.45,
    base: 54097,
    message: '$54,097 plus 45% of amounts over $180,000'
  }
];

function taxTableValidation(taxTable) {
  for (let i = 0; i < taxTable.length - 1; i++) {
    if (taxTable[i].maxIncome !== taxTable[i + 1].minIncome) {
      return 'tax table is invalid'
    }
  }
}

function taxPaid(income, taxTable) {
  // if (income < 0) {
  //   return 'error'
  // }

  // if (taxTableValidation(taxTable)) {
  //   taxTableValidation(taxTable)
  // }

  const taxTableIndex = taxTable.findIndex((obj) => income <= obj.maxIncome)
  if (taxTableIndex !== -1) {
    let taxUse = taxTable[taxTableIndex];
    const incomeAfterTax = (income - taxUse.minIncome) * taxUse.rate + taxUse.base;
    const message = taxUse.message;
    const rate = taxUse.rate * 100;

    return {
      tax: incomeAfterTax, 
      message: message, 
      rate: rate
    };
  }


  // for (let i = 0; i < taxTable.length; i++) {
  //   let tax = taxTable[i];
  //   if (income > tax.maxIncome) {
  //     continue;
  //   };

  //   const incomeAfterTax = (income - tax.minIncome) * tax.rate + tax.base;
  //   const message = tax.message;
  //   const rate = tax.rate * 100;
  //   return {
  //     tax: incomeAfterTax, 
  //     message: message, 
  //     rate: rate
  //   };
  // };
};


function afterTaxIncome(income, taxTable) {
  return {
    income: income - taxPaid(income, taxTable).tax
  };
}

console.log(taxPaid(18200, taxTable2019))
console.log(afterTaxIncome(18200, taxTable2019))
console.log(taxPaid(18201, taxTable2019))
console.log(afterTaxIncome(18201, taxTable2019))
console.log(taxPaid(37000, taxTable2019))
console.log(afterTaxIncome(37000, taxTable2019))
console.log(taxPaid(37001, taxTable2019))
console.log(afterTaxIncome(37001, taxTable2019))
console.log(taxPaid(90000, taxTable2019))
console.log(afterTaxIncome(90000, taxTable2019))
console.log(taxPaid(90001, taxTable2019))
console.log(afterTaxIncome(90001, taxTable2019))
console.log(taxPaid(180000, taxTable2019))
console.log(afterTaxIncome(180000, taxTable2019))
console.log(taxPaid(180001, taxTable2019))
console.log(afterTaxIncome(180001, taxTable2019))