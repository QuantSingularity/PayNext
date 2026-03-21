# PayNext Frontend

Modern payment processing platform frontend built with React and Material-UI.

## Features

- Modern Material-UI design system
- Secure authentication and authorization
- Payment processing workflows
- Real-time dashboard and analytics
- Fully responsive design
- Accessibility compliant
- Comprehensive test coverage

## Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- PayNext backend services running (default: http://localhost:8002)

## Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend API URL
```

## Development

```bash
# Start development server
npm start

# The app will open at http://localhost:3000
```

## Building for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain the production-ready files
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
web-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AnimationComponents.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageLoader.jsx
│   │   └── PageTransition.jsx
│   ├── pages/            # Page components
│   │   ├── AboutPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HelpCenter.jsx
│   │   ├── Homepage.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── PricingPage.jsx
│   │   ├── Register.jsx
│   │   └── SendMoney.jsx
│   ├── services/         # API and business logic
│   │   └── api.js
│   ├── theme/           # Theme configuration
│   │   └── ThemeConfig.jsx
│   ├── App.jsx          # Main app component
│   └── index.js         # Entry point
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_BASE_URL=http://localhost:8002
REACT_APP_API_GATEWAY_URL=http://localhost:8002
REACT_APP_ENABLE_DEMO_MODE=false
```

## API Integration

The frontend connects to the PayNext backend API Gateway (default: http://localhost:8002).

### Endpoints Used

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **User Management**: `/api/users/me`, `/api/users/profile`
- **Payments**: `/api/payments/send`, `/api/payments/balance`
- **Transactions**: `/api/users/transactions`

## Key Features

### Authentication

- Email/password login and registration
- JWT token-based authentication
- Automatic token refresh
- Protected routes

### Dashboard

- Account balance overview
- Recent transactions
- Quick stats and analytics
- Payment methods management

### Payments

- Multi-step payment flow
- Recipient selection
- Amount validation
- Payment method selection
- Transaction confirmation

### User Experience

- Smooth page transitions
- Loading states
- Error handling
- Responsive design
- Accessibility features

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance

- Code splitting for optimal loading
- Lazy loading of routes
- Optimized bundle size
- Progressive Web App (PWA) ready

## Security

- HTTPS in production
- Secure HTTP-only cookies
- XSS protection
- CSRF protection
- Content Security Policy

## Contributing

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Ensure all tests pass
5. Submit a pull request

## Troubleshooting

### Cannot connect to backend

- Verify backend is running on http://localhost:8002
- Check REACT_APP_API_BASE_URL in .env
- Ensure CORS is configured on backend

### Build fails

- Clear node_modules and package-lock.json
- Run `npm install` again
- Check Node.js version (should be 16+)

### Tests failing

- Ensure all dependencies are installed
- Check for syntax errors
- Verify mock data matches expected structure

## License

MIT License - see LICENSE file for details
