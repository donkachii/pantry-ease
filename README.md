# PantryEase

## Overview

**PantryEase** is an AI-powered pantry tracker and management application designed to help users efficiently manage their kitchen inventory. By integrating state-of-the-art technologies, PantryEase offers intelligent suggestions, and tracks expiration dates, while providing a seamless and intuitive user experience.

## Features

- **Smart Inventory Tracking**: Automatically track pantry items, including quantities, expiration dates, and categories.
- **AI-Powered Suggestions**: Get personalized recipe suggestions and restocking reminders based on your pantry's contents.
- **Expiration Date Alerts**: Receive notifications when items are nearing their expiration date to reduce food waste.

## Technologies Used

- **Next.js**: Leveraged for its powerful features, including server-side rendering and static site generation, ensuring optimal performance and SEO.
- **Firebase**: Used for real-time database management, authentication, and hosting. Firebase's seamless integration simplified backend development.
- **Redux Toolkit**: Implemented for state management, allowing efficient and scalable management of the app's state across various components.
- **Material UI**: Utilized for designing a clean, responsive, and intuitive user interface, ensuring a great user experience across devices.
- **OpenAI & Llama 3.1 Model**: Integrated AI models to provide intelligent features such as personalized recommendations and predictive restocking suggestions.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm or yarn
- Firebase account (for backend services)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/PantryEase.git
   cd PantryEase

2. Install dependencies:
    
   ```bash
   npm install

3. Set up Firebase:

  - Create a Firebase project in the Firebase Console.
  - Enable Firestore and Authentication (Google Sign-In or Email/Password).
  - Create a .env.local file in the root directory and add your Firebase configuration:

      ```makefile
      API_KEY=your_api_key
      AUTH_DOMAIN=your_auth_domain
      PROJECT_ID=your_project_id
      STORAGE_BUCKET=your_storage_bucket
      MESSAGING_SENDER_ID=your_messaging_sender_id
      APP_ID=your_app_id
      MEASUREMENT_ID=your_measurement_id

4. Run the development server:

   ```bash
   npm run dev
