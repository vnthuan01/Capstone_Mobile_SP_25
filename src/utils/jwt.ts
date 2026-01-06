import { User } from '../store/authStore';

/**
 * Decode JWT token without verification (client-side)
 * Chỉ dùng để extract payload, không verify signature
 */
export function decodeJWT(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Decode base64url
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    const decoded = JSON.parse(jsonPayload);

    return {
      id: decoded.id,
      email: decoded.email,
      full_name: decoded.full_name,
      phone: decoded.phone,
      role: decoded.role,
      dealership_id: decoded.dealership_id,
    };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    const decoded = JSON.parse(jsonPayload);
    const exp = decoded.exp;

    if (!exp) return true;

    // Check if expired (exp is in seconds, Date.now() is in milliseconds)
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
}
