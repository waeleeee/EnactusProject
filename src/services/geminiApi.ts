const GEMINI_API_KEY = "AIzaSyCeacAE3pmfVkOzuC3sYwI0uP6cdhM6QMM";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface StudentProfile {
  name: string;
  age: number;
  interests: string[];
  skills: string[];
  subjects: string[];
  goals: string[];
  personality: string[];
  budget: string;
  location: string;
  workStyle: string;
  learningStyle: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

export interface AIChatRequest {
  message: string;
  language: 'fr' | 'ar';
  studentProfile?: StudentProfile;
  conversationHistory?: Message[];
}

export interface AIChatResponse {
  success: boolean;
  response: string;
  timestamp: string;
}

// Direct Gemini API call
async function askGemini(prompt: string): Promise<string> {
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Failed to get response from Gemini API");
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
}

// Create context-aware prompt for university orientation
function createOrientationPrompt(request: AIChatRequest): string {
  const { message, language, studentProfile, conversationHistory } = request;
  
  let prompt = `You are an intelligent university orientation assistant for Tunisian students. `;
  
  if (language === 'ar') {
    prompt += `Respond in Arabic. `;
  } else {
    prompt += `Respond in French. `;
  }
  
  prompt += `\n\nContext: You help students choose the best university path based on their interests, skills, and goals.`;
  
  if (studentProfile) {
    prompt += `\n\nStudent Profile:
- Interests: ${studentProfile.interests.join(', ')}
- Skills: ${studentProfile.skills.join(', ')}
- Subjects: ${studentProfile.subjects.join(', ')}
- Goals: ${studentProfile.goals.join(', ')}
- Personality: ${studentProfile.personality.join(', ')}
- Location: ${studentProfile.location}`;
  }
  
  if (conversationHistory && conversationHistory.length > 0) {
    prompt += `\n\nRecent conversation:
${conversationHistory.slice(-5).map(msg => `${msg.type === 'user' ? 'Student' : 'Assistant'}: ${msg.content}`).join('\n')}`;
  }
  
  prompt += `\n\nCurrent message: ${message}`;
  
  prompt += `\n\nInstructions:
1. Be helpful, friendly, and encouraging
2. Provide specific advice about Tunisian universities and programs
3. Use emojis to make responses engaging
4. If asked about specific fields, provide detailed information
5. Always maintain a supportive tone
6. Keep responses concise but informative`;

  return prompt;
}

// AI API that uses Gemini directly
export const geminiApi = {
  // Send a message to the AI chatbot
  chat: async (data: AIChatRequest): Promise<AIChatResponse> => {
    try {
      const prompt = createOrientationPrompt(data);
      const response = await askGemini(prompt);
      
      return {
        success: true,
        response: response,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Gemini API call failed:', error);
      return {
        success: false,
        response: data.language === 'ar' 
          ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
          : 'Désolé, une erreur de connexion s\'est produite. Veuillez réessayer.',
        timestamp: new Date().toISOString()
      };
    }
  }
};

export default geminiApi; 