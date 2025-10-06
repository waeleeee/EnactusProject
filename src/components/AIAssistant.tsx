import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperAirplaneIcon, 
  UserIcon, 
  SparklesIcon,
  AcademicCapIcon,
  HeartIcon,
  LightBulbIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BookOpenIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { getUniversityProgramsByField } from '../utils/recommendations';
import { geminiApi, StudentProfile, Message } from '../services/geminiApi';

const AIAssistant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [conversationStage, setConversationStage] = useState<'greeting' | 'assessment' | 'recommendations' | 'details'>('greeting');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start conversation
    if (messages.length === 0) {
      addAssistantMessage(getGreetingMessage());
    }
  }, []);

  const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const addMessage = (type: 'user' | 'assistant', content: string, data?: any) => {
    const newMessage: Message = {
      id: generateUniqueId(),
      type,
      content,
      timestamp: new Date(),
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addAssistantMessage = (content: string, data?: any) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage('assistant', content, data);
      setIsTyping(false);
    }, 1000);
  };

  const getGreetingMessage = () => {
    return language === 'ar' 
      ? `مرحباً! أنا مساعدك الذكي للتوجيه الجامعي 🎓

أنا هنا لمساعدتك في اختيار أفضل مسار جامعي بناءً على:
• مهاراتك واهتماماتك
• المواد التي تفضلها
• أهدافك المستقبلية
• شخصيتك وأسلوب تعلمك

هل تريد أن نبدأ بتقييم سريع لشخصيتك واهتماماتك؟`
      : `Bonjour! Je suis votre assistant IA pour l'orientation universitaire 🎓

Je suis ici pour vous aider à choisir le meilleur parcours universitaire basé sur:
• Vos compétences et intérêts
• Les matières que vous préférez
• Vos objectifs futurs
• Votre personnalité et style d'apprentissage

Voulez-vous commencer par une évaluation rapide de votre personnalité et de vos intérêts?`;
  };

  const getAssessmentQuestions = () => {
    const questions = [
      {
        id: 'interests',
        question: language === 'ar' 
          ? 'ما هي اهتماماتك الرئيسية؟ (اختر 3-5)'
          : 'Quels sont vos intérêts principaux? (choisissez 3-5)',
        options: [
          { value: 'technology', label: language === 'ar' ? 'التكنولوجيا والحاسوب' : 'Technologie et informatique' },
          { value: 'science', label: language === 'ar' ? 'العلوم والبحث' : 'Sciences et recherche' },
          { value: 'business', label: language === 'ar' ? 'الأعمال والإدارة' : 'Commerce et gestion' },
          { value: 'arts', label: language === 'ar' ? 'الفنون والإبداع' : 'Arts et créativité' },
          { value: 'health', label: language === 'ar' ? 'الصحة والطب' : 'Santé et médecine' },
          { value: 'education', label: language === 'ar' ? 'التعليم والتدريس' : 'Éducation et enseignement' },
          { value: 'engineering', label: language === 'ar' ? 'الهندسة والتصميم' : 'Ingénierie et design' },
          { value: 'languages', label: language === 'ar' ? 'اللغات والترجمة' : 'Langues et traduction' },
          { value: 'social', label: language === 'ar' ? 'العلوم الاجتماعية' : 'Sciences sociales' },
          { value: 'environment', label: language === 'ar' ? 'البيئة والطبيعة' : 'Environnement et nature' }
        ]
      },
      {
        id: 'subjects',
        question: language === 'ar' 
          ? 'ما هي المواد الدراسية التي تفضلها؟ (اختر 3-5)'
          : 'Quelles matières préférez-vous? (choisissez 3-5)',
        options: [
          { value: 'math', label: language === 'ar' ? 'الرياضيات' : 'Mathématiques' },
          { value: 'physics', label: language === 'ar' ? 'الفيزياء' : 'Physique' },
          { value: 'chemistry', label: language === 'ar' ? 'الكيمياء' : 'Chimie' },
          { value: 'biology', label: language === 'ar' ? 'البيولوجيا' : 'Biologie' },
          { value: 'history', label: language === 'ar' ? 'التاريخ' : 'Histoire' },
          { value: 'geography', label: language === 'ar' ? 'الجغرافيا' : 'Géographie' },
          { value: 'literature', label: language === 'ar' ? 'الأدب' : 'Littérature' },
          { value: 'philosophy', label: language === 'ar' ? 'الفلسفة' : 'Philosophie' },
          { value: 'economics', label: language === 'ar' ? 'الاقتصاد' : 'Économie' },
          { value: 'languages', label: language === 'ar' ? 'اللغات' : 'Langues' }
        ]
      },
      {
        id: 'personality',
        question: language === 'ar' 
          ? 'كيف تصف شخصيتك؟ (اختر 3-4)'
          : 'Comment décririez-vous votre personnalité? (choisissez 3-4)',
        options: [
          { value: 'analytical', label: language === 'ar' ? 'تحليلي ومنطقي' : 'Analytique et logique' },
          { value: 'creative', label: language === 'ar' ? 'مبدع وفني' : 'Créatif et artistique' },
          { value: 'social', label: language === 'ar' ? 'اجتماعي ومتعاون' : 'Social et coopératif' },
          { value: 'leadership', label: language === 'ar' ? 'قائد ومبادر' : 'Leader et entreprenant' },
          { value: 'detail', label: language === 'ar' ? 'دقيق ومنظم' : 'Méticuleux et organisé' },
          { value: 'adventurous', label: language === 'ar' ? 'مغامر ومستكشف' : 'Aventurier et explorateur' },
          { value: 'helpful', label: language === 'ar' ? 'مساعد ومتعاطف' : 'Serviable et empathique' },
          { value: 'independent', label: language === 'ar' ? 'مستقل وذاتي' : 'Indépendant et autonome' }
        ]
      },
      {
        id: 'goals',
        question: language === 'ar' 
          ? 'ما هي أهدافك المستقبلية؟ (اختر 2-3)'
          : 'Quels sont vos objectifs futurs? (choisissez 2-3)',
        options: [
          { value: 'research', label: language === 'ar' ? 'البحث العلمي' : 'Recherche scientifique' },
          { value: 'entrepreneur', label: language === 'ar' ? 'ريادة الأعمال' : 'Entrepreneuriat' },
          { value: 'career', label: language === 'ar' ? 'مهنة مستقرة' : 'Carrière stable' },
          { value: 'teaching', label: language === 'ar' ? 'التدريس والتعليم' : 'Enseignement' },
          { value: 'innovation', label: language === 'ar' ? 'الابتكار والتطوير' : 'Innovation et développement' },
          { value: 'service', label: language === 'ar' ? 'خدمة المجتمع' : 'Service à la société' },
          { value: 'international', label: language === 'ar' ? 'العمل الدولي' : 'Travail international' },
          { value: 'specialization', label: language === 'ar' ? 'التخصص المتقدم' : 'Spécialisation avancée' }
        ]
      }
    ];
    return questions;
  };

  const FIELD_KEYWORDS = [
    { ar: 'طب', fr: 'médecine', field: 'علوم تجريبية' },
    { ar: 'هندسة', fr: 'ingénierie', field: 'علوم تقنية' },
    { ar: 'إعلامية', fr: 'informatique', field: 'علوم الإعلامية' },
    { ar: 'اقتصاد', fr: 'économie', field: 'إقتصاد وتصرف' },
    { ar: 'فنون', fr: 'arts', field: 'آداب' },
    { ar: 'آداب', fr: 'lettres', field: 'آداب' },
    { ar: 'بيولوجيا', fr: 'biologie', field: 'علوم تجريبية' },
    // ... add more as needed
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage('user', userMessage);
    setInputValue('');

    // Use Gemini AI for intelligent responses
    try {
      setIsTyping(true);
      
      const response = await geminiApi.chat({
        message: userMessage,
        language: language as 'fr' | 'ar',
        studentProfile: studentProfile || undefined,
        conversationHistory: messages.slice(-10) // Send last 10 messages for context
      });

      if (response.success) {
        addMessage('assistant', response.response);
      } else {
        // Fallback to original logic if AI fails
        handleFallbackResponse(userMessage);
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      // Fallback to original logic
      handleFallbackResponse(userMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFallbackResponse = async (userMessage: string) => {
    // 1. Detect direct field/university questions
    const lowerMsg = userMessage.toLowerCase();
    let detectedField = null;
    for (const kw of FIELD_KEYWORDS) {
      if (lowerMsg.includes(kw.ar) || lowerMsg.includes(kw.fr)) {
        detectedField = kw.field;
        break;
      }
    }
    if (lowerMsg.includes('جامعة') || lowerMsg.includes('université') || lowerMsg.includes('university')) {
      // If a field is also detected, show programs for that field
      if (detectedField) {
        addAssistantMessage(language === 'ar' ? `إليك أفضل الجامعات التي تقدم برامج في مجال ${detectedField}:` : `Voici les meilleures universités qui proposent des programmes en ${detectedField}:`);
        const programs = await getUniversityProgramsByField(detectedField, 10);
        if (programs.length > 0) {
          addAssistantMessage(
            language === 'ar'
              ? programs.map(p => `• ${p.universityAr} - ${p.degree}${p.website ? ` [الموقع](${p.website})` : ''}`).join('\n')
              : programs.map(p => `• ${p.universityFr} - ${p.degree}${p.website ? ` [Site web](${p.website})` : ''}`).join('\n')
          );
        } else {
          addAssistantMessage(language === 'ar' ? 'لم أجد برامج مطابقة لهذا التخصص حالياً.' : 'Aucun programme correspondant trouvé pour ce domaine.');
        }
        return;
      }
      // If no field, show all universities
      addAssistantMessage(language === 'ar' ? 'يمكنك زيارة صفحة "الجامعات" أو "دليل الجامعات" في التطبيق لمعرفة جميع الجامعات التونسية مع معلومات الاتصال والمواقع الإلكترونية.' : 'Vous pouvez visiter la page "Universités" ou "Répertoire des Universités" dans l\'application pour connaître toutes les universités tunisiennes avec leurs informations de contact et sites web.');
      return;
    } else if (detectedField) {
      addAssistantMessage(language === 'ar' ? `إليك أفضل البرامج الجامعية في مجال ${detectedField}:` : `Voici les meilleurs programmes universitaires en ${detectedField}:`);
      const programs = await getUniversityProgramsByField(detectedField, 10);
      if (programs.length > 0) {
        addAssistantMessage(
          language === 'ar'
            ? programs.map(p => `• ${p.universityAr} - ${p.degree}${p.website ? ` [الموقع](${p.website})` : ''}`).join('\n')
            : programs.map(p => `• ${p.universityFr} - ${p.degree}${p.website ? ` [Site web](${p.website})` : ''}`).join('\n')
        );
      } else {
        addAssistantMessage(language === 'ar' ? 'لم أجد برامج مطابقة لهذا التخصص حالياً.' : 'Aucun programme correspondant trouvé pour ce domaine.');
      }
      return;
    }

    // Process user input based on conversation stage
    if (conversationStage === 'greeting') {
      if (userMessage.toLowerCase().includes('نعم') || userMessage.toLowerCase().includes('oui') || 
          userMessage.toLowerCase().includes('yes') || userMessage.toLowerCase().includes('start') ||
          userMessage.toLowerCase().includes('ابدأ') || userMessage.toLowerCase().includes('commencer')) {
        setConversationStage('assessment');
        addAssistantMessage(language === 'ar' 
          ? 'ممتاز! دعنا نبدأ بالتقييم. سأطرح عليك بعض الأسئلة لفهم شخصيتك واهتماماتك بشكل أفضل.'
          : 'Parfait! Commençons l\'évaluation. Je vais vous poser quelques questions pour mieux comprendre votre personnalité et vos intérêts.'
        );
        setTimeout(() => {
          askNextQuestion();
        }, 2000);
      } else {
        // Handle other responses in greeting stage
        addAssistantMessage(language === 'ar' 
          ? 'أفهم. يمكنك أيضاً أن تسألني مباشرة عن التخصصات أو الجامعات التي تهمك. ما الذي تريد معرفته؟'
          : 'Je comprends. Vous pouvez aussi me demander directement des informations sur les spécialisations ou universités qui vous intéressent. Que voulez-vous savoir?'
        );
      }
    } else if (conversationStage === 'assessment') {
      // Process assessment answers
      processAssessmentAnswer(userMessage);
    } else if (conversationStage === 'recommendations') {
      // Handle follow-up questions
      handleFollowUpQuestion(userMessage);
    }
  };

  const askNextQuestion = () => {
    const questions = getAssessmentQuestions();
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      
      addAssistantMessage(currentQuestion.question, {
        type: 'question',
        question: currentQuestion
      });
    } else {
      // All questions answered, generate recommendations
      generateFinalRecommendations();
    }
  };

  const processAssessmentAnswer = (answer: string) => {
    // Simple keyword-based processing
    const interests = [];
    const subjects = [];
    const personality = [];
    const goals = [];

    // Extract interests
    if (answer.includes('تكنولوجيا') || answer.includes('technology') || answer.includes('حاسوب') || answer.includes('informatique')) interests.push('technology');
    if (answer.includes('علوم') || answer.includes('science') || answer.includes('بحث') || answer.includes('recherche')) interests.push('science');
    if (answer.includes('أعمال') || answer.includes('business') || answer.includes('إدارة') || answer.includes('gestion')) interests.push('business');
    if (answer.includes('فنون') || answer.includes('arts') || answer.includes('إبداع') || answer.includes('créativité')) interests.push('arts');
    if (answer.includes('صحة') || answer.includes('health') || answer.includes('طب') || answer.includes('médecine')) interests.push('health');
    if (answer.includes('تعليم') || answer.includes('education') || answer.includes('تدريس') || answer.includes('enseignement')) interests.push('education');
    if (answer.includes('هندسة') || answer.includes('engineering') || answer.includes('تصميم') || answer.includes('design')) interests.push('engineering');
    if (answer.includes('لغات') || answer.includes('languages') || answer.includes('ترجمة') || answer.includes('traduction')) interests.push('languages');
    if (answer.includes('اجتماعي') || answer.includes('social')) interests.push('social');
    if (answer.includes('بيئة') || answer.includes('environment') || answer.includes('طبيعة') || answer.includes('nature')) interests.push('environment');

    // Extract subjects
    if (answer.includes('رياضيات') || answer.includes('math') || answer.includes('mathématiques')) subjects.push('math');
    if (answer.includes('فيزياء') || answer.includes('physics') || answer.includes('physique')) subjects.push('physics');
    if (answer.includes('كيمياء') || answer.includes('chemistry') || answer.includes('chimie')) subjects.push('chemistry');
    if (answer.includes('بيولوجيا') || answer.includes('biology') || answer.includes('biologie')) subjects.push('biology');
    if (answer.includes('تاريخ') || answer.includes('history') || answer.includes('histoire')) subjects.push('history');
    if (answer.includes('جغرافيا') || answer.includes('geography') || answer.includes('géographie')) subjects.push('geography');
    if (answer.includes('أدب') || answer.includes('literature') || answer.includes('littérature')) subjects.push('literature');
    if (answer.includes('فلسفة') || answer.includes('philosophy')) subjects.push('philosophy');
    if (answer.includes('اقتصاد') || answer.includes('economics') || answer.includes('économie')) subjects.push('economics');
    if (answer.includes('لغات') || answer.includes('languages')) subjects.push('languages');

    // Extract personality traits
    if (answer.includes('تحليلي') || answer.includes('analytical') || answer.includes('منطقي') || answer.includes('logique')) personality.push('analytical');
    if (answer.includes('مبدع') || answer.includes('creative') || answer.includes('فني') || answer.includes('artistique')) personality.push('creative');
    if (answer.includes('اجتماعي') || answer.includes('social') || answer.includes('متعاون') || answer.includes('coopératif')) personality.push('social');
    if (answer.includes('قائد') || answer.includes('leadership') || answer.includes('مبادر') || answer.includes('entreprenant')) personality.push('leadership');
    if (answer.includes('دقيق') || answer.includes('detail') || answer.includes('منظم') || answer.includes('organisé')) personality.push('detail');
    if (answer.includes('مغامر') || answer.includes('adventurous') || answer.includes('مستكشف') || answer.includes('explorateur')) personality.push('adventurous');
    if (answer.includes('مساعد') || answer.includes('helpful') || answer.includes('متعاطف') || answer.includes('empathique')) personality.push('helpful');
    if (answer.includes('مستقل') || answer.includes('independent') || answer.includes('ذاتي') || answer.includes('autonome')) personality.push('independent');

    // Extract goals
    if (answer.includes('بحث') || answer.includes('research') || answer.includes('علمي') || answer.includes('scientifique')) goals.push('research');
    if (answer.includes('ريادة') || answer.includes('entrepreneur') || answer.includes('أعمال') || answer.includes('affaires')) goals.push('entrepreneur');
    if (answer.includes('مهنة') || answer.includes('career') || answer.includes('مستقرة') || answer.includes('stable')) goals.push('career');
    if (answer.includes('تدريس') || answer.includes('teaching') || answer.includes('تعليم') || answer.includes('enseignement')) goals.push('teaching');
    if (answer.includes('ابتكار') || answer.includes('innovation') || answer.includes('تطوير') || answer.includes('développement')) goals.push('innovation');
    if (answer.includes('خدمة') || answer.includes('service') || answer.includes('مجتمع') || answer.includes('société')) goals.push('service');
    if (answer.includes('دولي') || answer.includes('international') || answer.includes('خارج') || answer.includes('étranger')) goals.push('international');
    if (answer.includes('تخصص') || answer.includes('specialization') || answer.includes('متقدم') || answer.includes('avancée')) goals.push('specialization');

    // Update student profile
    const profile: StudentProfile = {
      name: '',
      age: 18,
      interests: interests.length > 0 ? interests : ['general'],
      skills: [],
      subjects: subjects.length > 0 ? subjects : ['general'],
      goals: goals.length > 0 ? goals : ['career'],
      personality: personality.length > 0 ? personality : ['balanced'],
      budget: 'medium',
      location: 'Tunisia',
      workStyle: 'collaborative',
      learningStyle: 'visual'
    };

    setStudentProfile(profile);

    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    
    setTimeout(() => {
      askNextQuestion();
    }, 1500);
  };

  const generateFinalRecommendations = async () => {
    if (!studentProfile) return;

    addAssistantMessage(language === 'ar' 
      ? `بناءً على إجاباتك، إليك توصياتي لك:`
      : `Basé sur vos réponses, voici mes recommandations:`
    );

    setTimeout(async () => {
      try {
        // Use Gemini AI for personalized recommendations
        const aiResponse = await geminiApi.chat({
          message: `Generate personalized university recommendations for this student profile: ${JSON.stringify(studentProfile)}`,
          language: language as 'fr' | 'ar',
          studentProfile: studentProfile
        });

        if (aiResponse.success) {
          addAssistantMessage(aiResponse.response, {
            type: 'recommendations',
            profile: studentProfile
          });
                } else {
          // Fallback to original recommendations
          const recommendations = getRecommendations(studentProfile);
          addAssistantMessage(recommendations.join('\n\n'), {
            type: 'recommendations',
            profile: studentProfile
          });
        }
      } catch (error) {
        console.error('AI Recommendations Error:', error);
        // Fallback to original recommendations
        const recommendations = getRecommendations(studentProfile);
        addAssistantMessage(recommendations.join('\n\n'), {
          type: 'recommendations',
          profile: studentProfile
        });
      }
      
      // For each recommended field, fetch up to 10 university programs
      let fields: string[] = [];
      if (studentProfile.interests.includes('technology') || studentProfile.subjects.includes('math')) fields.push('علوم الإعلامية');
      if (studentProfile.interests.includes('engineering') || studentProfile.subjects.includes('physics')) fields.push('علوم تقنية');
      if (studentProfile.interests.includes('business') || studentProfile.personality.includes('leadership')) fields.push('إقتصاد وتصرف');
      if (studentProfile.interests.includes('health') || studentProfile.subjects.includes('biology')) fields.push('علوم تجريبية');
      if (studentProfile.interests.includes('arts') || studentProfile.personality.includes('creative')) fields.push('آداب');
      // Add more mappings as needed

      for (const field of fields) {
        const programs = await getUniversityProgramsByField(field, 10);
        if (programs.length > 0) {
          addAssistantMessage(
            language === 'ar'
              ? `🔎 أفضل 10 برامج جامعية في مجال ${field}:
` +
              programs.map(p => `• ${p.universityAr} - ${p.degree}${p.website ? ` [الموقع](${p.website})` : ''}`).join('\n')
            : `🔎 Top 10 programmes universitaires en ${field}:
` +
              programs.map(p => `• ${p.universityFr} - ${p.degree}${p.website ? ` [Site web](${p.website})` : ''}`).join('\n')
          );
        }
      }

      setConversationStage('recommendations');
      
      // Add follow-up message
      setTimeout(() => {
        addAssistantMessage(language === 'ar' 
          ? 'هل تريد معرفة المزيد عن أي من هذه التخصصات أو الجامعات؟ يمكنك أن تسألني عن تفاصيل أكثر.'
          : 'Voulez-vous en savoir plus sur l\'une de ces spécialisations ou universités? Vous pouvez me demander plus de détails.'
        );
      }, 2000);
    }, 1500);
  };

  const handleFollowUpQuestion = (question: string) => {
    // Handle various follow-up questions
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('جامعة') || lowerQuestion.includes('université') || lowerQuestion.includes('university')) {
      addAssistantMessage(language === 'ar' 
        ? 'يمكنك زيارة صفحة "الجامعات" أو "دليل الجامعات" في التطبيق لمعرفة جميع الجامعات التونسية مع معلومات الاتصال والمواقع الإلكترونية.'
        : 'Vous pouvez visiter la page "Universités" ou "Répertoire des Universités" dans l\'application pour connaître toutes les universités tunisiennes avec leurs informations de contact et sites web.'
      );
    } else if (lowerQuestion.includes('خريطة') || lowerQuestion.includes('carte') || lowerQuestion.includes('map')) {
      addAssistantMessage(language === 'ar' 
        ? 'يمكنك زيارة "خريطة الجامعات" لرؤية مواقع جميع الجامعات على الخريطة التفاعلية.'
        : 'Vous pouvez visiter "Carte des Universités" pour voir l\'emplacement de toutes les universités sur la carte interactive.'
      );
    } else if (lowerQuestion.includes('حساب') || lowerQuestion.includes('calcul') || lowerQuestion.includes('points')) {
      addAssistantMessage(language === 'ar' 
        ? 'يمكنك استخدام "حاسبة النقاط" لحساب نقاط FG و T بدقة باستخدام الصيغ الرسمية.'
        : 'Vous pouvez utiliser le "Calculateur de points" pour calculer les points FG et T avec précision en utilisant les formules officielles.'
      );
    } else {
      addAssistantMessage(language === 'ar' 
        ? 'شكراً لسؤالك! يمكنك استكشاف المزيد من المعلومات في التطبيق أو طرح أسئلة أخرى علي.'
        : 'Merci pour votre question! Vous pouvez explorer plus d\'informations dans l\'application ou me poser d\'autres questions.'
      );
    }
  };

  const getRecommendations = (profile: StudentProfile): string[] => {
    const recommendations = [];

    // Technology/Computer Science
    if (profile.interests.includes('technology') || profile.subjects.includes('math')) {
      recommendations.push(language === 'ar' 
        ? `🎯 **علوم الحاسوب**: مناسبة جداً لشخصيتك التحليلية واهتمامك بالتكنولوجيا. يمكنك العمل في مجال البرمجة، الذكاء الاصطناعي، أو تطوير البرمجيات.`
        : `🎯 **Informatique**: Très adaptée à votre personnalité analytique et votre intérêt pour la technologie. Vous pourriez travailler dans la programmation, l'IA, ou le développement logiciel.`
      );
    }

    // Engineering
    if (profile.interests.includes('engineering') || profile.subjects.includes('physics')) {
      recommendations.push(language === 'ar' 
        ? `🏗️ **الهندسة**: مناسبة لشخصيتك التحليلية والمنظمة. يمكنك التخصص في الهندسة المدنية، الكهربائية، أو الميكانيكية.`
        : `🏗️ **Ingénierie**: Adaptée à votre personnalité analytique et organisée. Vous pourriez vous spécialiser en génie civil, électrique, ou mécanique.`
      );
    }

    // Business/Management
    if (profile.interests.includes('business') || profile.personality.includes('leadership')) {
      recommendations.push(language === 'ar' 
        ? `💼 **إدارة الأعمال**: مناسبة لشخصيتك القيادية واهتمامك بالأعمال. يمكنك العمل في مجال الإدارة، التسويق، أو ريادة الأعمال.`
        : `💼 **Gestion d'entreprise**: Adaptée à votre personnalité de leader et votre intérêt pour les affaires. Vous pourriez travailler en management, marketing, ou entrepreneuriat.`
      );
    }

    // Health/Medicine
    if (profile.interests.includes('health') || profile.subjects.includes('biology')) {
      recommendations.push(language === 'ar' 
        ? `🏥 **العلوم الصحية**: مناسبة لشخصيتك المساعدة واهتمامك بالصحة. يمكنك التخصص في الطب، الصيدلة، أو التمريض.`
        : `🏥 **Sciences de la santé**: Adaptée à votre personnalité serviable et votre intérêt pour la santé. Vous pourriez vous spécialiser en médecine, pharmacie, ou soins infirmiers.`
      );
    }

    // Arts/Creative
    if (profile.interests.includes('arts') || profile.personality.includes('creative')) {
      recommendations.push(language === 'ar' 
        ? `🎨 **الفنون والتصميم**: مناسبة لشخصيتك المبدعة. يمكنك العمل في مجال التصميم الجرافيكي، العمارة، أو الفنون الجميلة.`
        : `🎨 **Arts et design**: Adaptée à votre personnalité créative. Vous pourriez travailler en design graphique, architecture, ou beaux-arts.`
      );
    }

    // If no specific recommendations, provide general ones
    if (recommendations.length === 0) {
      recommendations.push(language === 'ar' 
        ? `📚 **توصية عامة**: بناءً على شخصيتك المتوازنة، يمكنك استكشاف مختلف المجالات. أقترح عليك زيارة صفحة "استكشف الجامعات" لمعرفة المزيد عن البرامج المتاحة.`
        : `📚 **Recommandation générale**: Basé sur votre personnalité équilibrée, vous pouvez explorer différents domaines. Je vous suggère de visiter la page "Explorer les universités" pour en savoir plus sur les programmes disponibles.`
      );
    }

    return recommendations;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {language === 'ar' ? 'المساعد الذكي للتوجيه الجامعي' : 'Assistant IA pour l\'Orientation Universitaire'}
              </h1>
              <p className="text-blue-100 text-sm">
                {language === 'ar' ? 'اختر أفضل مسار جامعي بناءً على شخصيتك واهتماماتك' : 'Choisissez le meilleur parcours universitaire basé sur votre personnalité et vos intérêts'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 rtl:space-x-reverse max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {message.type === 'user' ? (
                      <UserIcon className="w-4 h-4" />
                    ) : (
                      <SparklesIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    
                    {/* Question options */}
                    {message.data?.type === 'question' && (
                      <div className="mt-3 space-y-2">
                        {message.data.question.options.map((option: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => {
                              addMessage('user', option.label);
                              processAssessmentAnswer(option.value);
                            }}
                            className="block w-full text-left p-2 text-xs bg-white dark:bg-gray-600 rounded border hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Tapez votre message ici...'}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 