﻿# Skill-swap-MERN25-Batch
Project Name: Skill Swap
Tech Stack: MERN (MongoDB, Express.js, React.js, Node.js) + Bootstrap + JWT + Axios
Description:
The Skill Swap platform is a full-featured web application that enables users to exchange skills and learn from one another by posting and requesting skills. It facilitates peer-to-peer knowledge sharing in a secure and interactive environment using email-based authentication and request management.

 Objectives
Allow users to register via email 
Enable users to post their skills for others to view
Let users request skills from other users (except their own)

Provide a dashboard to manage:
Posted Skills
Sent and Recived Requests
Implement a request approval system (Accept / Reject)
Allow users to communicate via email after request approval

#Features 
1. User Authentication
Email based login system
JWT token-based authentication for session handling
Secure protected routes using custom middleware

2. Skill Posting & Management
Post skills with title, description, and category
View all skills on the homepage
Filter and manage personal skills (edit/delete)
Skills are associated with the user who created them

3. Skill Request System
Send skill request to other users (but not to self)
View all requests (sent and received)
Accept or reject Received skill requests
Prevent duplicate requests
Upon acceptance, both users can view each other's email for contact

4. Request Handling
Dynamic filtering (All / Sent / Received)
Real-time status updates (Pending, Accepted, Rejected)
Backend validation of permissions and roles (sender/receiver logic)
Toast notifications for all success/error operations

 Tools & Libraries Used
Frontend: React, Axios, Bootstrap, React Router, Toastify
Backend: Node.js, Express.js, Mongoose, nodemailer, dotenv
Database: MongoDB Atlas
Security: JWT Tokens, Custom Auth Middleware
Testing: Postman API testing, Console logging
