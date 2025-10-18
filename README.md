# 🏥 MediVision - AI-Powered Medical Report Analysis

![MediVision](https://img.shields.io/badge/MediVision-AI%20Health%20Assistant-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![Gemini](https://img.shields.io/badge/Google-Gemini%201.5-green)

**MediVision** is an intelligent medical report analysis application that uses **Google Gemini AI** (FREE tier available!) to analyze medical reports and provide instant health insights.

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
- Google Gemini API key (FREE tier available - no credit card required!)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up your Gemini API key**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your-gemini-api-key-here
   ```
   
   **Get your FREE Gemini API key:** https://makersuite.google.com/app/apikey

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚠️ IMPORTANT: Using Google Gemini (FREE!)

### Current Setup:
Your app now uses **Google Gemini AI** instead of OpenAI, which offers:

✅ **FREE tier with 1 million tokens per month**
✅ **No credit card required**
✅ **15 requests per minute**
✅ **Vision analysis included**

### Get Your Gemini API Key:

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey

2. **Sign in with Google Account**
   - Use any Google account (free)

3. **Create API Key**
   - Click "Create API Key"
   - Copy the key

4. **Add to `.env.local`**
   ```bash
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

5. **Restart App**
   ```bash
   npm run dev
   ```

### Free Tier Limits:
- ✅ **1,500 requests per day** - FREE
- ✅ **15 requests per minute** - FREE  
- ✅ **1 million tokens per month** - FREE
- ✅ ~**100-200 medical reports per month** - FREE

**For detailed Gemini setup:** See `GEMINI_SETUP.md`

## 💰 Gemini Pricing (Much Better!)

### Free Tier:
- **1 million tokens per month** - **FREE**
- **15 requests per minute** - **FREE**
- **Vision analysis** - **FREE**
- **No credit card required** - **FREE**

### Paid Tier (if you exceed):
- $0.02 per 1M tokens (very cheap!)
- Pay only for what you use

### Cost Comparison:
| Feature | Gemini Free | Gemini Paid | OpenAI |
|---------|-------------|-------------|--------|
| Report Analysis | **FREE** | $0.001 | $0.01-$0.05 |
| Chat Message | **FREE** | $0.0001 | $0.001-$0.01 |
| Monthly Limit | **1M tokens FREE** | Unlimited | Pay per use |

**Result:** ~100-200 reports per month **completely FREE** with Gemini!

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **AI**: Google Gemini 1.5 Flash (FREE tier!)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **State**: React Context
- **Validation**: Zod

## 🎯 How It Works

1. **Upload** - Drag & drop medical report image (PNG, JPG)
2. **Analyze** - Gemini AI Vision extracts all medical information (FREE!)
3. **Dashboard** - View comprehensive health analysis
4. **Chat** - Ask Gemini AI questions about your results (FREE!)

## 🔧 Troubleshooting

### "API key not found"  
→ Create `.env.local` with `GEMINI_API_KEY=your-key`

### "Rate limit exceeded"
→ Free tier: 15 requests/minute, wait 1 minute

### "Invalid API key"
→ Get new key at https://makersuite.google.com/app/apikey

### Server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🔗 Useful Links

- [Google AI Studio](https://makersuite.google.com/app/apikey) - Get your FREE API key
- [Gemini API Docs](https://ai.google.dev/docs) - Documentation
- [Gemini Quickstart](https://ai.google.dev/tutorials/get_started_node) - Getting started
- [MediVision Gemini Guide](./GEMINI_SETUP.md) - Detailed setup guide

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
