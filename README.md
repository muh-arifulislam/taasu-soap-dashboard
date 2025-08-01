# Taasu Soap - Dashboard

A modern, responsive admin dashboard for managing the Taasu Soap business operations. Built with React, TypeScript, and Tailwind CSS, this dashboard provides comprehensive tools for order management, customer tracking, payment processing, and business analytics.

## 🌐 Live Website

Visit the live admin dashboard: [https://admin-taasu-soap.netlify.app/](https://admin-taasu-soap.netlify.app/)
Visit the live website: [https://taasu-soap.web.app/](https://taasu-soap.web.app/)

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time analytics and business metrics
- **Order Management**: Complete order lifecycle management
- **Customer Management**: Customer profiles and relationship tracking
- **Payment Processing**: Payment tracking and management
- **User Management**: Admin user creation and management
- **Profile Management**: Admin profile and settings

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Secure login with role-based access control
- **State Management**: Redux Toolkit with persistence
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Charts and analytics with Recharts
- **Modern UI**: Radix UI components with custom styling

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn** - Accessible component primitives

### State Management & Data
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Router DOM** - Client-side routing

### Forms & Validation
- **React Hook Form** - Performant forms
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### UI Components & Utilities
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Sonner** - Toast notifications
- **Day.js** - Date manipulation
- **Lodash** - Utility functions

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── Authentication/     # Authentication components and guards
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components (Radix-based)
│   ├── form/         # Form components
│   └── card/         # Card components
├── hooks/            # Custom React hooks
├── layout/           # Layout components
├── lib/              # Utility libraries
├── pages/            # Page components
│   ├── auth/         # Authentication pages
│   └── dashboard/    # Dashboard pages
│       ├── Customers/
│       ├── Orders/
│       ├── Payments/
│       ├── Products/
│       ├── Users/
│       └── Profile/
├── redux/            # Redux store and slices
├── routes/           # Routing configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔐 Authentication

The dashboard implements role-based authentication:

- **Admin Users**: Full access to all features including user management
- **Regular Users**: Access to dashboard features excluding user management

### Protected Routes
- `/dashboard` - Main dashboard (requires authentication)
- `/dashboard/users` - User management (requires admin role)
- `/dashboard/users/create` - Create new users (requires admin role)

## 📊 Dashboard Features

### Overview Dashboard
- Sales analytics and trends
- Revenue charts and metrics
- Recent orders overview
- Top products performance
- Quick action buttons

### Order Management
- Order listing with filters
- Order details and status tracking
- Order processing workflow
- Customer order history

### Customer Management
- Customer database
- Customer profiles and details
- Order history per customer
- Customer analytics

### Payment Processing
- Payment tracking
- Payment status management
- Financial reporting

### User Management (Admin Only)
- User creation and management
- Role assignment
- User permissions

## 🎨 UI Components

The project uses a comprehensive set of UI components built on Radix UI primitives:

- **Cards**: Information display cards
- **Tables**: Data tables with sorting and filtering
- **Forms**: Validated forms with error handling
- **Modals**: Dialog components for actions
- **Navigation**: Sidebar and header navigation
- **Charts**: Data visualization components

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Taasu Soap Dashboard
```

### Tailwind Configuration
The project uses Tailwind CSS 4 with custom configuration in `tailwind.config.js`.

### Vite Configuration
Path aliases are configured for clean imports:
- `@/` points to `src/`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deployment Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Deploy from the `dist/` folder
- **AWS S3**: Upload the `dist/` folder to S3
- **Docker**: Use a Node.js container to serve the built files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for Taasu Soap business operations.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Built with ❤️ for Taasu Soap Business Management**
