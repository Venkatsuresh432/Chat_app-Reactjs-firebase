# Chat App - React.js + Firebase

This is a simple real-time chat application built using **React.js** for the frontend and **Firebase** for authentication, Firestore database, and storage services.

---

## 🚀 Features

- ✅ User Authentication (Firebase Auth)
- ✅ User Registration with Avatar Upload (Firebase Storage)
- ✅ Firestore Database Integration for storing user profiles and chat data
- ✅ Firebase Firestore Realtime Data Sync
- ✅ Modular React Components
- ✅ Responsive UI (basic version)



# SUMMARY
Repository: Chat_app-Reactjs-firebase
Analysis ID: Venkatsuresh432-Chat_app-Reactjs-firebase

📊 Analysis Summary:
• Total files: 23
• Files analyzed: 16
• Total size: 33.4 KB
• Functions found: 24
• Function calls: 112




Directory structure:
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── src
│   ├── App.jsx
│   ├── components
│   │   ├── Chat.jsx
│   │   ├── Chats.jsx
│   │   ├── Input.jsx
│   │   ├── Message.jsx
│   │   ├── Messages.jsx
│   │   ├── Navbar.jsx
│   │   ├── Search.jsx
│   │   └── Sidebar.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── ChatContext.jsx
│   ├── firebase.js
│   ├── main.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── style.scss
├── text.txt
└── vite.config.js



---

## 🔑 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a project and enable:
   - **Authentication** → Email/Password.
   - **Firestore Database** → Start in test mode or with your rules.
   - **Storage** → Start in test mode or with authenticated rules.
3. Add a **Web App** in project settings to get your Firebase credentials.
4. Create a `.env` file in the root:
    ```bash
    VITE_APIKEY=YOUR_API_KEY
    VITE_AUTHDOMAIN=YOUR_AUTH_DOMAIN
    VITE_PROJECTID=YOUR_PROJECT_ID
    VITE_STORAGEBUCKETID=YOUR_STORAGE_BUCKET
    VITE_MESSAGINGSENDERID=YOUR_MESSAGING_SENDER_ID
    VITE_APPID=YOUR_APP_ID
    ```

---

## ✅ How to Run

      ```bash
      # Clone the repository
      git clone https://github.com/Venkatsuresh432/Chat_app-Reactjs-firebase.git
      
      # Navigate to the project
      cd Chat_app-Reactjs-firebase
      
      # Install dependencies
      npm install
      
      # Run the development server
      npm run dev


## Screenshot

![App Screenshot](Screenshot%20(280).png)

---

![App Screenshot](Screenshot%20(281).png)

---

> ⚠️ **Note:** The chat UI screenshot could not be included due to an issue with Google Firestore integration during development. Once resolved, the demo and screenshots will be updated accordingly.


