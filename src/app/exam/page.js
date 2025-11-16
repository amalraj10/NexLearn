'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { examService } from '@/services/examService';
import { setQuestions, setExamInfo, startExam } from '@/store/slices/examSlice';
import styles from './page.module.css';

export default function ExamInstructionsPage() {
  useEffect(() => {
    document.title = "Exam Instructions | NexLearn";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the exam instructions carefully before starting your online test on NexLearn');
    }
  }, []);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    
    setIsChecking(false);
    fetchExamData();
  }, [router]);

  const fetchExamData = async () => {
    try {
      const response = await examService.getQuestions();
      if (response.success) {
        setExamData(response);
        dispatch(setQuestions(response.questions));
        dispatch(setExamInfo({
          questions_count: response.questions_count,
          total_marks: response.total_marks,
          total_time: response.total_time,
          time_for_each_question: response.time_for_each_question,
          mark_per_each_answer: response.mark_per_each_answer,
          instruction: response.instruction,
        }));
      }
    } catch (error) {
      // Handle error silently or show user-friendly message
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = () => {
    dispatch(startExam());
    router.push('/exam/test');
  };

  if (isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading exam...</div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Failed to load exam data</div>
      </div>
    );
  }

  const instructions = examData.instruction ? examData.instruction.split('\n') : [];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '1.5rem'
        }}>
          Ancient Indian History MCQ
        </h1>

        {/* Exam Stats */}
        <div style={{
          display: 'flex',
          backgroundColor: '#22414D',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            flex: 1,
            color: '#ffffff',
            padding: '1.25rem',
            textAlign: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.75rem', marginBottom: '0.375rem', opacity: 0.9 }}>
              Total MCQ's:
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>
              {examData.questions_count}
            </div>
          </div>
          <div style={{
            flex: 1,
            color: '#ffffff',
            padding: '1.25rem',
            textAlign: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.75rem', marginBottom: '0.375rem', opacity: 0.9 }}>
              Total marks:
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>
              {examData.total_marks}
            </div>
          </div>
          <div style={{
            flex: 1,
            color: '#ffffff',
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', marginBottom: '0.375rem', opacity: 0.9 }}>
              Total time:
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>
              {examData.total_time}:00
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '0.9375rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '0.75rem'
          }}>
            Instructions:
          </h2>
          <ol style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            color: '#4b5563',
            fontSize: '0.8125rem',
            lineHeight: '1.6'
          }}>
            {instructions.length > 0 ? (
              instructions.map((instruction, index) => (
                <li key={index} style={{ marginBottom: '0.375rem' }}>
                  {index + 1}. {instruction}
                </li>
              ))
            ) : (
              <>
                <li style={{ marginBottom: '0.375rem' }}>1. You have {examData.total_time} minutes to complete the test.</li>
                <li style={{ marginBottom: '0.375rem' }}>2. Test consists of {examData.questions_count} multiple-choice q's.</li>
                <li style={{ marginBottom: '0.375rem' }}>3. You are allowed 2 retest attempts if you do not pass on the first try.</li>
                <li style={{ marginBottom: '0.375rem' }}>4. Each incorrect answer will incur a negative mark of -1/4.</li>
                <li style={{ marginBottom: '0.375rem' }}>5. Ensure you are in a quiet environment and have a stable internet connection.</li>
                <li style={{ marginBottom: '0.375rem' }}>6. Keep an eye on the timer, and try to answer all questions within the given time.</li>
                <li style={{ marginBottom: '0.375rem' }}>7. Do not use any external resources such as dictionaries, websites, or assistance.</li>
                <li style={{ marginBottom: '0.375rem' }}>8. Complete the test honestly to accurately assess your proficiency level.</li>
                <li style={{ marginBottom: '0.375rem' }}>9. Check answers before submitting.</li>
                <li style={{ marginBottom: '0.375rem' }}>10. Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test.</li>
              </>
            )}
          </ol>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartExam}
          style={{
            width: '100%',
            maxWidth: '350px',
            display: 'block',
            margin: '0 auto',
            padding: '0.875rem',
            backgroundColor: '#22414D',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9375rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1a3340'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#22414D'}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
