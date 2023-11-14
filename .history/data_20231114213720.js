module.exports = {
  "employees": [
    {
      "id": 1,
      "name": "Hatice",
      "password": "hatice2021"
    },
    {
      "id": 2,
      "name": "Bruno",
      "password": "azerty"
    },
    {
      "id": 3,
      "name": "Majda",
      "password": "majda2023"
    },
    {
      "id": 4,
      "name": "Nicole",
      "password": "123456"
    },
    {
      "id": 5,
      "name": "David",
      "password": "123456"
    }
  ],
  "customers": [
    {
      "id": 1,
      "name": "Pharmacie Saint Etienne",
      "userId": [
        1,
        3
      ]
    },
    {
      "id": 2,
      "name": "Saint Etienne Medical ",
      "userId": [
        1,
        3
      ],
      "interventions": [
        {
          "date": "2023-11-02"
        },
        {
          "date": "2023-11-03"
        }
      ]
    },
    {
      "id": 3,
      "name": "Schlagbauer Andance",
      "userId": 1,
      "interventions": [
        {
          "date": "2023-11-03"
        },
        {
          "date": "2023-11-05"
        }
      ]
    },
    {
      "id": 4,
      "name": "Schlagbauer Sarras",
      "userId": 1
    },
    {
      "id": 5,
      "name": "Ecole Sainte Marie",
      "userId": [
        1,
        3
      ],
      "interventions": [
        {
          "date": "2023-11-04"
        }
      ]
    },
    {
      "id": 6,
      "name": "Pollet",
      "userId": 2,
      "interventions": [
      ]
    },
    {
      "id": 7,
      "name": "CTR",
      "userId": 5
    }
  ]
};