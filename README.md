# 🎵 Prince Group Vista - Event Management Platform

A modern, full-stack event management and ticket booking platform built for Prince Group of Companies. Experience seamless event booking with advanced features like referral systems, bulk discounts, and integrated payment processing.

![Prince Group Vista](https://img.shields.io/badge/Prince%20Group-Vista%2041-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite)

## 🚀 Live Demo

**Frontend**: [Prince Group Vista](https://princegroupofcompanies.in)  
**Backend API**: [API Documentation](https://api.princegroupofcompanies.in)

## ✨ Features

### 🎫 **Event Management**
- **Multi-tier Ticket System**: VVIP, VIP, Elite, and General categories
- **Dynamic Pricing**: Real-time price calculation with discounts
- **Bulk Purchase Offers**: Buy 4 get 1 free, Buy 8 get 2 free
- **Referral System**: 20% discount with valid referral codes
- **YouTube Integration**: Additional 30% off for channel subscribers

### 🔐 **Authentication & Security**
- **Firebase Authentication**: Secure user management
- **JWT Tokens**: Backend session management
- **Role-based Access**: Admin, User, and Client roles
- **Protected Routes**: Secure page access control

### 💳 **Payment Processing**
- **Cashfree Integration**: Secure payment gateway
- **Multiple Payment Methods**: UPI, Cards, Net Banking
- **Real-time Processing**: Instant payment confirmation
- **Transaction Tracking**: Complete payment history

### 📊 **Admin Dashboard**
- **Event Analytics**: Comprehensive event statistics
- **Booking Management**: View and manage all bookings
- **User Management**: Administer user accounts
- **Revenue Tracking**: Financial reporting and insights
- **Referral Management**: Track and manage referral codes

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach
- **Dark/Light Themes**: Customizable appearance
- **Smooth Animations**: Framer Motion integration
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **React Query** - Server state management

### **Backend**
- **Go (Golang)** - High-performance server
- **Gin Framework** - HTTP web framework
- **GORM** - Database ORM
- **JWT** - Authentication tokens
- **Firebase Admin SDK** - Firebase integration

### **Database**
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions

### **Authentication**
- **Firebase Auth** - User authentication
- **Google OAuth** - Social login
- **Phone/Email OTP** - Multi-factor auth

### **Payment & Services**
- **Cashfree** - Payment gateway
- **YouTube API** - Subscription verification
- **Email Services** - Transactional emails

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **Go** (v1.21 or higher)
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/prince-group-vista-41.git
cd prince-group-vista-41

# Install dependencies
npm install
# or
pnpm install
# or
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd prince-group-backend

# Install Go dependencies
go mod download

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Run database migrations
go run migrate.go

# Start the server
go run main.go
```

### Environment Variables

#### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/prince_group_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Backend Deployment (Docker)

```bash
# Build Docker image
docker build -t prince-group-backend .

# Run container
docker run -p 8080:8080 prince-group-backend
```

### Database Setup

```sql
-- Create database
CREATE DATABASE prince_group_db;

-- Run migrations
-- (Migrations are handled by the Go application)
```

## 📁 Project Structure

```
prince-group-vista-41/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── public/         # Public pages
│   │   └── user/           # User dashboard pages
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions
│   ├── types/              # TypeScript type definitions
│   └── lib/                # Utility functions
├── public/                 # Static assets
└── prince-group-backend/   # Go backend application
    ├── controllers/        # HTTP controllers
    ├── models/            # Database models
    ├── routes/            # API routes
    └── middleware/        # Custom middleware
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Backend
go run main.go       # Start backend server
go test ./...        # Run tests
go mod tidy          # Clean up dependencies
```

### Code Style

- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Email**: support@princegroupofcompanies.in
- **Website**: [Prince Group of Companies](https://princegroupofcompanies.in)
- **Documentation**: [API Docs](https://api.princegroupofcompanies.in/docs)

## 🙏 Acknowledgments

- **Prince Group of Companies** for the opportunity
- **Firebase** for authentication services
- **Cashfree** for payment processing
- **shadcn/ui** for beautiful components
- **Vercel** for hosting and deployment

---

<div align="center">
  <p>Made with ❤️ by Prince Group of Companies</p>
  <p>🎵 Bringing Music to Life 🎵</p>
</div>
