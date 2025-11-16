'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { resetExam } from '@/store/slices/examSlice';
import styles from './page.module.css';

export default function ResultsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { results, examSubmitted } = useSelector((state) => state.exam);

  useEffect(() => {
    if (!examSubmitted || !results) {
      router.push('/exam');
    }
  }, [examSubmitted, results, router]);

  const handleDone = () => {
    dispatch(resetExam());
    router.push('/exam');
  };

  if (!results) {
    return null;
  }

  const totalQuestions = results.correct + results.wrong + results.not_attended;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Score Display */}
        <div style={{
          background: 'linear-gradient(135deg, #047094 0%, #22414D 100%)',
          color: '#ffffff',
          padding: '1.75rem 1.5rem',
          textAlign: 'center',
          borderRadius: '10px 10px 0 0'
        }}>
          <div style={{ 
            fontSize: '0.8125rem', 
            marginBottom: '0.5rem',
            fontWeight: '400'
          }}>
            Marks Obtained:
          </div>
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: '700',
            lineHeight: '1'
          }}>
            {results.score} / {totalQuestions}
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          backgroundColor: '#f0f9ff',
          padding: '1.25rem 1rem',
          borderRadius: '0 0 10px 10px'
        }}>
            {/* Total Questions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              marginBottom: '0.625rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#f59e0b',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '0.8125rem'
                }}>
                  Q
                </div>
                <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                  Total Questions:
                </span>
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                {totalQuestions}
              </span>
            </div>

            {/* Correct Answers */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              marginBottom: '0.625rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#10b981',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.875rem'
                }}>
                  ✓
                </div>
                <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                  Correct Answers:
                </span>
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                {String(results.correct).padStart(3, '0')}
              </span>
            </div>

            {/* Incorrect Answers */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              marginBottom: '0.625rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#ef4444',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.875rem'
                }}>
                  ✗
                </div>
                <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                  Incorrect Answers:
                </span>
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                {String(results.wrong).padStart(3, '0')}
              </span>
            </div>

            {/* Not Attended */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#6b7280',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.875rem'
                }}>
                  -
                </div>
                <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                  Not Attended Questions:
                </span>
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700',
                color: '#1f2937'
              }}>
                {String(results.not_attended).padStart(3, '0')}
              </span>
            </div>

            {/* Done Button */}
            <button
              onClick={handleDone}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: '#22414D',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1a3340'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#22414D'}
            >
              Done
            </button>
          </div>
      </div>
    </div>
  );
}
