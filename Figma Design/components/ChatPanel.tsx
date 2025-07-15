import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { X, Send } from "lucide-react";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`w-80 bg-white border-l border-gray-200 flex flex-col transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-16 h-[calc(100vh-4rem)]`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 h-16">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8 bg-blue-100">
            <AvatarFallback className="bg-blue-100 text-blue-600">G</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900">Gemini</h3>
            <p className="text-sm text-gray-500">Assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Gemini's greeting */}
        <div className="flex space-x-3">
          <Avatar className="w-6 h-6 bg-blue-100 flex-shrink-0">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">G</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-3 mb-2">
              <p className="text-sm text-gray-800">
                Hello! I'm Gemini, your assistant. How can I help you today?
              </p>
            </div>
            <span className="text-xs text-gray-500">9:30 AM</span>
          </div>
        </div>

        {/* Payment button */}
        <div className="flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
            Show me pending payments
          </Button>
        </div>

        {/* Payment response */}
        <div className="flex space-x-3">
          <Avatar className="w-6 h-6 bg-blue-100 flex-shrink-0">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">G</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-3 mb-2">
              <p className="text-sm text-gray-800 mb-3">
                Here are the top pending payments:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-700">Job #1246 - Oakridge Mall</span>
                  <span className="font-medium text-gray-900">$8,750</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-700">Job #1243 - Westview Homes</span>
                  <span className="font-medium text-gray-900">$6,200</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-700">Job #1239 - City Center</span>
                  <span className="font-medium text-gray-900">$5,400</span>
                </div>
              </div>
              <p className="text-sm text-gray-800 mt-3">
                Would you like to see more details or send payment reminders?
              </p>
            </div>
            <span className="text-xs text-gray-500">9:31 AM</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-2 pt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              Create new job
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Assign roofer
            </Button>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Weekly summary
          </Button>
        </div>

        <span className="text-xs text-gray-500 block pt-2">9:32 AM</span>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Gemini..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}