export default [
  {
    id: 2,
    team: '1',
    timeAllocated: 5400000,
    sections: [
      {
        name: 'Good News',
        // anticipated duration in milliseconds
        timeAllocated: 300000,
      },
      {
        name: 'Updates',
        type: 1,
        timeAllocated: 600000,
        items: [],
      },
      {
        name: 'Old Action Items',
        type: 2,
        timeAllocated: 300000,
        items: [],
      },
      {
        name: 'IDS',
        type: 3,
        timeAllocated: 3600000,
        items: [],
      },
      {
        name: 'Action Item Review',
        type: 4,
        timeAllocated: 300000,
        items: [],
      },
      {
        name: 'Conclude',
        timeAllocated: 300000,
      },
    ],
  },
]
