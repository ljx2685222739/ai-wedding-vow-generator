"use client";

import { useState, useEffect, KeyboardEvent } from 'react'
import Image from 'next/image'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Message {
  content: string
  isUser: boolean
}

interface APIResponse {
  answer: string;
  id: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const callZhipuAPI = async (userMessage: string, isInitialCall: boolean = false) => {
    setIsLoading(true)
    try {
      console.log('Sending request to local API...');
      
      const response = await fetch('/api/zhipu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage,
          isInitialCall
        }),
      });

      const data: APIResponse = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(`API request failed with status ${response.status}`);
      }

      console.log('API Response:', data);

      return data.answer;
    } catch (error) {
      console.error('Error calling local API:', error);
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return "An unexpected error occurred. Please try again later.";
    } finally {
      setIsLoading(false)
    }
  }

  const formatAIResponse = (response: string) => {
    // Remove asterisks
    const cleanResponse = response.replace(/\*/g, '');
    
    // Split the response into sentences
    const sentences = cleanResponse.match(/[^.!?]+[.!?]+/g) || [];
    
    // Group sentences into paragraphs (e.g., 3 sentences per paragraph)
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
      paragraphs.push(sentences.slice(i, i + 3).join(' '));
    }
    
    // Join paragraphs with double line breaks
    return paragraphs.join('\n\n');
  }

  const handleSendMessage = async (message: string) => {
    if (message.trim() && !isLoading) {
      setMessages(prev => [...prev, { content: message, isUser: true }])
      
      const aiResponse = await callZhipuAPI(message)
      const formattedResponse = formatAIResponse(aiResponse)
      setMessages(prev => [...prev, { content: formattedResponse, isUser: false }])
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputMessage)
      setInputMessage('')
    }
  }

  useEffect(() => {
    const initializeChat = async () => {
      if (!isInitialized) {
        const initialResponse = await callZhipuAPI('', true);
        const formattedResponse = formatAIResponse(initialResponse);
        setMessages([{ content: formattedResponse, isUser: false }]);
        setIsInitialized(true);
      }
    };

    initializeChat();
  }, [isInitialized]);

  return (
    <div id="chat-interface" className="bg-muted p-6 flex-1 flex flex-col min-h-[600px]"> {/* 增加了最小高度 */}
      <div className="flex-1 overflow-auto mb-4"> {/* 增加了下边距 */}
        <div className="grid gap-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.isUser ? 'justify-end' : ''}`}>
              {!message.isUser && (
                <Avatar>
                  <Image src="/placeholder-user.jpg" alt="AI Avatar" width={32} height={32} className="rounded-full" />
                </Avatar>
              )}
              <div className={`rounded-lg p-4 max-w-[80%] ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                {message.content.split('\n').map((paragraph, i) => (
                  <p key={i} className={i > 0 ? 'mt-4' : ''}>{paragraph}</p>
                ))}
              </div>
              {message.isUser && (
                <Avatar>
                  <Image src="/placeholder-user.jpg" alt="User Avatar" width={32} height={32} className="rounded-full" />
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[48px] rounded-2xl resize-none pr-20" // 增加右内边距
            rows={1}
            disabled={isLoading}
          />
          <Button
            className="absolute h-8 w-16 top-2 right-2 bg-pink-500 text-black hover:bg-pink-600 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#FFC0CB' }} // 添加内联样式确保背景色应用
            onClick={() => {
              handleSendMessage(inputMessage)
              setInputMessage('')
            }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <span className="font-bold text-black text-sm">Go</span> // 确保文字颜色为黑色
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}