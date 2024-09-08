import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  question: string;
  isInitialCall: boolean;
}

interface ZhipuResponse {
  id: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const SYSTEM_MESSAGE = "You are an AI assistant specialized in helping couples write their wedding vows. Provide romantic and personalized suggestions based on the couple's input.";

function isValidRequestBody(body: any): body is RequestBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    typeof body.question === 'string' &&
    typeof body.isInitialCall === 'boolean'
  );
}

export async function POST(req: NextRequest) {
  try {
    console.log('Received request');
    const body = await req.json();
    console.log('Request body:', body);
    
    if (!isValidRequestBody(body)) {
      console.log('Invalid input');
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { question, isInitialCall } = body;

    console.log('Calling Zhipu AI API');
    
    if (!process.env.ZHIPU_API_KEY) {
      throw new Error('ZHIPU_API_KEY is not set');
    }

    const messages = isInitialCall
      ? [
          {"role": "system", "content": SYSTEM_MESSAGE},
          {"role": "user", "content": "Please introduce yourself and how you can help with writing wedding vows."}
        ]
      : [{"role": "user", "content": question}];

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: messages,
        temperature: 0.7,
        top_p: 0.7
      })
    });

    console.log('Zhipu AI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Zhipu AI API request failed:', errorText);
      throw new Error(`Zhipu AI API request failed with status ${response.status}: ${errorText}`);
    }

    const data: ZhipuResponse = await response.json();
    console.log('Zhipu AI API response data:', data);

    return NextResponse.json({ 
      answer: data.choices[0].message.content,
      id: data.id,
      model: data.model,
      usage: data.usage
    });
  } catch (error: unknown) {
    console.error('Error in API route:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'An unexpected error occurred', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred', details: 'Unknown error' }, { status: 500 });
    }
  }
}