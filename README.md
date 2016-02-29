# Cube Timer API

## GET /solves/:puzzle

Returns a list of solves for the specified puzzle.

Example request:

```
GET /solves/2x2x2
```

Example response:

```
[
  {
    "recorded_at": 12343458456,
    "duration": 6666,
    "puzzle": "2x2x2"
  },
  {
    "recorded_at": 12345678456,
    "duration": 12343,
    "puzzle": "2x2x2"
  },
  {
    "recorded_at": 12349978456,
    "duration": 12343,
    "puzzle": "2x2x2"
  }
]
```

## POST /solves

Adds solves to the database

Example request:

```
POST /solves
{
  "solves": [
    {
      "recorded_at": 12343458456,
      "duration": 16034,
      "puzzle": "3x3x3"
    },
    {
      "recorded_at": 12345678456,
      "duration": 17546,
      "puzzle": "3x3x3"
    }
  ]
}
```

Example response:

```
{
  "UnprocessedItems": {}
  "message": "Added 2 solves"
}
```
