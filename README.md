<h1 align="center" style="font-weight: bold;">Poll Frontend 🎯</h1>

<p align="center">
    <b>An interactive system to create, vote, and view polls dynamically.</b>
</p>

---

## 💻 Frontend Technologies

<ul>
    <li>Next.js</li>
    <li>React</li>
    <li>CSS</li>
    <li>Axios</li>
</ul>

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites
Make sure you have the following installed:
- Node.js (v16 or above)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sharifa26/Poll_frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Poll_frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
4. Create a `.env` file based on the `.env.example` template:
   ```env
   NEXT_PUBLIC_API_URL= YOUR_BACKEND_URL
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
6. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```bash
Poll_frontend/
├── public/   
│   └── assets/ 
│       └── images/  
│ 
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Next.js pages
│   ├── services/          # API calls (Axios)
│   └── styles/            # Global and component-level styles             # Utility functions
├── .env.example           # Environment variable template
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🔗 API Integration

The frontend communicates with the backend API for the following operations:
- **User Registration and Login**
- **Creating a Poll**
- **Viewing and Voting on Polls**

Ensure the API URL is correctly set in your `.env` file.

## 🛠 Dependencies

```json
"dependencies": {
    "axios": "^1.6.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^15.0.4"
}
```

## 📫 Contribute

Contributions are always welcome!

If you'd like to contribute to this project, follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeatureName`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/YourFeatureName`.
5. Open a pull request.

For major changes, please open an issue first to discuss what you'd like to modify.



<p align="center">Made with ❤️ by Sharifa26</p>
