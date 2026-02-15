# Tech Pirates Versathon - FinWise Financial Dashboard

A comprehensive personal finance management application built for the Tech Pirates Versathon. FinWise helps users track their income, expenses, savings goals, and budgets with a clean, modern interface.

## Features

- **Authentication**: Secure Email/Password login and signup flow powered by Firebase.
- **Dashboard**: Real-time overview of your financial health, including total income, expenses, cash flow, and savings.
- **Transactions**: Add, edit, and delete income and expense transactions. Filter by category, type, or month.
- **Analytics**: Visual charts (Trend Lines and Donut Charts) to analyze spending habits and financial trends over time.
- **Savings Goals**: Set specific financial goals (e.g., "Buy a Car", "Emergency Fund") and track progress with visual progress bars.
- **Budgeting**: specific monthly budgets for different categories (e.g., Groceries, Housing) and monitor spending against limits.
- **Profile Management**: Update your financial profile, including salary, job title, and company details.
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop and mobile devices.
- **Data Persistence**: Uses Firebase Realtime Database for secure cloud storage and LocalStorage for efficient session management.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend/Database**: Firebase Realtime Database
- **Authentication**: Custom implementation using Firebase Realtime Database (simulated auth for hackathon context)
- **Charts**: Chart.js for data visualization
- **Icons**: FontAwesome

## How to Run

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Open the Application**:
   - Open `index.html` in your web browser.
   - You will be automatically redirected to `login.html` if you are not logged in.
3. **Sign Up**:
   - Create a new account on the Signup page.
   - Complete your profile setup on the redirected page.
   - **Note:** Demo/Dummy data has been removed. You will start with a fresh, empty dashboard.
4. **Explore**:
   - Add transactions, set goals, and create budgets to see the dashboard come to life!

## File Structure

- `index.html`: Main dashboard.
- `login.html` / `signup.html`: Authentication pages.
- `profile-setup.html`: Initial user profile configuration.
- `goals.html`: Savings goals management.
- `budget.html`: Monthly budgeting tool.
- `analytics.html`: Financial charts and reports.
- `settings.html`: User settings and profile updates.
- `script.js`: Core application logic and Firebase integration.
- `goal.js`, `budget.js`, `trans.js`, `analytics.js`: specific logic for respective features.
- `styles/`: Contains all CSS files for styling.

## Configuration

To connect to your own Firebase project, update the `firebaseConfig` object in `script.js` with your project's API keys.

---
*Built by Team Tech Pirates*