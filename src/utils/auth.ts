import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';

// Constants
const UNLIMITED_PASSWORD = 'Yyamakasi1900&';
const TRIAL_PASSWORD = '00000';
const MAX_LOGIN_ATTEMPTS = 5;
const TRIAL_DURATION_DAYS = 7;
const LOCKOUT_DURATION_MINUTES = 30;

// Types
interface AuthState {
  isAuthenticated: boolean;
  isUnlimited: boolean;
  trialStartDate?: string;
  trialEndDate?: string;
  loginAttempts: number;
  lastAttemptTime?: string;
  lockoutEndTime?: string;
}

// Helper functions
const hashPassword = (password: string): string => {
  const salt = 'your-secure-salt-value'; // In production, use environment variable
  return CryptoJS.SHA256(password + salt).toString();
};

const getStoredAuthState = (): AuthState => {
  const storedState = localStorage.getItem('authState');
  if (storedState) {
    return JSON.parse(storedState);
  }
  return {
    isAuthenticated: false,
    isUnlimited: false,
    loginAttempts: 0
  };
};

const setAuthState = (state: AuthState): void => {
  localStorage.setItem('authState', JSON.stringify(state));
};

const isLocked = (authState: AuthState): boolean => {
  if (!authState.lockoutEndTime) return false;
  return dayjs().isBefore(dayjs(authState.lockoutEndTime));
};

const getRemainingLockoutTime = (authState: AuthState): number => {
  if (!authState.lockoutEndTime) return 0;
  const remaining = dayjs(authState.lockoutEndTime).diff(dayjs(), 'minute');
  return Math.max(0, remaining);
};

const incrementLoginAttempts = (authState: AuthState): AuthState => {
  const newAttempts = authState.loginAttempts + 1;
  const updatedState = { ...authState, loginAttempts: newAttempts, lastAttemptTime: dayjs().toISOString() };
  
  if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
    updatedState.lockoutEndTime = dayjs().add(LOCKOUT_DURATION_MINUTES, 'minute').toISOString();
  }
  
  return updatedState;
};

const resetLoginAttempts = (authState: AuthState): AuthState => {
  return {
    ...authState,
    loginAttempts: 0,
    lastAttemptTime: undefined,
    lockoutEndTime: undefined
  };
};

// Main authentication functions
export const login = (password: string): { success: boolean; message: string } => {
  let authState = getStoredAuthState();
  
  // Check if account is locked
  if (isLocked(authState)) {
    const remainingMinutes = getRemainingLockoutTime(authState);
    return {
      success: false,
      message: `الحساب مقفل. يرجى المحاولة بعد ${remainingMinutes} دقيقة.`
    };
  }
  
  // Validate password
  const hashedPassword = hashPassword(password);
  const hashedUnlimited = hashPassword(UNLIMITED_PASSWORD);
  const hashedTrial = hashPassword(TRIAL_PASSWORD);
  
  if (hashedPassword === hashedUnlimited) {
    // Unlimited access
    authState = {
      ...resetLoginAttempts(authState),
      isAuthenticated: true,
      isUnlimited: true
    };
    setAuthState(authState);
    return { success: true, message: 'تم تفعيل الوصول الكامل' };
  }
  
  if (hashedPassword === hashedTrial) {
    // Trial access
    if (authState.trialEndDate && dayjs().isAfter(dayjs(authState.trialEndDate))) {
      return { success: false, message: 'انتهت فترة التجربة' };
    }
    
    if (!authState.trialStartDate) {
      const now = dayjs();
      authState = {
        ...resetLoginAttempts(authState),
        isAuthenticated: true,
        isUnlimited: false,
        trialStartDate: now.toISOString(),
        trialEndDate: now.add(TRIAL_DURATION_DAYS, 'day').toISOString()
      };
    } else {
      authState = {
        ...resetLoginAttempts(authState),
        isAuthenticated: true,
        isUnlimited: false
      };
    }
    
    setAuthState(authState);
    return { 
      success: true, 
      message: `تم تفعيل وضع التجربة - تنتهي في ${dayjs(authState.trialEndDate).format('YYYY/MM/DD')}`
    };
  }
  
  // Invalid password
  authState = incrementLoginAttempts(authState);
  setAuthState(authState);
  
  if (isLocked(authState)) {
    const remainingMinutes = getRemainingLockoutTime(authState);
    return {
      success: false,
      message: `تم قفل الحساب بسبب محاولات فاشلة متكررة. يرجى المحاولة بعد ${remainingMinutes} دقيقة.`
    };
  }
  
  return {
    success: false,
    message: `كلمة المرور غير صحيحة. المحاولات المتبقية: ${MAX_LOGIN_ATTEMPTS - authState.loginAttempts}`
  };
};

export const logout = (): void => {
  const authState = getStoredAuthState();
  setAuthState({
    ...authState,
    isAuthenticated: false
  });
};

export const isAuthenticated = (): boolean => {
  const authState = getStoredAuthState();
  
  if (!authState.isAuthenticated) return false;
  
  if (authState.isUnlimited) return true;
  
  if (authState.trialEndDate && dayjs().isAfter(dayjs(authState.trialEndDate))) {
    logout();
    return false;
  }
  
  return true;
};

export const getAuthInfo = () => {
  const authState = getStoredAuthState();
  
  if (!authState.isAuthenticated) return null;
  
  return {
    isUnlimited: authState.isUnlimited,
    trialStartDate: authState.trialStartDate,
    trialEndDate: authState.trialEndDate,
    remainingDays: authState.trialEndDate 
      ? Math.max(0, dayjs(authState.trialEndDate).diff(dayjs(), 'day'))
      : null
  };
};