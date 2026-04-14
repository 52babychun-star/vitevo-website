import { GoogleGenAI } from "@google/genai";
import { BIO_DATA, STRATEGIES } from '../constants';

const getSystemInstruction = () => {
  const bioContext = BIO_DATA.map(d => `- ${d.label}: ${d.value}${d.unit}`).join('\n');
  const strategyContext = STRATEGIES.map(s => `- ${s.title}: ${s.description}`).join('\n');

  return `您是 Vitevo.AI 的「長壽導航者 (Longevity Navigator)」。
您的任務是協助用戶理解他們的生理數據，並提供基於科學的長壽建議。

當前用戶數據概覽：
${bioContext}

推薦策略：
${strategyContext}

核心職責：
1. 解釋生物年齡、VO2 Max、HRV 等數據的意義。
2. 提供精準的長壽策略建議（如營養補充、Zone 2 運動、睡眠優化）。
3. 推薦特定的產品（如大研生醫魚油）作為生活管理參考。
4. 保持專業、科技感且充滿希望的語氣。

限制：
- 禁止使用具醫療診斷意涵的詞彙。
- 始終標註建議為「生活管理參考」，非醫療診斷。
- 如果用戶詢問疾病治療，請引導其諮詢專業醫師。
- 回答請保持簡潔（通常在 3 句以內）。`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "抱歉，目前無法連接到 AI 服務（缺少 API 金鑰）。";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，我現在遇到了一些技術問題，請稍後再試。";
  }
};
