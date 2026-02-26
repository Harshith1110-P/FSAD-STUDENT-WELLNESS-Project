# 🏥 Student Health & Wellness Platform

A comprehensive health and wellness management platform for university students, featuring role-based access for administrators and students.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-cyan?logo=tailwindcss)

## ✨ Features

### 🔐 Authentication & Role-Based Access
- Secure login system with role-based navigation
- Admin and Student portals with distinct features
- Session persistence with localStorage

### 👨‍💼 Admin Portal
- **Dashboard**: Overview of health center statistics, appointments, and alerts
- **Student Management**: View and manage student health records
- **Appointments**: Schedule and manage appointments
- **Health Records**: Access and update student medical records
- **Medications**: Track and manage medication inventory
- **Wellness Programs**: Create and manage wellness initiatives
- **Reports**: Analytics and reporting tools

### 👨‍🎓 Student Portal
- **Dashboard**: Personal health overview and quick actions
- **Appointments**: Book, view, and manage appointments
- **Health Records**: Access personal medical records
- **Wellness Center**: Track wellness goals and join programs
- **Resources**: Health education materials
- **Counseling**: Mental health support services
- **Emergency**: Quick access to emergency contacts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-health-wellness
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@university.edu | admin123 |
| Student | student@university.edu | student123 |

## 📦 Deployment

### Vercel
1. Push your code to a Git repository
2. Import the project in Vercel
3. Deploy automatically

### Netlify
1. Push your code to a Git repository
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API

## 📁 Project Structure

```
student-health-wellness/
├── public/
│   └── health-icon.svg
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   └── StudentLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── StudentsPage.jsx
│   │   ├── student/
│   │   │   ├── AppointmentsPage.jsx
│   │   │   ├── HealthRecordsPage.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── WellnessPage.jsx
│   │   └── LoginPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#0ea5e9) - Admin theme
- **Wellness**: Green (#22c55e) - Student theme
- **Accent colors**: Orange, Purple for various UI elements

### Components
- Cards with subtle shadows and rounded corners
- Responsive navigation with mobile support
- Form inputs with focus states
- Status badges and progress indicators

## 📱 Responsive Design

The platform is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- Protected routes based on user roles
- Session management with localStorage
- Automatic redirect for unauthorized access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for University Health Services
