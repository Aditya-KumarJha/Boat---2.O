# 🎧 boAt 2.0 – Audio, Amplified with Innovation

boAt 2.0 is a reimagined e-commerce experience for boAt, India's leading audio and wearable brand. Built for a hackathon, this project delivers a seamless, modern UI powered by Clerk authentication, a MongoDB backend, and a dynamic React frontend with smooth animations and real-time user interactions.

---
## Live Demo
**🔗 Check Website:** [Click Here](https://boat-20.vercel.app/)


## 🚀 Features

### 🔐 Authentication (Clerk + MongoDB)
- Clerk-powered sign up/sign in with custom themes and localization
- JWT-based secure backend routes
- User details synced to MongoDB
- Bookmarking support for authenticated users

### 🧠 Smart Product Highlights
- Categorized products: Headphones, Earbuds, Neckbands, Earphones
- Smart random shuffling
- Infinite horizontal scroll with animated glassmorphic cards
- Realistic mock product data simulating Amazon/Flipkart listings

### 💾 Bookmarks / Collection
- Logged-in users can add/remove bookmarks on any product
- Persistent storage in MongoDB under the user’s record
- Toast notifications for feedback (login prompt, added/removed states)

### 🎨 Smooth Visual Experience
- Soundwave Lottie animations
- Rive glow ambient effect behind hero text
- 3D floating cube in `Coming Soon` and `Loader` using React Three Fiber
- Animated product cards with tilt + parallax on hover
- Framer Motion page transitions (with Barba.js-inspired feel)

### 📱 Fully Responsive UI
- Tailwind CSS + DaisyUI + Chakra UI for design consistency
- Works on all screen sizes
- Adaptive scroll, transitions, and cards

---

## 📂 Project Structure

```bash
boAt-2.0/
│
├── backend/                       # 🛠️ Backend Node.js API
│   ├── controllers/               # 📦 Handles request logic (product routes)
│   ├── models/                    # 🧬 Mongoose schemas (Product, etc.)
│   ├── routes/                    # 🚏 API endpoints for frontend
│   ├── middleware/                # 🔐 Auth, error handlers, utilities
│   └── server.js                  # 🚀 Express app initializer
│   └── .env                       # ➕ For Backend env variables
│
├── frontend/                      # 🎨 React + Clerk + Swiper frontend
│   ├── components/                # 🧩 Reusable UI parts (Navbar, Showcase, etc.)
│   ├── pages/                     # 📄 Full views (Home, Explore, Dashboard)
│   ├── context/                   # 🧠 Global state (User Context, etc.)
│   ├── App.jsx                    # 🚏 Route layout
│   ├── index.css                  # 🎨 Global Tailwind + resets
│   └── main.jsx                   # ⚛️ Entry point
│   └── .env                       # ➕ For Frontend env variables
│
├── public/
│   └── assets/                    # 📂 Static media (videos, images)
│                          
└── README.md                      # 📘 This file
```


---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Swiper.js
- Clerk Authentication
- Axios, Lucide Icons, React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS, Dotenv, Morgan


---

## 🧪 Local Development Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas or local MongoDB
- Clerk account with frontend API key
- Vite

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/Aditya-KumarJha/Boat---2.O.git
```
```bash
cd Boat---2.O
```

### 2. Backend Setup

```bash
cd Backend
```
```bash
npm install
```

➕ Add Environment Variables
Create a .env file in the BackEnd/ folder:

```bash
PORT=5050
MONGO_URI=your_mongodb_uri
CLIENT_URL=your_frontend_localhost_url
```

Then start the backend:
```bash
npm run dev
```

Runs at http://localhost:5050

### 3. Frontend Setup

```bash
cd ../FrontEnd
```
```bash
npm install
```

➕ Add Environment Variables
Create a .env file in the BackEnd/ folder:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_BACKEND_BASE_URL=your_backend_localhost_url

```

```bash
npm run dev
```

Runs at http://localhost:5173

## 🖼 Key UI Highlights
- 🎞️ LandingShowcase: Dynamic Swiper slider with video previews.
- 📱 Touch Device Logic: Different behavior for touch vs. hover.
- 🛒 Shop Now CTA: Linked to /explore product page.
- 🔒 Protected Routes: Prevent unauthorized dashboard access.
- 🪄 Framer Motion Animations: Smooth fade-ins, transitions, video reveals.

## 🧠 Learning Outcomes
- 🔥 Building full-stack MERN projects with auth and APIs
- 🎞️ Using Swiper and Framer Motion for interactive UI
- ⚙️ Backend architecture with Express and MongoDB
- 🔐 Integrating Clerk authentication with custom flow
- 💻 Mobile-first UI with adaptive behaviors (touch vs hover)
- 📁 Managing global state using React Context

### 🤝 Contributing
Pull requests are welcome!
To contribute:
```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/feature-name

# 3. Commit and push
git commit -m "Add new feature"
git push origin feature/feature-name
```

### 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

### 🙏 Acknowledgements
- Clerk – Seamless authentication and user session management.
- Swiper – Beautiful and customizable product carousels and sliders.
- Framer Motion – Declarative animations, smooth UI transitions, and interactive hover effects.
- Lucide Icons – Clean and flexible React icon library.
- MongoDB Atlas – Cloud-hosted NoSQL database for scalable backend data storage.
- Render/Vercel – For deploying full-stack apps and static frontend sites effortlessly.
- LottieFiles – Lightweight and interactive JSON-based animations (used for loaders, soundwaves, icons).
- Rive – Real-time, interactive vector animations (used for glowing ambient effects or micro-interactions).
- React Toastify – Notification system for user actions like login/logout, bookmarking, etc.
- Tailwind CSS / DaisyUI / Skiper UI – Utility-first CSS frameworks for consistent styling and themes.
- React Parallax Tilt – For 3D tilt and parallax hover interactions on product cards.
- React Three Fiber – 3D animated cube, glowing effects, and environment lighting setup.
