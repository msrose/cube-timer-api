# Cube Timer API

## GET /solves/:puzzle

Returns a list of solves for the specified puzzle.

Example request:

```
GET /solves/2x2x2
```

Example response:

```
{
  "puzzle": "2x2x2",
  "solves": [
    {
      "recorded_at": 12343458456,
      "duration": 6666
    },
    {
      "recorded_at": 12345678456,
      "duration": 12343
    },
    {
      "recorded_at": 12349978456,
      "duration": 12343
    }
  ]
}
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

## Deploy to Amazon EC2

SSH into the instance and run:

```
NODE_ENV=production PORT=80 sudo -E nohup node cube-timer-api/index.js & > cube-timer-api.log
```
