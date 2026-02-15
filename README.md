# 🤖 Bleep Admin Portal

A modern, sleek admin dashboard for managing conversations and user interactions in the Bleep chat platform. Built with React, TypeScript, and Vite for a lightning-fast development experience.

## ✨ Features

### 🔐 Authentication

- **Secure Login System** with password visibility toggle
- **Role-based Access Control** (Admin/User roles)
- **JWT Authentication** with secure token management

### 💬 Conversation Management

- **Real-time Chat Interface** with WebSocket integration
- **Admin Dashboard** for monitoring all user conversations
- **Message History** with timestamps and read/unread status
- **Responsive Design** that works seamlessly across devices

### 🎨 Modern UI/UX

- **Beautiful Dark Theme** with animated grid scan effects
- **Component-based Architecture** using shadcn/ui
- **Smooth Animations** and micro-interactions
- **Accessibility First** design principles

### 🛠 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite with HMR
- **Code Quality**: ESLint + Prettier + Husky

## Test Accounts

For testing purposes, you can use these pre-configured accounts:

### Admin Account

- **Email:** `admin@gmail.com`
- **Password:** `Monkey$99`
- **Role:** Admin (2003)

### User Accounts

- **User 1:**
  - **Email:** `alice@gmail.com`
  - **Password:** `Monkey$99`
  - **Role:** User (2001)

- **User 2:**
  - **Email:** `tester@gmail.com`
  - **Password:** `Monkey$99`
  - **Role:** User (2001)

### Registration Example

To create a new user account, send a POST request to `/bleep/v1/auth/register`:

```json
{
  "name": "tester",
  "password": "Monkey$99",
  "email": "tester@gmail.com"
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kaungMinn/Demo-Chat-Frontend.git
   cd Demo-Chat-Frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your API endpoints and configuration
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── dashboard/       # Dashboard-specific components
│   └── buttons/         # Custom button components
├── features/            # Feature-based modules
│   ├── auth/           # Authentication logic
│   └── conversations/  # Chat and conversation management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── constants/          # App constants and configuration
```

## 🎯 Key Features Explained

### Admin Experience

- **Dashboard Overview**: Monitor all user conversations at a glance
- **Real-time Updates**: Live conversation updates via WebSocket
- **User Management**: View and manage user interactions
- **Message Analytics**: Track conversation metrics

### User Experience

- **Clean Interface**: Intuitive chat interface with modern design
- **Secure Messaging**: End-to-end encrypted conversations
- **Responsive Design**: Works perfectly on desktop and mobile
- **Status Indicators**: Visual feedback for message states

### Security Features

- **Role-based Access**: Different permissions for admins and users
- **Token Management**: Secure JWT token handling
- **Input Validation**: Comprehensive form validation with Zod
- **XSS Protection**: Built-in security measures

## 🛠 Development

### Available Scripts

```bash
# Start development server
pnpm run dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

### Code Quality Tools

- **ESLint**: Configured with Airbnb style guide for React and TypeScript
- **Prettier**: Consistent code formatting with automatic fixes
- **Husky**: Git hooks for pre-commit checks with lint-staged
- **lint-staged**: Runs linting and formatting only on staged files
- **TypeScript**: Full type safety across the project
- **Pre-commit hooks**: Automatic code quality checks before commits

## 📚 Storybook

The project includes Storybook for component development and documentation:

### Features

- **Interactive Component Playground**: Test components in isolation
- **Documentation**: Auto-generated docs for all components
- **Design System**: Visual showcase of UI components
- **Accessibility Testing**: Built-in a11y addon for accessibility checks
- **Responsive Testing**: Test components across different screen sizes

### Usage

```bash
# Start Storybook development server
pnpm storybook

# Build static Storybook for deployment
pnpm build-storybook
```

Visit `http://localhost:6006` when running the development server.

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated testing and deployment:

### Workflow Features

- **Automated Testing**: Runs on every push request
- **Code Quality Checks**: ESLint with Airbnb style guide enforcement
- **Build Validation**: Ensures the project builds successfully
- **Node.js Matrix**: Tests across multiple Node.js versions
- **Fast CI**: Optimized for quick feedback with caching

### CI Steps

1. **Code Checkout**: Pulls the latest code
2. **Setup Environment**: Installs Node.js and pnpm
3. **Install Dependencies**: Caches dependencies for speed
4. **Lint Code**: Runs ESLint with Airbnb rules
5. **Build Project**: Validates the build process
6. **Test Suite**: Runs unit and integration tests

### Branch Protection

- **Main Branch**: Requires CI checks before merging
- **Pull Requests**: Automated reviews and status checks
- **Quality Gates**: Blocks merges if checks fail

## 🎨 Design System

The project uses a carefully crafted design system:

- **Color Palette**: Modern dark theme with primary accent colors
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing using Tailwind classes
- **Components**: Reusable component library with shadcn/ui

## 📱 Responsive Design

- **Mobile-first approach** with breakpoints for all screen sizes
- **Touch-friendly interfaces** for mobile devices
- **Adaptive layouts** that work on any device
- **Optimized performance** for smooth mobile experience

## 🔧 Configuration

### Environment Variables

```env
VITE_API_URL=your_api_endpoint
VITE_WS_URL=your_websocket_endpoint
VITE_APP_NAME=Bleep
```

### Build Configuration

- **Vite**: Fast build tool with HMR
- **React Compiler**: Enabled for performance optimization
- **Tree Shaking**: Optimized bundle sizes
- **Code Splitting**: Automatic route-based splitting

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

The build artifacts are stored in the `dist/` directory.

### Deployment Options

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Server**: Any static file server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the lightning-fast build tool

---

<div align="center">
  <p>Made with ❤️ by the Bleep Team</p>
  <p>Transforming admin conversations, one message at a time 🚀</p>
</div>
