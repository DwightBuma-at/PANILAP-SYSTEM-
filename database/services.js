// Database Service Functions

// ============ AUTHENTICATION ============

async function loginUser(username, password) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();
        
        if (error || !data) {
            return { success: false, message: 'User not found' };
        }
        
        // Simple password check (in production, use bcrypt)
        if (data.password !== password) {
            return { success: false, message: 'Invalid password' };
        }
        
        return { 
            success: true, 
            user: {
                id: data.id,
                username: data.username,
                role: data.role
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: error.message };
    }
}

async function createUser(username, password, role) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('users')
            .insert([
                { username, password, role }
            ])
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Create user error:', error);
        return { success: false, message: error.message };
    }
}

// ============ TRANSACTIONS ============

async function createTransaction(transactionData) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('transactions')
            .insert([transactionData])
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Create transaction error:', error);
        return { success: false, message: error.message };
    }
}

async function getTransactionsByDate(date) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('date', date)
            .order('time', { ascending: false });
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get transactions error:', error);
        return { success: false, message: error.message };
    }
}

async function getTransactionsByEmployee(employeeName, date) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('employee', employeeName)
            .eq('date', date)
            .order('time', { ascending: false });
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get employee transactions error:', error);
        return { success: false, message: error.message };
    }
}

async function getTodayTransactions(employeeName) {
    try {
        const today = new Date().toISOString().split('T')[0];
        return await getTransactionsByEmployee(employeeName, today);
    } catch (error) {
        console.error('Get today transactions error:', error);
        return { success: false, message: error.message };
    }
}

async function getAllTransactions() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false })
            .order('time', { ascending: false });
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get all transactions error:', error);
        return { success: false, message: error.message };
    }
}

// ============ INVENTORY ============

async function getInventory() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get inventory error:', error);
        return { success: false, message: error.message };
    }
}

async function createInventoryItem(itemData) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('inventory')
            .insert([itemData])
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Create inventory item error:', error);
        return { success: false, message: error.message };
    }
}

async function updateInventoryItem(itemId, updates) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('inventory')
            .update(updates)
            .eq('id', itemId)
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Update inventory item error:', error);
        return { success: false, message: error.message };
    }
}

async function deleteInventoryItem(itemId) {
    try {
        const supabase = getSupabase();
        const { error } = await supabase
            .from('inventory')
            .delete()
            .eq('id', itemId);
        
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Delete inventory item error:', error);
        return { success: false, message: error.message };
    }
}

// ============ EMPLOYEES ============

async function getEmployees() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('lastname');
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get employees error:', error);
        return { success: false, message: error.message };
    }
}

async function createEmployee(employeeData) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('employees')
            .insert([employeeData])
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Create employee error:', error);
        return { success: false, message: error.message };
    }
}

async function updateEmployee(employeeId, updates) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('employees')
            .update(updates)
            .eq('id', employeeId)
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Update employee error:', error);
        return { success: false, message: error.message };
    }
}

async function deleteEmployee(employeeId) {
    try {
        const supabase = getSupabase();
        console.log('deleteEmployee - Supabase instance:', supabase ? 'exists' : 'null');
        console.log('deleteEmployee - ID to delete:', employeeId);
        
        if (!supabase) {
            throw new Error('Supabase not initialized');
        }
        
        const { data, error } = await supabase
            .from('employees')
            .delete()
            .eq('id', employeeId);
        
        console.log('deleteEmployee - Full Response:', { data, error });
        if (error) console.log('deleteEmployee - Error details:', JSON.stringify(error));
        
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Delete employee error:', error);
        return { success: false, message: error.message };
    }
}

// ============ ANALYTICS ============

async function getTotalSales(startDate, endDate) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('transactions')
            .select('amount')
            .gte('date', startDate)
            .lte('date', endDate);
        
        if (error) throw error;
        
        const total = data.reduce((sum, t) => sum + (t.amount || 0), 0);
        return { success: true, total, count: data.length };
    } catch (error) {
        console.error('Get total sales error:', error);
        return { success: false, message: error.message };
    }
}

async function getLowStockItems() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .lt('quantity', 30)
            .order('quantity');
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get low stock items error:', error);
        return { success: false, message: error.message };
    }
}

// ============ REAL-TIME SUBSCRIPTIONS ============

function subscribeToTransactions(callback) {
    try {
        const supabase = getSupabase();
        const subscription = supabase
            .from('transactions')
            .on('*', payload => {
                callback(payload);
            })
            .subscribe();
        
        return subscription;
    } catch (error) {
        console.error('Subscribe to transactions error:', error);
        return null;
    }
}

function subscribeToInventory(callback) {
    try {
        const supabase = getSupabase();
        const subscription = supabase
            .from('inventory')
            .on('*', payload => {
                callback(payload);
            })
            .subscribe();
        
        return subscription;
    } catch (error) {
        console.error('Subscribe to inventory error:', error);
        return null;
    }
}
// ============ ACTION LOGS ============

async function logActionToSupabase(actionType, itemName, quantityChanged, previousQuantity = null, remainingQuantity = null) {
    try {
        const supabase = getSupabase();
        const timestamp = new Date().toLocaleString('en-PH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const { data, error } = await supabase
            .from('action_logs')
            .insert([{
                timestamp: timestamp,
                type: actionType,
                item_name: itemName,
                quantity_changed: quantityChanged,
                previous_quantity: previousQuantity,
                remaining_quantity: remainingQuantity
            }])
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Log action error:', error);
        return { success: false, message: error.message };
    }
}

async function getActionLogs(limit = 100) {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('action_logs')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(limit);
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get action logs error:', error);
        return { success: false, message: error.message };
    }
}

async function clearActionLogs() {
    try {
        const supabase = getSupabase();
        const { error } = await supabase
            .from('action_logs')
            .delete()
            .neq('id', 0); // Delete all records
        
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Clear action logs error:', error);
        return { success: false, message: error.message };
    }
}