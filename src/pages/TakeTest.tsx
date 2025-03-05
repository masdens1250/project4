import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, AlertCircle, Users, User } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: string;
  options: string[];
}

interface Test {
  id: number;
  name: string;
  description: string;
  duration: number;
  questions: Question[];
}

// Mock test data with 25 questions
const mockTest: Test = {
  id: 1,
  name: 'اختبار الذكاء العاطفي',
  description: 'يقيس هذا الاختبار قدرة الطالب على فهم وإدارة العواطف',
  duration: 30,
  questions: [
    {
      id: 1,
      text: 'عندما أواجه موقفًا صعبًا، أستطيع التحكم في مشاعري.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 2,
      text: 'أستطيع فهم مشاعر الآخرين من خلال تعبيرات وجوههم.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 3,
      text: 'أتحكم في غضبي بشكل جيد.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 4,
      text: 'أستطيع التعبير عن مشاعري بوضوح.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 5,
      text: 'أفهم تأثير سلوكي على الآخرين.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 6,
      text: 'أستطيع تحفيز نفسي للقيام بالمهام الصعبة.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 7,
      text: 'أتعامل مع الضغوط بشكل إيجابي.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 8,
      text: 'أستطيع قراءة المواقف الاجتماعية بشكل جيد.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 9,
      text: 'أتكيف بسهولة مع التغييرات.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 10,
      text: 'أستمع جيداً للآخرين.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 11,
      text: 'أشعر بالتعاطف مع مشاكل الآخرين.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 12,
      text: 'أستطيع تحديد نقاط قوتي وضعفي.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 13,
      text: 'أتقبل النقد البناء بإيجابية.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 14,
      text: 'أستطيع العمل بفعالية ضمن فريق.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 15,
      text: 'أحافظ على هدوئي في المواقف الصعبة.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 16,
      text: 'أستطيع حل الخلافات بطريقة بناءة.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 17,
      text: 'أظهر الاهتمام بمشاعر الآخرين.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 18,
      text: 'أتخذ قراراتي بناءً على التفكير المنطقي والعاطفي.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 19,
      text: 'أستطيع التعبير عن رأيي بثقة.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 20,
      text: 'أتعلم من أخطائي وتجاربي.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 21,
      text: 'أستطيع تحديد أهدافي بوضوح.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 22,
      text: 'أتحمل مسؤولية أفعالي وقراراتي.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 23,
      text: 'أستطيع التكيف مع المواقف الجديدة.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 24,
      text: 'أحترم وجهات نظر الآخرين المختلفة.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    },
    {
      id: 25,
      text: 'أستطيع إدارة وقتي بفعالية.',
      type: 'scale',
      options: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا']
    }
  ]
};

const TakeTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const mode = searchParams.get('mode') || 'individual';
  const studentId = searchParams.get('student');
  const grade = searchParams.get('grade');
  const group = searchParams.get('group');

  const [test] = useState<Test>(mockTest);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60); // Convert minutes to seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Here you would typically send the answers to your backend
    console.log('Submitting answers:', {
      testId: id,
      mode,
      studentId,
      grade,
      group,
      answers
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to results page with appropriate parameters
    const params = mode === 'individual'
      ? `?student=${studentId}&mode=${mode}`
      : `?grade=${grade}&group=${group}&mode=${mode}`;
    
    navigate(`/tests/${id}/results${params}`);
  };

  const progress = (Object.keys(answers).length / test.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={() => navigate('/tests')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{test.name}</h1>
              <p className="text-gray-600 mt-1">{test.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-orange-600">
              <Clock size={20} />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Test Mode Info */}
        <div className="mt-4 flex items-center gap-2 text-gray-600">
          {mode === 'individual' ? (
            <User size={18} />
          ) : (
            <Users size={18} />
          )}
          <span>
            {mode === 'individual' ? 'اختبار فردي' : 'اختبار جماعي'}
            {mode === 'group' && ` - ${grade} - الفوج ${group}`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>التقدم</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <span className="text-sm text-gray-500">السؤال {currentQuestion + 1} من {test.questions.length}</span>
          <h2 className="text-xl font-medium text-gray-900 mt-2">{test.questions[currentQuestion].text}</h2>
        </div>

        <div className="space-y-3">
          {test.questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleAnswer(test.questions[currentQuestion].id, option)}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name={`question-${test.questions[currentQuestion].id}`}
                  checked={answers[test.questions[currentQuestion].id] === option}
                  onChange={() => handleAnswer(test.questions[currentQuestion].id, option)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
              </div>
              <label className="text-gray-700 cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          السابق
        </button>

        {currentQuestion < test.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(test.questions.length - 1, prev + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            التالي
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(answers).length !== test.questions.length}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                <span>جاري الإرسال...</span>
              </>
            ) : (
              'إنهاء الاختبار'
            )}
          </button>
        )}
      </div>

      {/* Warning for unanswered questions */}
      {currentQuestion === test.questions.length - 1 && Object.keys(answers).length !== test.questions.length && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">لم يتم الإجابة على جميع الأسئلة</h3>
            <p className="text-sm text-yellow-700 mt-1">
              يرجى الإجابة على جميع الأسئلة قبل إنهاء الاختبار.
              الأسئلة المتبقية: {test.questions.length - Object.keys(answers).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeTest;