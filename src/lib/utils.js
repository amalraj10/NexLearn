/**
 * Format time in seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Mask mobile number for display
 * @param {string} mobile - Full mobile number with country code
 * @returns {string} Masked mobile number
 */
export const maskMobile = (mobile) => {
  if (!mobile) return mobile;
  const countryCode = mobile.match(/^\+\d+/)?.[0] || '';
  const numberPart = mobile.replace(countryCode, '');
  if (numberPart.length < 4) return mobile;
  return `${countryCode} ${'*'.repeat(numberPart.length - 2)}${numberPart.slice(-2)}`;
};

/**
 * Format mobile number with spaces
 * @param {string} mobile - Mobile number
 * @returns {string} Formatted mobile number
 */
export const formatMobile = (mobile) => {
  const numbers = mobile.replace(/\D/g, '');
  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
  return `${numbers.slice(0, 4)} ${numbers.slice(4, 10)}`;
};

/**
 * Get question status based on answers and marks
 * @param {object} question - Question object
 * @param {object} answers - Answers object
 * @param {array} markedForReview - Array of marked question IDs
 * @returns {string} Question status
 */
export const getQuestionStatus = (question, answers, markedForReview) => {
  const isAnswered = answers[question.id] !== undefined;
  const isMarked = markedForReview.includes(question.id);
  
  if (isAnswered && isMarked) return 'marked-answered';
  if (isAnswered) return 'answered';
  if (isMarked) return 'marked';
  return 'not-attended';
};

/**
 * Get color class for question status
 * @param {string} status - Question status
 * @returns {string} CSS color class
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'answered':
      return 'bg-green-500 text-white';
    case 'not-attended':
      return 'bg-red-500 text-white';
    case 'marked':
      return 'bg-purple-500 text-white';
    case 'marked-answered':
      return 'bg-slate-800 text-white';
    default:
      return 'bg-gray-200';
  }
};
