const _ = require('lodash');
const moment = require('moment');
const FacilityStatistic = require('../../models/FacilityStatistic');
const { createExcelData } = require('./convertToExcel');

const start = moment('2018-03-01T00:00:00Z');
const stop = moment('2020-11-01T00:00:00Z');

async function getFacilityStatisticData() {
  const statistics = await FacilityStatistic.aggregate([
    {
      $match: {
        type: 'Month',
        start: { $gte: start.toDate(), $lte: stop.toDate() },
      },
    },
    {
      $project: {
        start: 1,
        facility: 1,
        device: 1,
        revenue: 1,
      },
    },
    {
      $lookup: {
        from: 'facilities',
        let: {
          facilityId: '$facility',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  '$$facilityId', '$_id',
                ],
              },
              status: { $in: ['Eval', 'Active', 'Closed'] },
            },
          }, {
            $project: {
              name: 1,
              status: 1,
            },
          },
        ],
        as: 'facilityObject',
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              $arrayElemAt: [
                '$facilityObject', 0,
              ],
            }, '$$ROOT',
          ],
        },
      },
    },
    {
      $project: {
        facilityObject: 0,
      },
    },
    { $match: { name: { $exists: true } } },
    { $sort: { start: 1 } },
  ]);

  _.each(statistics, (statistic) => {
    const { device = {}, revenue = {} } = statistic;
    const totalDevice = device.total || 0;
    const revenueStudy = revenue.study || 0;
    statistic.revenuePerDevice = totalDevice ? revenueStudy / totalDevice : 0;
    statistic.time = moment(statistic.date).format('MM-YYYY');
  });
  return statistics;
}

function createDates() {
  const months = [];
  while (start < stop) {
    months.push(start.format('MM-YYYY'));
    start.add(1, 'M');
  }
  return months;
}

function createTableData(statisticGroupByFacilities, sheetName, months) {
  const sheetValueMap = {
    'Device Purchased': 'device.total',
    'Study Revenue': 'revenue.study',
    'Revenue Per Purchased Device': 'revenuePerDevice',
  };
  const sheetValue = sheetValueMap[sheetName];
  return _.map(statisticGroupByFacilities, (statistics, name) => {
    const firstItem = statistics[0];
    const row = {
      'Facility Name': name,
      'Facility Status': firstItem.status,
    };
    for (let i = 0; i < months.length; i += 1) {
      const month = months[i];
      const statistic = _.find(statistics, x => x.time === month);
      row[month] = !statistic ? 'N/A' : statistic[sheetValue];
    }
    return row;
  });
}

async function generateFacilityStatisticReport() {
  const facilityStatistics = await getFacilityStatisticData();

  const statisticGroupByFacilities = _.groupBy(facilityStatistics, 'name');
  const months = createDates();
  const sheets = ['Device Purchased', 'Study Revenue', 'Revenue Per Purchased Device'];
  const dataArrays = sheets.map(sheet => createTableData(statisticGroupByFacilities, sheet, months));

  return createExcelData(
    sheets,
    dataArrays,
  );
}

module.exports = {
  generateFacilityStatisticReport,
};
