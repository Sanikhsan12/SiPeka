Build a professional "Public Reporting System" (Lapor Masyarakat) web application using Node.js (Express) for the backend and Vite-React with Tailwind CSS for the frontend.

CONTEXT & DOMAIN:

- Domain: Public Service for Village/District (Sistem Pelayanan Publik Desa/Kelurahan).
- Goal: Citizens report issues (infrastructure, health, etc.) and admins process them.

ROLES & ACCESS CONTROL:

1. Citizen: Can Register/Login, Create reports (with file/photo upload), and view their report status.
2. Admin: Can Login, View all reports, and update report status (Pending, Processed, Resolved).

DETAILED ARCHITECTURE (Separation of Concerns):

- Backend: Modular structure (routes/, controllers/, services/, middlewares/, models/). Use Prisma ORM.
- Frontend: Feature-based structure (features/auth, features/reports, components/ui, hooks/, context/).
- Responsive Design: Use Tailwind CSS for a mobile-first approach.

STRICT CONFIGURATION:

- No hardcoded URLs or credentials.
- Use .env for: DATABASE_URL, JWT_SECRET, PORT, AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_CONTAINER_NAME, and CDN_URL.
- Important: All uploaded file URLs returned to the frontend MUST use the CDN_URL prefix (Azure CDN) instead of the direct Blob Storage link.

REQUIRED FEATURES:

1. Auth: JWT-based authentication for both roles.
2. Reporting: CRUD for reports.
3. File Upload: Integration with Azure Blob Storage (specifically for report evidence).
4. Tracking: Status update mechanism for admins.

DEPLOYMENT TEMPLATES:

- Generate a multi-stage Dockerfile for the React frontend (serving with Nginx).
- Generate a Dockerfile for the Node.js backend.
- Generate a docker-compose.yml for local testing.
- Generate a GitHub Actions workflow (.github/workflows/deploy.yml) that builds images, pushes to Azure Container Registry (ACR), and deploys to Azure Container Apps.

STYLING:

- Modern, clean, and professional UI. Use a "Dark Mode" friendly color palette by default.

SEEDING

- Generate a Prisma seed file that creates at least one admin account with the role 'admin' and password 1234. The admin user will be used to seed the database with an initial admin user account.

TESTING ENVIRONMENT

- Aplikasi akan di test terlebih dahulu di docker local tanpa menggunakan service dari azure ataupun menggunakan cdn nya, setidaknya jalan dulu di docker local.
