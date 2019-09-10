# api.wouterdeschuyter.be

## Setup

### Dependencies

```bash
npm install
```

### Configuration

```bash
cp .env.example .env
```

## Linting

```bash
npm run lint
```

### Autofix

```bash
npm run lint:fix
```

## Building

```bash
npm run build
```

## Running locally

### Database

```bash
docker-compose -f .docker/docker-compose.dev.yml up
```

### Node

```bash
npm run dev
```
