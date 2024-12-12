Task Management System - Frontend
This is the React-based frontend for the Task Management System. It provides a user-friendly interface to interact with the backend API for managing tasks.

Features
Task Display:
View a list of tasks.
Separate actions for completed and active tasks.
Task Management:
Add new tasks using a form.
Mark tasks as completed or undo completed status.
Edit existing tasks.
Delete tasks.
Built With
React: JavaScript library for building the user interface.
Axios: HTTP client for making API requests.
CSS/Bootstrap: For responsive and styled UI components.
Setup Instructions
Prerequisites
Node.js and npm installed.
Backend server for the Task Management System running locally or remotely.
Installation Steps
Clone the repository:

bash
Copy code
git clone <frontend-repo-url>
cd <frontend-repo-folder>
Install dependencies:

bash
Copy code
npm install
Configure the backend API URL:

Create a .env file in the project root.
Add the following variable:
plaintext
Copy code
REACT_APP_API_URL=http://localhost:5000
Replace http://localhost:5000 with the actual backend URL if it’s hosted remotely.
Start the development server:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Folder Structure
src
components
TaskList.js: Displays tasks in a list format.
TaskForm.js: Form to add or edit tasks.
TaskActions.js: Provides buttons for task completion, undo, or deletion.
services
api.js: Axios setup for API requests.
App.js: Main application component.
index.js: Application entry point.
Assumptions and Decisions
API Integration: Assumes the backend implements RESTful conventions for managing tasks.
Task Editing: Allows inline edits for task titles and descriptions.
Styling: Uses a combination of custom CSS and Bootstrap for a clean, responsive design.
Future Enhancements
Add filtering options for completed and active tasks.
Improve form validation with real-time error messages.
Enhance the user experience with animations for task updates.
License
This project is licensed under the MIT License.

Authors
Rayan Al Hassan

