# Ripple Landing Page

A modern, responsive landing page for Ripple investment platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🎨 Modern, clean design matching the provided mockup
- 📱 Fully responsive across all device sizes
- ⚡ Built with Next.js 16 and TypeScript for optimal performance
- 🎯 Tailwind CSS for utility-first styling
- 🧩 shadcn/ui components for consistent UI elements
- 📊 Interactive sections including charts and statistics
- 📱 Mobile app mockups and download sections

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── InvestingSection.tsx
│   ├── StepsSection.tsx
│   ├── StatsSection.tsx
│   ├── ChartSection.tsx
│   ├── InvestSection.tsx
│   ├── BecomeInvestorSection.tsx
│   ├── FintraSection.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts
```

## Sections Overview

1. **Header**: Navigation with responsive mobile menu
2. **Hero Section**: Main title with mobile app mockups
3. **Investing Section**: Information about stock investing with demo stocks
4. **Steps Section**: 4-step process explanation
5. **Stats Section**: Key platform statistics
6. **Chart Section**: Analytics dashboard preview
7. **Invest Section**: Market leaders showcase
8. **Become Investor**: Mobile app promotion with download links
9. **Fintra Section**: Advanced technology platform showcase
10. **Footer**: Links and company information

## Responsive Design

The landing page is fully responsive with:
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Adaptive layouts for all sections
- Mobile-optimized navigation menu

## Customization

- Colors can be modified in `tailwind.config.js` and `globals.css`
- Components are modular and can be easily customized
- All text content is easily editable within component files

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ripple-landing)

## License

This project is for demonstration purposes.
