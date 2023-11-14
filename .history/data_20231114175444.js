const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, name: 'Kyle', role: ROLE.ADMIN },
    { id: 2, name: 'Sally', role: ROLE.BASIC },
    { id: 3, name: 'Joe', role: ROLE.BASIC }
  ],
  projects: [
    { id: 1, name: "Kyle's Project", userId: 1 },
    { id: 2, name: "Sally's Project", userId: 2 },
    { id: 3, name: "Joe's Project", userId: 3 }
  ]
}

module.exports = {
  employees: [
    { id: 1, name: 'Hatice', password: 'hatice2021' },
    { id: 2, name: 'Bruno', password: 'azerty' },
    { id: 3, name: 'Majda', password:'majda2023' },
    { id: 4, name: 'Nicole',password:'123456' },
    { id: 5, name: 'David', password:'123456' }
  ],
  customers: [
    { id: 1, name: 'Pharmacie Saint Etienne', userId: [1, 3] },
    { id: 2, name: 'Saint Etienne Medical ', userId: [1, 3] },
    { id: 3, name: 'Schlagbauer Andance', userId: 1 },
    { id: 4, name: 'Schlagbauer Sarras', userId: 1 },
    { id: 5, name: 'Ecole Sainte Marie', userId: [1, 3] },
    { id: 6, name: 'Pollet', userId: 2 },
    { id: 7, name: 'CTR', userId: 5 }
  ]
}