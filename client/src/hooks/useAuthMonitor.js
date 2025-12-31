// export default useSessionCheck;
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const useAuthMonitor = () => {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    console.log('🔍 [AUTH MONITOR] Hook started');

    const handleSessionExpiry = () => {
      if (hasRedirected.current) return;
      hasRedirected.current = true;

      console.log('🚫 [AUTH MONITOR] Session expired, cleaning up...');
      
      localStorage.clear();
      navigate("/login", { replace: true });
    };

    const checkTokenExpiry = () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("❌ [AUTH MONITOR] No token found");
        handleSessionExpiry();
        return;
      }

      try {
        // Decode JWT token to get expiry time
        const decoded = jwtDecode(authToken);
        
        // JWT exp is in seconds, convert to milliseconds
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const remaining = expiryTime - currentTime;

        console.log(`⏰ [AUTH MONITOR] Current: ${currentTime}, Expiry: ${expiryTime}`);
        console.log(`⏰ [AUTH MONITOR] Remaining: ${Math.floor(remaining / 1000)}s`);

        if (remaining <= 0) {
          console.log("❌ [AUTH MONITOR] Token expired!");
          handleSessionExpiry();
          return;
        }

        // Set timeout for remaining time
        const timeout = setTimeout(() => {
          if (hasRedirected.current) return;
          hasRedirected.current = true;

          console.log("❌ [AUTH MONITOR] Session timed out!");
          localStorage.clear();
          navigate("/login", { replace: true });
        }, remaining);

        // Store timeout reference for cleanup
        return timeout;

      } catch (error) {
        console.error("❌ [AUTH MONITOR] Invalid token:", error.message);
        handleSessionExpiry();
      }
    };

    // Run the check and get timeout reference
    const timeout = checkTokenExpiry();

    // Cleanup function
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [navigate]);
};