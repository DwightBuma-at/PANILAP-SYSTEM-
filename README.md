# Panilap Eatery POS System

A comprehensive Point-of-Sale (POS) management system for Panilap Eatery with real-time inventory tracking, employee management, and sales analytics.

## Features

✅ **Admin Dashboard**
- Real-time sales analytics and performance metrics
- Inventory management with stock alerts
- Employee management and scheduling
- Sales history and transaction logs

✅ **Employee Portal**
- POS system for taking orders
- Order history tracking
- Real-time sales monitoring

✅ **Security**
- Role-based access control (Admin/Employee)
- Secure login authentication
- Session protection against unauthorized access
- Cross-account protection

✅ **Database Integration**
- Supabase backend for persistent data storage
- Real-time transaction logging
- Action history tracking (add items, stock updates, sales)

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Tailwind CSS
- **UI Components**: Font Awesome 6.4.0, Custom Modal System
- **Database**: Supabase (PostgreSQL)
- **Charts**: Chart.js for analytics

## Project Structure

```
├── index.html                 # Login page
├── database/
│   ├── config.js             # Supabase configuration
│   └── services.js           # Database functions
├── employee/
│   ├── employee_dashboard.html
│   ├── employee_pos.html
│   └── employee_OrderLogs.html
├── superadmin/
│   ├── superadmin_dashboard.html
│   ├── superadmin_employee.html
│   ├── superadmin_inventory.html
│   └── superadmin_sales.html
└── README.md
```

## Getting Started

### Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Employee Account:**
- Username: `employee`
- Password: `employee123`

### Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. Login with appropriate credentials
4. Start using the POS system

## Database Tables

- `users` - User accounts
- `employees` - Employee information
- `inventory` - Menu items and stock
- `transactions` - Sales records
- `action_logs` - Action history (add-item, stock-in, remove-item, sales)
- `on_duty` - Employee duty tracking

## Features in Detail

### Sales Management
- Real-time transaction processing
- Automatic sales logging
- Daily sales analytics
- Transaction history by date

### Inventory Management
- Stock in/out operations
- Low stock alerts (threshold: 30 items)
- Item addition and removal
- Action history with timestamps

### Employee Management
- Employee profile management
- Duty schedule tracking
- Performance metrics
- Action logging

### Security Features
- Admin cannot access employee pages directly
- Employee cannot access admin pages directly
- Automatic session cleanup on unauthorized access
- Role verification on page load

## Development Notes

- All credentials are hardcoded for demo purposes (should use Supabase Auth in production)
- Supabase configuration stored in `database/config.js`
- All database operations are async with error handling
- Modal system used for all user confirmations and notifications

## Author

Dwight Buma-at

## License

Proprietary - Panilap Eatery
