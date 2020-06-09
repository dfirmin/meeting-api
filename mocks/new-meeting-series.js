/*
  Upon the successful creation of a meeting series, the server should automatically create:
    - a meeting occurrence - this should have a lastUpdated & lastUpdatedBy (we can discuss)
    - a section occurrence for each section
  The user is then sent to a screen to view/edit the upcoming meeting occurrence - it will be blank initially.
  The various new-**.js files are to show what one or multiple items of each type will look like.
*/

export default {
  // dateCreated: epoch timestamp (system field)
  // lastUpdated: epoch timestamp (initially same as created, system field)
  // userId should be a uuid field
  userId: '1',
  // anticipated duration in milliseconds
  timeAllocated: 5400000,
  // timestamp of may 6th, 2020 1:30PM local time in epoch format
  startDate: 1588786200,
  // team is not a db record, so not a uuid, refers to config.js
  team: '1',
  // this array will correspond to a series of records in the section table.
  sections: [
    {
      name: 'Good News',
      // anticipated duration in milliseconds
      timeAllocated: 300000,
    },
    {
      name: 'Updates',
      timeAllocated: 600000,
    },
    {
      name: 'Old Action Items',
      timeAllocated: 300000,
    },
    {
      name: 'IDS',
      timeAllocated: 3600000,
    },
    {
      name: 'Action Item Review',
      timeAllocated: 300000,
    },
    {
      name: 'Conclude',
      timeAllocated: 300000,
    },
  ],
}
