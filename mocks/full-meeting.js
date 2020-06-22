export default [
  {
    id: 1,
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
        items: [
          {
            description: 'Update 1',
            userId: '3',
          },
          {
            description: 'Update 2',
            userId: '1',
          },
        ],
      },
      {
        name: 'Old Action Items',
        type: 2,
        timeAllocated: 300000,
        items: [
          {
            description: 'Action Item 1',
            userId: '2',
          },
          {
            description: 'Action Item 2',
            userId: '1',
          },
          {
            description: 'Action Item 3',
            userId: '2',
          },
        ],
      },
      {
        name: 'IDS',
        type: 3,
        timeAllocated: 3600000,
        items: [
          {
            description: 'IDS 1',
            userId: '3',
            priority: 300,
          },
          {
            description: 'IDS 2',
            userId: '1',
            priority: 100,
          },
          {
            description: 'IDS 3',
            userId: '1',
            priority: 200,
          },
        ],
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
