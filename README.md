# Omega Repairs

**[Live Demonstration](https://cindyproject-d27d4.web.app/) · [GitHub Repository](https://github.com/Nathandcwendy/cindyProject)**

## Description

I built Omega Repairs to help vehicle owners in Nigeria find automobile repair shops and compare their services before deciding who to contact. The application combines a directory of stored workshop profiles with location-based search powered by Google Places.

Users can browse workshops by city, filter for the services they need, view highly rated shops, and open detailed profiles containing contact information, photographs, opening hours, and service descriptions. I developed the interface as a React application and used Firebase for hosting, authentication, and the workshop directory.

## Problem Statement

Finding a suitable mechanic can be difficult when a vehicle breaks down unexpectedly or when a driver is unfamiliar with an area. A workshop's location alone does not tell a vehicle owner whether it provides the required service, when it opens, or how other customers have rated it.

My goal was to bring this information into one place and make the search process easier. Omega Repairs gives users a practical starting point for comparing workshops and reaching a suitable repair service.

## Primary Objectives

- Make automobile repair shop information easier to find across Nigerian cities.
- Support discovery through both city-based browsing and a selected location.
- Help users compare workshops by services, ratings, contact details, and opening hours.
- Provide detailed profiles that help users decide which workshop to contact.
- Keep the interface usable across screen sizes, with light and dark themes.

## Features

### Repair Shop Directory

The directory supports Abuja, Enugu, Ibadan, Lagos, Owerri, Port Harcourt, and Uyo. Users can browse the general collection or select a city.

I use Firestore queries to retrieve rated shops in descending rating order and load additional results with cursor-based pagination. Service filters help users narrow the directory to workshops offering services such as engine repairs, air conditioning, brakes, suspension repairs, and wheel alignment.

### Location-Based Search

Users can enter a location through Google Places Autocomplete or use their browser's geolocation feature. The search component converts the selected location into coordinates and passes them to the nearby-search page.

The current Google Places request searches for `car_repair` businesses within a 50-kilometre radius and ranks results by prominence. Additional Place Details requests retrieve information such as addresses, phone numbers, ratings, photographs, websites, and opening hours.

### Workshop Profiles

The application provides profile pages for both stored directory entries and Google Places search results. Depending on the available data, profiles display:

- Workshop name, photographs, and rating.
- Address and telephone contact.
- Services and business description.
- Opening hours and opening status.
- Website and work experience information.

### Interface and Navigation

I use React Router for page navigation and lazy-load the main pages. Shared components provide the header, sidebar, footer, search overlay, and form inputs. Theme state is managed through React Context and stored in local storage.

The repository also includes email/password sign-in and a protected utility route.

## Tools, Technologies and Platforms Used

| Area | Technologies | Purpose |
| --- | --- | --- |
| Frontend | React 18, React DOM, JavaScript, JSX | Application interface and client-side behaviour. |
| Routing and state | React Router 6, React Context, React Hooks | Navigation, shared data, authentication state, and themes. |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer, Preline UI | Responsive layouts, styling, and UI components. |
| Interface libraries | React Icons, React Toastify, React Router Hash Link | Icons, notifications, and section navigation. |
| Development tooling | Vite 4, ESLint | Development server, production builds, and linting. |
| Data and authentication | Cloud Firestore, Firebase Authentication | Stored workshop records and email/password sign-in. |
| Location services | Google Maps JavaScript API, Places API, Geocoding API, browser geolocation | Address selection, coordinate lookup, nearby search, and place details. |
| Hosting | Firebase Hosting | Delivery of the built application and client-side route rewrites. |
| Data preparation | Node.js, Puppeteer, Axios, Firebase Admin SDK, UUID | Workshop data collection and upload utilities. |

The repository's separate scheduled utility also uses Firebase Functions and Nodemailer.

## Implementation

### Stored Workshop Data

I manage Firestore access in [FirebaseContext.jsx](https://github.com/Nathandcwendy/cindyProject/blob/main/src/contexts/FirebaseContext.jsx). The provider handles collection queries, service filters, pagination, profile retrieval, and authentication state.

The directory reads the main `repairShops` collection and city-specific collections:

| City | Collection |
| --- | --- |
| Abuja | `abuja` |
| Enugu | `enugu` |
| Ibadan | `ibadan` |
| Lagos | `lagos` |
| Owerri | `owerri` |
| Port Harcourt | `portHarcourt` |
| Uyo | `uyo` |

The scripts in `Scrapper/` prepare workshop information for the directory. The upload script writes records using their IDs and adds `createdAt` and `lastUpdated` server timestamps.

### Nearby Search

I keep Google Places state in [DataContext.jsx](https://github.com/Nathandcwendy/cindyProject/blob/main/src/contexts/DataContext.jsx). It reads coordinates from the search parameters, requests nearby repair shops, fetches place details, and manages pagination and loading states.

[Search.jsx](https://github.com/Nathandcwendy/cindyProject/blob/main/src/components/Search.jsx) handles location input, Nigeria-restricted address autocomplete, browser geolocation, and reverse geocoding.

### Project Structure

```text
cindyProject/
├── src/
│   ├── components/       # Shared layout, search, and form components
│   ├── contexts/         # Firestore, Places, authentication, and theme state
│   ├── hooks/            # Firebase data-access hook
│   ├── pages/            # Home, directory, search, profiles, and utilities
│   ├── utils/            # Query helpers, cities, and service definitions
│   ├── App.jsx           # Shared layout and providers
│   └── main.jsx          # Route definitions
├── public/               # Static assets
├── Scrapper/             # Workshop data preparation and upload tools
├── functions/            # Separate scheduled TPP utility
├── firebase.json         # Hosting, functions, and emulator configuration
├── tailwind.config.js
└── vite.config.js
```

## Running the Project Locally

### 1. Install the Frontend

Install Node.js and npm, then clone the repository:

```bash
git clone https://github.com/Nathandcwendy/cindyProject.git
cd cindyProject
npm install
```

### 2. Configure Firebase and Google Maps

Create a `.env.local` file in the repository root:

```dotenv
VITE_FIREBASE_API_KEY=your_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_firebase_app_id
```

Use the Firebase web configuration for your own project. Create the workshop collections and configure the Firestore access rules and query indexes required by the application. Enable Email/Password authentication if you want to use the login and protected utility route.

The current `Search.jsx` implementation also reads its Google Maps key from `VITE_FIREBASE_API_KEY`. Configure that key for the Maps JavaScript, Places, and Geocoding services used by the application.

The optional data uploader expects `Scrapper/serviceAccount.json` and `Scrapper/cindyData2.json`, which are not included in the repository. Supply your own credentials and prepared dataset if you use that tool. Firebase Admin credentials belong in server-side tooling.

### 3. Start Development

```bash
npm run dev
```

Open the local URL printed by Vite.

### Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production frontend build. |
| `npm run lint` | Run the configured ESLint checks. |

## Deployment

The hosting configuration serves `dist/` and rewrites client-side routes to `index.html`.

To deploy the web interface to your selected Firebase project:

```bash
npx firebase login
npx firebase use --add
npm run build
npx firebase deploy --only hosting
```

The `functions/` directory contains a separate scheduled TPP link-monitoring utility. It is independent of the public repair shop directory and location-search workflow.

## Demonstration Link

**[Open Omega Repairs](https://cindyproject-d27d4.web.app/)**

Suggested walkthrough:

1. Browse the [repair shop directory](https://cindyproject-d27d4.web.app/repairshops).
2. Select a city and apply a service filter.
3. Open a workshop profile and review its services, address, and operating hours.
4. Open nearby search and select a location.
5. Compare the available results and demonstrate the light/dark theme controls.

## Current Scope and Future Improvements

The core application focuses on discovery and workshop information. Two additional interfaces are still prototypes: the newsletter form currently displays a local confirmation without storing a subscription, and `/getquote` currently provides an image-preview interface.

Future improvements include connecting the subscription form to a mailing service, adding a complete quote-request workflow, improving workshop data freshness, and expanding automated testing.

## Project Documentation / Report

This README is my project report and setup guide. It describes the problem, objectives, features, implementation, configuration, and deployment process.

**Source code:** [Nathandcwendy/cindyProject](https://github.com/Nathandcwendy/cindyProject)
