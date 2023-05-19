export const DollarFormatter = (dollars) => {
  let isNegative = false;
  if (dollars < 0) {
    isNegative = true;
    dollars = Math.abs(dollars);
  }

  if (dollars < 1000) {
    return isNegative ? `-$${dollars}M` : `$${dollars}M`;
  } else {
    return isNegative ? `-$${Math.round((dollars / 1000) * 10) / 10}B` : `$${Math.round((dollars / 1000) * 10) / 10}B`;
  }
};
