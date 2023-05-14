const companies = require('data/companies.json');

export const CompanyNameLookup = (ticker) => {
  let start = 0;
  let end = companies.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (companies[mid].ticker === ticker) {
      return { name: companies[mid].name, exchange: companies[mid].exchange };
    } else if (companies[mid].ticker < ticker) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
};
