'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentQuestion,
  setAnswer,
  toggleMarkForReview,
  decrementTime,
  submitExam,
  setResults,
} from '@/store/slices/examSlice';
import { examService } from '@/services/examService';
import { Timer, QuestionCard, QuestionNavigator, SubmitModal, ParagraphModal } from '@/components/exam';
import styles from './page.module.css';

export default function ExamTestPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestionIndex,
    answers,
    markedForReview,
    visitedQuestions,
    timeRemaining,
    examStarted,
  } = useSelector((state) => state.exam);

  useEffect(() => {
    document.title = "Exam Test | NexLearn";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Take your online examination test on NexLearn platform');
    }
  }, []);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showParagraphModal, setShowParagraphModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!examStarted || !questions.length) {
      router.push('/exam');
      return;
    }

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, questions, router, dispatch]);

  useEffect(() => {
    if (timeRemaining === 0 && examStarted && !submitting) {
      handleSubmitExam();
    }
  }, [timeRemaining, examStarted, submitting]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId) => {
    const questionId = currentQuestion.question_id || currentQuestion.id;
    dispatch(setAnswer({ questionId, optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestion(currentQuestionIndex + 1));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      dispatch(setCurrentQuestion(currentQuestionIndex - 1));
    }
  };

  const handleMarkForReview = () => {
    const questionId = currentQuestion.question_id || currentQuestion.id;
    dispatch(toggleMarkForReview(questionId));
  };

  const handleQuestionNavigation = (index) => {
    dispatch(setCurrentQuestion(index));
  };


  const handleSubmitExam = async () => {
    if (submitting) return; // Prevent double submission
    
    setSubmitting(true);
    setShowSubmitModal(false);
    
    try {
      const formattedAnswers = questions.map((question) => {
        const questionId = question.question_id || question.id;
        const selectedOptionId = answers[questionId];
        
        return {
          question_id: parseInt(questionId),
          selected_option_id: selectedOptionId ? parseInt(selectedOptionId) : null,
        };
      });

      const response = await examService.submitAnswers(formattedAnswers);
      
      if (response.success) {
        dispatch(setResults(response));
        dispatch(submitExam());
        router.push('/exam/results');
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (error) {
      if (timeRemaining === 0) {
        alert('Time is up! Your answers have been recorded.');
        router.push('/exam/results');
      } else {
        const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to submit exam. Please try again.';
        alert(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const markedCount = markedForReview.length;

  if (!currentQuestion) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Left Side - Question */}
        <div className={styles.questionSection}>
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', margin: 0 }}>
                Ancient Indian History MCQ
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {String(currentQuestionIndex + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}
              </div>
            </div>

            {/* Comprehensive Paragraph Button */}
            {currentQuestion?.comprehensive_paragraph && (
              <button
                onClick={() => setShowParagraphModal(true)}
                style={{
                  marginBottom: '1.5rem',
                  padding: '0.625rem 1rem',
                  backgroundColor: '#22414D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Read Comprehensive Paragraph
              </button>
            )}

            {/* Question Card Component */}
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={answers[currentQuestion.question_id || currentQuestion.id]}
              onAnswerSelect={handleOptionSelect}
            />

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={handleMarkForReview}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#9333ea',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {markedForReview.includes(currentQuestion?.question_id || currentQuestion?.id) ? 'Unmark' : 'Mark for review'}
              </button>
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: currentQuestionIndex === 0 ? '#e5e7eb' : '#d1d5db',
                  color: currentQuestionIndex === 0 ? '#9ca3af' : '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: currentQuestionIndex === questions.length - 1 ? '#475569' : '#1e293b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: currentQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentQuestionIndex === questions.length - 1 ? 0.5 : 1
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Question Navigator */}
        <div className={styles.navigatorSection}>
          <div className={styles.navigatorInner}>
            {/* Timer and Question Sheet Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Question No. Sheet:</span>
                <Timer timeRemaining={timeRemaining} />
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Remaining Time:
              </div>
            </div>

            {/* Question Navigator Component */}
            <QuestionNavigator
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={handleQuestionNavigation}
              answers={answers}
              markedForReview={markedForReview}
              visitedQuestions={visitedQuestions}
            />

            {/* Legend */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.75rem' }}>
                <div key="legend-answered" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '0.875rem', height: '0.875rem', backgroundColor: '#22c55e', borderRadius: '2px' }}></div>
                  <span style={{ color: '#6b7280' }}>Answered</span>
                </div>
                <div key="legend-not-attended" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '0.875rem', height: '0.875rem', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                  <span style={{ color: '#6b7280' }}>Not Attended</span>
                </div>
                <div key="legend-marked" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '0.875rem', height: '0.875rem', backgroundColor: '#9333ea', borderRadius: '2px' }}></div>
                  <span style={{ color: '#6b7280' }}>Marked For Review</span>
                </div>
                <div key="legend-marked-answered" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '0.875rem', height: '0.875rem', backgroundColor: '#1f2937', borderRadius: '2px' }}></div>
                  <span style={{ color: '#6b7280' }}>Answered and Marked For Review</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#22414D',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <SubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmitExam}
        submitting={submitting}
        timeRemaining={timeRemaining}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        markedCount={markedCount}
      />

      {/* Comprehensive Paragraph Modal */}
      <ParagraphModal
        isOpen={showParagraphModal}
        onClose={() => setShowParagraphModal(false)}
        paragraph={currentQuestion?.comprehensive_paragraph}
      />
    </div>
  );
}
