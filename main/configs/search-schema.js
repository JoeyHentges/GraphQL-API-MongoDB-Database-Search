module.exports = [
  {
    model: 'Company',
    database: 'db1',
    variables: [
      ['name', 'String']
    ]
  },
  {
    model: 'Admin',
    database: 'db1',
    variables: [
      ['username', 'String'],
      ['firstName', 'String'],
      ['lastName', 'String'],
      ['email', 'String']
    ]
  },
  {
    model: 'User',
    database: 'db1',
    variables: [
      ['username', 'String']
    ]
  }
];
