# LeadScrub 🕵️‍♂️

**Local-First AI Lead Extractor for Windows/Mac.** 
Stop wasting hours formatting messy sales leads. Plug in your own DeepSeek/OpenAI Key and pay fractions of a cent per lead. Built for Solo Sales Reps.
<img width="2669" height="9024" alt="image" src="https://github.com/user-attachments/assets/f36397da-dee6-4a5c-82f4-797248eec267" />


## ✨ Features

*   **100% Local-First Privacy:** Your client data never leaves your hard drive. No NDA issues. Totally safe from GDPR fine risks.
*   **Blazing Fast Speed:** Processes thousands of rows locally on your PC.
*   **BYOK (Bring Your Own Key):** Connect your own DeepSeek/OpenAI API key. Have total control over your AI spend.
*   **CRM Ready:** Generates clean CSVs ready for Salesforce, HubSpot, Pipedrive, etc.
*   **Built-in Waitlist & Admin Dashboard:** Securely collect early-access signups and manage them via a hidden, Firebase-authenticated admin panel.

## 🛠 Tech Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS (Custom "Terminal/Hacker" Theme)
*   **Icons:** Lucide React
*   **Backend/Database:** Firebase Firestore (Waitlist data)
*   **Authentication:** Firebase Auth (Google Sign-in for Admin)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/leadscrub.git
   cd leadscrub
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment

Build the project for production:
```bash
npm run build
```
The output will be in the `dist` directory, which can be hosted on any static hosting service (Vercel, Netlify, Firebase Hosting, etc.).
