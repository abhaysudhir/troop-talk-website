## Main Files
`Chat.tsx` - Main file with Chatting with the AI

## Troop Talk Website

Troop Talk is an AI-powered assistant specializing in scouting information, designed to help troops stand out and thrive in their scouting journey.

### Table of Contents
- [Main Files](#main-files)
- [Troop Talk Website](#troop-talk-website)
  - [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
  - [UI Components](#ui-components)
  - [Other Components](#other-components)
- [Pages](#pages)
- [Setup \& Installation](#setup--installation)
- [Development](#development)
- [Environment Variables](#environment-variables)

## Overview

Troop Talk provides a custom AI chatbot for scouting troops, offering fast, accurate responses to scouting-related queries. It integrates with troop emails and BSA resources to provide tailored information for each troop.

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Authentication**: Clerk
- **Routing**: React Router
- **UI Components**: Custom UI components, shadcn/ui style
- **Markdown Rendering**: Marked
- **State Management**: React Hooks

## Project Structure

```
troop-talk-website/
├── public/                # Static assets
├── src/                   # Source code
│   ├── api/               # API integration
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Base UI components
│   │   └── ...            # Other components
│   ├── pages/             # Application pages
│   ├── lib/               # Utility libraries
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── .env.local             # Environment variables
└── package.json           # Project dependencies
```

## Key Components

### UI Components

The `src/components/ui/` directory contains a comprehensive set of UI components following the shadcn/ui style, including:

- **Button**: Customizable button component
- **Input**: Text input fields
- **Textarea**: Multi-line text input
- **Card**: Container component for content
- **Dialog/Modal**: Popup dialogs
- **Toast**: Notification system
- **Form**: Form handling components
- **And many more**: Various UI elements for building rich interfaces

### Other Components

- **TokenDebug.tsx**: Component for debugging JWT tokens
- **TypingIndicator.tsx**: Animation showing when AI is typing

## Pages

- **Landing.tsx**: Homepage with product information, features, and waitlist signup
- **Chat.tsx**: Main chat interface for interacting with the AI assistant
- **Login.tsx**: User login page
- **Signup.tsx**: User registration page (currently redirects to sign-in)
- **AdminDashboard.tsx**: Admin interface for managing the application
- **PendingApproval.tsx**: Page for users waiting for account approval

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables (see [Environment Variables](#environment-variables))
4. Start the development server:
   ```
   npm run dev
   ```

## Development

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Linting**: `npm run lint`

## Environment Variables

Create a `.env.local` file with the following variables:

```
VITE_DO_BACKEND_URL=<backend-url>
VITE_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
```

Additional environment variables may be required based on specific deployment needs.