const companies = require('data/companies.json');

export const CompanyNameLookup = (ticker) => {
  let start = 0;
  let end = companies.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    //console.log(companies[mid].ticker);
    //console.log(ticker);
    //console.log(companies[mid].ticker < ticker);
    if (companies[mid].ticker === ticker) {
      //console.log(JSON.stringify(companies[mid]))
      return companies[mid].name;
    } else if (companies[mid].ticker < ticker) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
};
