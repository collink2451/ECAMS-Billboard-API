# ECAMS Billboard API

REST API backend for the ECAMS (Engineering, Computing and Mathematical Sciences) department billboard system. Serves professor directory data and banner images to the public [ecams-billboard-client](../ecams-billboard-client) frontend, and handles image uploads from the [ecams-billboard-acp](../ecams-billboard-acp) admin panel.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/data/:department` | Get professors filtered by department short name |
| `GET` | `/api/banners` | Get all banners |
| `PUT` | `/api/images` | Upload a new banner image |
| `PATCH` | `/api/images/:id` | Replace an existing banner image |
| `DELETE` | `/api/images/:id` | Delete a banner image |
| `GET` | `/ping` | Health check — returns `Pong!` |

Uploaded images are served as static files from `/uploads/`.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **File uploads:** Multer (stored in `public/uploads/`)

## Setup

### Requirements

- Node.js 18+
- MongoDB instance

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

3. Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3001`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the server with nodemon (auto-restarts on changes) |
