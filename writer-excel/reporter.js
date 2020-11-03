const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const config = require('../config');
const reportUtils = require('../utils');

async function generateReports(params) {
  try {
    const { dailyRevision } = params;
    logger.info('dailyRevision', dailyRevision);
    const allDeviceReport = await reportUtils.generateReportAll();
    const ongoingStudyReport = await reportUtils.generateFacilityReport();
    const noneEndOfUseReport = await reportUtils.generateNoneEndOfUseReport();

    const reportSuffix = `${moment().format('YY-MM-DD')}-${dailyRevision}`;
    const reportFolder = path.join(config.reportLocation, reportSuffix);
    await fs.ensureDir(reportFolder);

    const promises = [];
    const jsonOption = { spaces: 2 };
    // save report1 as All-${Date}-${Daily Revision}.json
    promises.push(fs.writeJSON(
      path.join(reportFolder, `All-${reportSuffix}.json`),
      allDeviceReport,
      jsonOption,
    ));

    // save report2 as Facility-${Date}-${Daily Revision}.json
    promises.push(fs.writeJSON(
      path.join(reportFolder, `Facility-${reportSuffix}.json`),
      ongoingStudyReport,
      jsonOption,
    ));

    // save report3 None-End-Of-Use-${Date}-${Daily Revision}.csv
    promises.push(fs.outputFile(
      path.join(reportFolder, `None-End-Of-Use-${reportSuffix}.csv`),
      noneEndOfUseReport,
    ));

    await Promise.all(promises);
  } catch (error) {
    logger.error('Error when generate report', error);
  }
}

module.exports = { generateReports };
