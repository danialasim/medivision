# 🏥 MediVision - AI-Powered Medical Report Analysis

![MediVision](https://img.shields.io/badge/MediVision-AI%20Health%20Assistant-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green)

**MediVision** is an intelligent medical report analysis application that uses OpenAI's GPT-4o Vision API to analyze medical reports and provide instant health insights.

## ✨ Features

- 🔍 **Instant AI Analysis** - Upload medical reports and get comprehensive analysis in seconds
- 💬 **AI Chat Assistant** - Ask questions about your medical report and get detailed explanations
- 📊 **Health Dashboard** - Visualize test results, abnormal values, and health status
- 👨‍⚕️ **Specialist Recommendations** - Get personalized specialist suggestions
- 💊 **Health Recommendations** - Receive actionable health advice
- 🔒 **Secure & Private** - Data processed securely, never stored permanently

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with available credits

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up your OpenAI API key**
   
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚠️ IMPORTANT: OpenAI Quota Exceeded Error

### Current Issue
If you see this error when analyzing a report:
```
You exceeded your current quota, please check your plan and billing details.
```

### What This Means
Your OpenAI API account has run out of credits or exceeded usage limits.

### How to Fix

#### ✅ Option 1: Add Credits to OpenAI (Recommended for Real Analysis)

1. **Go to OpenAI Billing**
   - Visit: https://platform.openai.com/settings/organization/billing

2. **Add Payment Method**
   - Click "Add payment method"
   - Enter your credit card details

3. **Add Credits**
   - Click "Add to credit balance"  
   - Add at least **$5-$10** for testing
   - Recommended: **$20** for comfortable usage

4. **Check Usage**
   - Visit: https://platform.openai.com/usage
   - Monitor your API usage

5. **Restart App**
   ```bash
   npm run dev
   ```

#### 📺 Option 2: Use Demo Mode (No Cost)

The app automatically shows demo data when:
- API quota is exceeded
- No API key is configured
- API errors occur

**Demo mode shows:**
- Sample medical report analysis
- Example chat responses  
- All UI features working

**Perfect for:**
- Testing the interface
- Understanding features
- Demonstrating the app

## 💰 OpenAI Pricing

### Models Used
- **GPT-4o Vision** (Image Analysis): ~$0.01-$0.05 per report
- **GPT-4** (Chat): ~$0.03 per 1K tokens

### Estimated Costs
- 1 medical report analysis: **$0.01 - $0.05**
- 10 chat messages: **$0.10 - $0.30**
- Daily usage (10 reports + 50 messages): **$1 - $3**

**Budget Recommendation**: $10-$20 for testing, $50+ for regular use

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **AI**: OpenAI GPT-4o Vision, Vercel AI SDK
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **State**: React Context
- **Validation**: Zod

## 🎯 How It Works

1. **Upload** - Drag & drop medical report image (PNG, JPG)
2. **Analyze** - GPT-4o Vision extracts all medical information
3. **Dashboard** - View comprehensive health analysis
4. **Chat** - Ask AI questions about your results

## 🔧 Troubleshooting

### "Quota exceeded" error
→ Add credits to OpenAI account (see above)

### "No API key found"  
→ Create `.env.local` with your API key

### "Invalid API key"
→ Verify key at https://platform.openai.com/api-keys

### Server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🔗 Useful Links

- [OpenAI Billing](https://platform.openai.com/settings/organization/billing) - Add credits
- [OpenAI Usage](https://platform.openai.com/usage) - Monitor usage
- [OpenAI API Keys](https://platform.openai.com/api-keys) - Manage keys
- [OpenAI Help](https://help.openai.com/) - Support

## 📄 License

For educational and demonstration purposes.

---

**⚠️ Disclaimer**: MediVision is for informational purposes only. Not medical advice. Always consult healthcare professionals.

---

Made with ❤️ and AI

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
