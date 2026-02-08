# Supabase Integration Setup Guide

## Step 1: Create Tables in Supabase

1. Go to your Supabase Dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy all the SQL from `database/schema.sql`
5. Paste it into the SQL editor
6. Click **Run**

This will create all necessary tables and insert sample data.

## Step 2: Add Supabase Script to HTML Files

Add this line to the `<head>` section of EVERY HTML file (after other scripts):

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="../database/config.js"></script>
<script src="../database/services.js"></script>
```

For files in the root directory, use:
```html
<script src="./database/config.js"></script>
<script src="./database/services.js"></script>
```

## Step 3: Initialize Supabase in Your Pages

Before any database calls, initialize Supabase:

```javascript
// In your page script, at the top
window.addEventListener('load', async () => {
    await initSupabase();
    // Now you can use database functions
    // loadDashboard(), etc.
});
```

## Step 4: Replace localStorage with Supabase

### Example: Login
**OLD (localStorage):**
```javascript
localStorage.setItem('userName', username);
```

**NEW (Supabase):**
```javascript
const result = await loginUser(username, password);
if (result.success) {
    localStorage.setItem('userRole', result.user.role);
    localStorage.setItem('userName', result.user.username);
    window.location.href = 'appropriate-page.html';
}
```

### Example: Save Transaction
**OLD (localStorage):**
```javascript
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
transactions.push(newTransaction);
localStorage.setItem('transactions', JSON.stringify(transactions));
```

**NEW (Supabase):**
```javascript
const result = await createTransaction({
    date: newTransaction.date,
    time: newTransaction.time,
    employee: newTransaction.employee,
    items_detail: newTransaction.itemsDetail,
    quantity: newTransaction.quantity,
    amount: newTransaction.amount,
    status: 'Completed'
});
```

### Example: Load Transactions
**OLD (localStorage):**
```javascript
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
```

**NEW (Supabase):**
```javascript
const result = await getTransactionsByDate('2026-02-07');
if (result.success) {
    const transactions = result.data;
}
```

## Available Functions

### Authentication
- `loginUser(username, password)` - Login user
- `createUser(username, password, role)` - Create new user

### Transactions
- `createTransaction(transactionData)` - Create new transaction
- `getTransactionsByDate(date)` - Get transactions for a specific date
- `getTransactionsByEmployee(employeeName, date)` - Get employee transactions
- `getTodayTransactions(employeeName)` - Get today's transactions
- `getAllTransactions()` - Get all transactions

### Inventory
- `getInventory()` - Get all inventory items
- `createInventoryItem(itemData)` - Add new item
- `updateInventoryItem(itemId, updates)` - Update item
- `deleteInventoryItem(itemId)` - Delete item

### Employees
- `getEmployees()` - Get all employees
- `createEmployee(employeeData)` - Add new employee
- `updateEmployee(employeeId, updates)` - Update employee
- `deleteEmployee(employeeId)` - Delete employee

### Analytics
- `getTotalSales(startDate, endDate)` - Calculate total sales
- `getLowStockItems()` - Get items with low stock

### Real-time Subscriptions
- `subscribeToTransactions(callback)` - Listen for transaction changes
- `subscribeToInventory(callback)` - Listen for inventory changes

## Important Notes

1. **Security**: The current setup uses basic policies. For production, implement proper authentication and row-level security policies.

2. **Password Hashing**: Implement bcrypt or similar for password hashing before deploying to production.

3. **Error Handling**: All functions return `{ success: true/false, data, message }` format.

4. **Real-time Updates**: Real-time subscriptions update your data automatically when changes occur in Supabase.

## Next Steps

1. Execute the SQL schema in Supabase
2. Add Supabase scripts to all HTML files
3. Initialize Supabase on page load
4. Replace localStorage calls with database functions
5. Test each page functionality
6. Deploy when ready!

Need help with any specific page? Let me know!
