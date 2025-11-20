---

#  **Bank Saving System – Full Stack Application**

A full-stack mini project built as part of the **Belimbing.ai Full Stack Engineer Test**.
The project implements a complete **Bank Saving System** that allows managing customers, accounts, deposito types, and savings operations such as deposits and withdrawals.

The application is built using **Next.js**, **React**, **TypeScript**, **Tailwind**, and **Next.js API Routes** following the MVC pattern for both frontend and backend.

---

##  **Technical Stack**

### **Frontend**

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS 4
* Radix UI
* Shadcn components
* React Hook Form
* Zod
* Lucide Icons

### **Backend**

* Next.js API Routes
* TypeScript
* In-memory / JSON-based storage (for test simplicity)
* Interest calculation logic

Full dependency list available in `package.json`.

---

##  **Installation & Setup**

1. Clone the repository:

```bash
git clone https://github.com/Aul-rhmn/bank.git
cd bank
```

2. Install dependencies:

```bash
npm install

or

npm install --legacy-peer-deps
```

3. Start development server:

```bash
npm run dev
```

4. Access the app on:
    `http://localhost:3000`

> No environment variables required for local development.

---

##  **Usage Instructions**

### ** Managing Customers**

* Navigate to the **Customers** page
* Create, edit, or delete a customer

### ** Managing Deposito Types**

* Create various deposito options
* Edit interest rates

### ** Managing Accounts**

* Link an account to a customer
* Assign a deposito type
* View and update current balance

### ** Deposits & Withdrawals**

* Input deposit date or withdrawal date
* System calculates ending balance automatically
* Display clear breakdown of interest calculation

---

## **Deployment**

The project can be deployed easily to **Vercel** using Next.js built-in support.

---

All code is written using **Next.js**, **React**, **TypeScript**, and related modern libraries.

---