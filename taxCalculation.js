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

// Readable, Maintainable, Reuseable

// SOLID

const TAX_TABLE_2019 = [
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

// input index, table
const getTaxConfig = (index, table) => {
  const taxConfig = table[index];
  const { minIncome, rate, base, message } = taxConfig;

  return { minIncome, rate, base, message };
}

function calculateTax(income, taxTable) {
  const getTaxConfigInRange = (config) => income > config.minIncome && income <= config.maxIncome;
  const taxConfigIndex = taxTable.findIndex(getTaxConfigInRange);

  if (taxConfigIndex === -1) {
    throw new Error('Can not find the tax config corresponding to Income');
  }

  const  { minIncome, rate, base, message } = getTaxConfig();
  
  const taxPayable = (income - minIncome) * rate + base;

  return {
    taxPayable, 
    message, 
    rate,
  };
};

const taxPayableWhen2019 = calculateTax(200000, TAX_TABLE_2019);
const taxPayableWhen2016 = calculateTax(120000, TAX_TABLE_2016);
