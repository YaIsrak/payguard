# Payguard

Payment Tracking and Verification System

### Project Setup Instructions

Clone the repository: git clone https://github.com/YaIsrak/payguard.git

Install dependencies:

```bash
npm install
or
yarn install
```

Start the development server:

```bash
npm run dev or yarn dev
```

### API Details

API endpoint:

```bash
/api
```

API routes:

```bash
/api/payments: Handles payment-related operations
/api/payments/[id]: Handles single-payment-related operations
/api/documents: Handles document-related operations
/api/documents/[id]: Handles single-document-related operations
/api/checkout: For handle Stripe payment
```

Environment Variables Required

```bash
BASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGO_URI=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

RESEND_API_KEY=

```

Test User/Admin Credentials

```bash
## Test User
Email: user@test.com
Password: user@42253

## Test admin:
Email: admin@test.com
Password: admin@42253
```

Tech Stack:

-  MongoDB - With Mongose
-  Clerk - Authentication
-  Stripe - Payment Processing
-  Resend - Email Sending

Other libraries and tools:

-  Axios
-  React Hook Form
-  Zod
-  Lucide React
