# Cloudia

## Build

```bash
docker build -t germainlefebvre4/cloudia-front:0.3.0 --build-arg FRONTEND_ENV=production .
docker push germainlefebvre4/cloudia-front:0.3.0
```

## Deploy

Go at [https://github.com/germainlefebvre4/cloudia-project/tree/main/charts](https://github.com/germainlefebvre4/cloudia-project/tree/main/charts)

## Develop

```bash
yarn install
yarn dev
```
