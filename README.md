# NexLearn - Online Examination Platform

A modern, responsive online examination platform built with Next.js, featuring JWT authentication, real-time timer, and comprehensive exam management.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript/TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios with interceptors
- **Authentication:** JWT with token refresh mechanism
- **Forms:** React Hook Form + Yup validation

## ✨ Features

### Authentication Flow
- 📱 Phone number-based OTP authentication
- ✅ OTP verification with resend functionality
- 👤 User profile creation with image upload
- 🔐 JWT token-based authentication
- 🔄 Automatic token refresh with Axios interceptors

### Exam Management
- 📝 Instructions page with exam details
- ⏱️ Real-time countdown timer
- 📊 Question navigation grid with status indicators
- 🎯 Mark questions for review
- 📖 Comprehensive paragraph support
- 💾 Auto-save answers
- 📱 Fully responsive design

### Results
- 📈 Detailed score breakdown
- ✅ Correct/incorrect/not attended statistics
- 🎨 Visual result presentation

## 📁 Project Structure

```
nexlearn/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/page.js           # Phone number entry
│   │   │   ├── verify-otp/page.js      # OTP verification
│   │   │   └── create-profile/page.js  # Profile creation
│   │   ├── exam/
│   │   │   ├── page.js                 # Exam instructions
│   │   │   ├── test/page.js            # Exam interface
│   │   │   └── results/page.js         # Results page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home/redirect page
│   │   └── globals.css                 # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.js               # App header
│   │   └── providers/
│   │       └── ReduxProvider.js        # Redux provider
│   ├── store/
│   │   ├── store.js                    # Redux store config
│   │   └── slices/
│   │       ├── authSlice.js            # Auth state
│   │       └── examSlice.js            # Exam state
│   ├── services/
│   │   ├── authService.js              # Auth API calls
│   │   └── examService.js              # Exam API calls
│   ├── lib/
│   │   └── axios.js                    # Axios instance with interceptors
│   └── middleware.js                   # Route protection
├── package.json
├── next.config.js
└── README.md
```

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd nexlearn
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔌 API Integration

**Base URL:** `https://nexlearn.noviindusdemosites.in`

### Authentication Endpoints
- `POST /auth/send-otp` - Send OTP to mobile
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/create-profile` - Create user profile
- `POST /auth/logout` - Logout user

### Exam Endpoints
- `GET /question/list` - Get exam questions
- `POST /answers/submit` - Submit exam answers

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

## 🎨 Design Implementation

The UI is pixel-perfect implementation of the provided Figma design with:
- Clean, modern interface
- Responsive design for all screen sizes
- Smooth transitions and animations
- Accessible components
- SEO optimized

## 🔐 Authentication Flow

1. User enters phone number
2. OTP is sent to the mobile number
3. User verifies OTP
4. If new user: Profile creation required
5. If existing user: Direct login with JWT tokens
6. Tokens stored in localStorage
7. Axios interceptors handle token refresh

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized for all screen sizes

## ⚡ Performance Optimizations

- Code splitting with Next.js App Router
- Image optimization with Next.js Image component
- Lazy loading of components
- Efficient state management with Redux
- Memoized selectors

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## 🔍 SEO Optimization

- ✅ **Meta Tags:** Dynamic page titles, descriptions, and keywords
- ✅ **Open Graph:** Full OG and Twitter card support
- ✅ **Structured Data:** Semantic HTML5 with proper heading hierarchy
- ✅ **Technical SEO:** robots.txt, sitemap.xml, canonical URLs
- ✅ **Performance:** Optimized for Core Web Vitals
- ✅ **Mobile-First:** Fully responsive and mobile-optimized
- ✅ **Accessibility:** ARIA labels, keyboard navigation, screen reader support

## 🚀 Deployment

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📄 License

This project is created as part of a technical assessment.

## 👨‍💻 Developer

Built with ❤️ using Next.js and modern web technologies.
