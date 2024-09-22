use("CrudDB")

db.createCollection('Courses')

db.Courses.insertMany([
    {
      "Name": "Document 1",
      "Price": "$10",
      "Assignments": 2,
      "Projects": 2
    },
    {
      "Name": "Document 2",
      "Price": "$15",
      "Assignments": 4,
      "Projects": 2
    },
    {
      "Name": "Document 3",
      "Price": "$20",
      "Assignments": 6,
      "Projects": 2
    },
    {
      "Name": "Document 4",
      "Price": "$25",
      "Assignments": 8,
      "Projects": 2
    },
    {
      "Name": "Document 5",
      "Price": "$30",
      "Assignments": 10,
      "Projects": 2
    },
    {
      "Name": "Document 6",
      "Price": "$35",
      "Assignments": 12,
      "Projects": 2
    },
    {
      "Name": "Document 7",
      "Price": "$40",
      "Assignments": 14,
      "Projects": 2
    },
    {
      "Name": "Document 8",
      "Price": "$45",
      "Assignments": 16,
      "Projects": 2
    },
    {
      "Name": "Document 9",
      "Price": "$50",
      "Assignments": 18,
      "Projects": 2
    },
    {
      "Name": "Document 10",
      "Price": "$55",
      "Assignments": 20,
      "Projects": 2
    }
  ]
  )