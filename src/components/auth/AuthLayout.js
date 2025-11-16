import Image from 'next/image';
import bgImage from '@/assets/images/dark-nature-blue-abstract-creative-background-design 1.svg';
import leftImage from '@/assets/images/Frame 2408.svg';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src={bgImage}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className={styles.card}>
        <div className={styles.leftSide}>
          <div className={styles.illustration}>
            <Image
              src={leftImage}
              alt="Learning Illustration"
              width={400}
              height={400}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>

        <div className={styles.rightSide}>
          {children}
        </div>
      </div>
    </div>
  );
}
