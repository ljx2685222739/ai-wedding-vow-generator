import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AboutSection() {
  return (
    <div className="bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">About Our Wedding Vow AI Assistant</h2>
          <p className="text-muted-foreground">
            Our AI assistant is powered by advanced natural language processing and machine learning algorithms. 
            It&apos;s specially trained to help couples create personalized and heartfelt wedding vows, drawing from 
            a vast knowledge base of romantic literature and real-life love stories.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What can your Wedding Vow AI Assistant do?</AccordionTrigger>
              <AccordionContent>
                Our AI assistant can help you craft personalized wedding vows by providing suggestions, 
                romantic phrases, and structure ideas based on your input about your relationship and feelings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is the AI assistant secure and private?</AccordionTrigger>
              <AccordionContent>
                Yes, we take security and privacy very seriously. All conversations are encrypted, 
                and we do not store any personal information. Your love story remains yours alone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How much does it cost to use the Wedding Vow AI Assistant?</AccordionTrigger>
              <AccordionContent>
                We offer a free tier with limited usage for couples to try out our service. 
                For more extensive use and additional features, we have premium plans available. 
                Please check our pricing page for details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}