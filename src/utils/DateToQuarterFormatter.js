export const DateToQuarterFormatter = (fiscalDateEnding) => {
  let monthDay = `${fiscalDateEnding.split('-')[1]}-${fiscalDateEnding.split('-')[2]}`;
  let year = fiscalDateEnding.split('-')[0];
  if (monthDay === '03-31') {
    return `Q1 ${year}`;
  } else if (monthDay === '04-30') {
    return `Q1 ${year}`;
  } else if (monthDay === '06-30') {
    return `Q2 ${year}`;
  } else if (monthDay === '07-31') {
    return `Q2 ${year}`;
  } else if (monthDay === '09-30') {
    return `Q3 ${year}`;
  } else if (monthDay === '10-31') {
    return `Q3 ${year}`;
  } else if (monthDay === '12-31') {
    return `Q4 ${year}`;
  } else if (monthDay === '01-31') {
    return `Q4 ${year - 1}`;
  } else {
    return 'Quarter Unknown';
  }
};
