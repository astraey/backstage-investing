const RevenueParagraphGenerator = ({ companyName, companyTicker, slot, datesChart, revenueValuesChart, costOfRevenue }) => {
  let revenueValues = slot === 'All Time' ? revenueValuesChart : revenueValuesChart.slice(revenueValuesChart.length - 8, revenueValuesChart.length);
  let costOfRevenueValues = slot === 'All Time' ? costOfRevenue : costOfRevenue.slice(costOfRevenue.length - 8, costOfRevenue.length);
  let dates = slot === 'All Time' ? datesChart : datesChart.slice(datesChart.length - 8, datesChart.length);
  let revenueHigherThanCostAll;

  let datesWhenRevenueLowerThanCost = [];
  let costsWhenRevenueLowerThanCost = [];
  let revenuesWhenRevenueLowerThanCost = [];
  let averageSum = 0;
  let averageMargin;

  if (revenueValues.length === dates.length && revenueValues.length === costOfRevenueValues.length) {
    revenueHigherThanCostAll = true;
    for (let i = 0; i < dates.length; i++) {
      averageSum += Math.round(((revenueValues[i] - costOfRevenueValues[i]) / Math.abs(revenueValues[i])) * 100);
      if (revenueValues[i] < costOfRevenueValues[i]) {
        revenueHigherThanCostAll = false;
        datesWhenRevenueLowerThanCost.push(dates[i]);
        revenuesWhenRevenueLowerThanCost.push(revenueValues[i]);
        costsWhenRevenueLowerThanCost.push(costOfRevenueValues[i]);
      }
    }
    averageMargin = averageSum / dates.length;
  }

  return (
    <span>
      Over the last {dates.length >= 4 ? `${Math.ceil(dates.length / 4)} years` : `${dates.length} quarters`}, {companyName || companyTicker} has{' '}
      {revenueHigherThanCostAll ? (
        <span>consistently reported a higher revenue than a cost of revenue. </span>
      ) : (
        <span>
          reported higher cost of revenue than revenue in
          {datesWhenRevenueLowerThanCost.length <= 1 ? (
            <span> a single quarter: </span>
          ) : (
            <span> {datesWhenRevenueLowerThanCost.length} quarters: </span>
          )}
          {datesWhenRevenueLowerThanCost.map((date, i, arr) => {
            if (arr.length === 1) {
              return `${date}.`;
            } else if (arr.length - 1 === i) {
              return `and ${date}.`;
            } else {
              return `${date}, `;
            }
          })}
        </span>
      )}
      On average, there's a <strong>{averageMargin.toFixed(1)}%</strong> difference between {companyTicker}' revenue and cost of revenue, also called
      Gross Profit Margin. In general, a gross profit margin of 50% or higher is considered good, while a margin of 20% or lower may indicate that a
      company is struggling to generate profits. In the last {dates.length >= 4 ? `${Math.ceil(dates.length / 4)} years` : `${dates.length} quarters`}
      , {companyTicker} Gross Profit Margin of <strong>{averageMargin.toFixed(1)}%</strong> is{' '}
      {averageMargin > 50 ? (
        <span>a great sign, and shows the company's potential for profitability.</span>
      ) : averageMargin <= 50 && averageMargin >= 25 ? (
        <span> within the normal range.</span>
      ) : averageMargin < 24 && averageMargin >= 0 ? (
        <span> not a good sign, and it might signal that the company is struggling to generate a profit.</span>
      ) : averageMargin < 0 ? (
        <span>
          {' '}
          a bad sign. The company is being operated at a <strong>LOSS</strong>, and unless the company has a plan to either increase their revenue, or
          decrease their cost of revenue, it will eventually go bankrupt.
        </span>
      ) : (
        <span>no info</span>
      )}
    </span>
  );
};

export default RevenueParagraphGenerator;
