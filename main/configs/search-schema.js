module.exports = [
  {
    model: 'Article',
    database: 'db1',
    variables: [
      ['title', 'String'],
      ['category', 'String'],
      ['author', 'String'],
    ],
    defaultReturns: ['title', 'category', 'author'] // always add this information to whatever data is being returned. NOTE: ID is always returned
  },
  {
    model: 'Project',
    database: 'db1',
    variables: [
      ['name', 'String'],
      ['type', 'String'],
      ['tag_0', 'String'],
      ['tag_1', 'String'],
      ['tag_2', 'String'],
      ['tag_3', 'String'],
      ['tag_4', 'String'],
      ['tag_5', 'String'],
      ['tag_6', 'String'],
      ['tag_7', 'String'],
      ['tag_8', 'String'],
      ['tag_9', 'String'],
    ],
    defaultReturns: ['name', 'type', 'tag_0', 'tag_1', 'tag_2', 'tag_3', 'tag_4', 'tag_5', 'tag_6', 'tag_7', 'tag_8', 'tag_9'] 
  },
];
