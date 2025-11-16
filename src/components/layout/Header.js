'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import logoIcon from '@/assets/images/icon.svg';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [hasToken, setHasToken] = useState(false);
  
  useEffect(() => {
    // Check if user has token (for cases where Redux state is not persisted)
    setHasToken(!!localStorage.getItem('access_token'));
  }, []);
  
  const showLogout = isAuthenticated || hasToken;

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSpace}></div>
        
        <div className={styles.logoContainer}>
          <Image
            src={logoIcon}
            alt="NexLearn"
            width={120}
            height={40}
            style={{ height: 'auto' }}
          />
        </div>

        <div className={styles.rightSection}>
          {showLogout && (
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
