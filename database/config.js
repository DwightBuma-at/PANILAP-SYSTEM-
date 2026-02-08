// Supabase Configuration
const SUPABASE_URL = 'https://ngsjmmfnmgiahmqavkza.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc2ptbWZubWdpYWhtcWF2a3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTUwNjEsImV4cCI6MjA4NTk5MTA2MX0.LZ5Wo6Njr5a1jeaeL5IEq4gG4T2zLMaHBSjRIYlmOvQ';

// Initialize Supabase client (prevent redeclaration)
if (typeof window.supabaseInstance === 'undefined') {
    window.supabaseInstance = null;
}

// Wait for Supabase library to load
async function waitForSupabaseLib(maxAttempts = 100) {
    return new Promise((resolve) => {
        let attempts = 0;
        const checkInterval = setInterval(() => {
            attempts++;
            console.log(`[Supabase] Checking for library... attempt ${attempts}/${maxAttempts}`);
            
            if (window.supabase && window.supabase.createClient) {
                console.log('[Supabase] Library loaded successfully');
                clearInterval(checkInterval);
                resolve(true);
            } else if (attempts >= maxAttempts) {
                console.error('[Supabase] Library failed to load after max attempts');
                clearInterval(checkInterval);
                resolve(false);
            }
        }, 50);
    });
}

async function initSupabase() {
    try {
        console.log('[Supabase] Starting initialization...');
        
        // Wait for Supabase library to load
        const libLoaded = await waitForSupabaseLib();
        
        if (!libLoaded) {
            console.error('[Supabase] Failed: Library not available');
            return null;
        }
        
        if (!window.supabase || !window.supabase.createClient) {
            console.error('[Supabase] Failed: createClient not available');
            return null;
        }
        
        console.log('[Supabase] Creating client...');
        const { createClient } = window.supabase;
        window.supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        console.log('[Supabase] Client created successfully:', window.supabaseInstance ? 'YES' : 'NO');
        return window.supabaseInstance;
    } catch (error) {
        console.error('[Supabase] Error initializing:', error);
        return null;
    }
}

// Get Supabase instance
function getSupabase() {
    if (!window.supabaseInstance) {
        console.error('[Supabase] Not initialized. Call initSupabase() first.');
        return null;
    }
    return window.supabaseInstance;
}
