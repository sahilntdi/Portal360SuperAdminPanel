// src/components/ProtectedLayout.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, removeAuthTokens } from '@/utils/axios'; // Import from axios

const ProtectedLayout: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const auth = isAuthenticated();
            setIsAuth(auth);
            setIsChecking(false);
            
            if (!auth && !location.pathname.includes('/auth')) {
                // Clean redirect without showing modal
                removeAuthTokens();
            }
        };

        checkAuth();

        // Listen for storage events
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'authToken' || e.key === 'logout') {
                checkAuth();
            }
        };

        // Listen for custom logout event
        const handleCustomLogout = () => {
            setIsAuth(false);
            setIsChecking(false);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('logout', handleCustomLogout);

        // Periodic check every minute
        const intervalId = setInterval(checkAuth, 60 * 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('logout', handleCustomLogout);
            clearInterval(intervalId);
        };
    }, [location.pathname]);

    // Show loading screen
    if (isChecking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/30">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="mt-6 text-foreground/80 font-medium">Checking authentication...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuth && !location.pathname.includes('/auth')) {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    // Render protected routes
    return <Outlet />;
};

export default ProtectedLayout;