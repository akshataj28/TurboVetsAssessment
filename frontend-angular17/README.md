# Turbovets Frontend (Angular 17)

**Prereqs**
- Node.js 20.x (or >=18.19)
- npm 10.x

## Install & Run
```bash
npm ci        # or: npm install
npm start     # opens http://localhost:4200
```
Make sure your backend is running at `http://localhost:3333/api`.

## Notes
- Uses standalone components (no NgModule).
- `environment.ts` controls the API base URL.
- A simple JWT bearer `tokenInterceptor` reads `localStorage.token`.
- Login defaults to `admin@example.com / password`.