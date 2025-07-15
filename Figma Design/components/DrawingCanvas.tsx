// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { Pen, Type, Square, Circle, Minus, Eraser, Download, Upload, Trash2, Undo, Redo, X, Triangle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface DrawingCanvasProps {
  initialDrawing?: string;
  onSave: (drawing: string) => void;
}

type Tool = 'pen' | 'text' | 'rectangle' | 'circle' | 'line' | 'eraser' | 'xsymbol' | 'triangle';

interface TextElement {
  id: string;
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
}

interface ShapeElement {
  id: string;
  x: number;
  y: number;
  size: number;
  type: 'x' | 'triangle' | 'circle' | 'square';
}

export function DrawingCanvas({ initialDrawing, onSave }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [shapeElements, setShapeElements] = useState<ShapeElement[]>([]);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPos, setTextInputPos] = useState({ x: 0, y: 0 });
  const [textInputValue, setTextInputValue] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [shapeSize, setShapeSize] = useState(20);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Drawing state for shapes
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up responsive canvas size - make it larger to fill more space
    const containerWidth = container.offsetWidth - 2; // Account for border
    const canvasHeight = Math.max(500, window.innerHeight * 0.5); // Minimum 500px, max 50% of viewport height
    
    canvas.width = containerWidth;
    canvas.height = canvasHeight;
    
    // Set canvas display size to match actual size for crisp rendering
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    // Draw grid to fill entire canvas
    drawGrid(ctx);

    // Load initial drawing if provided
    if (initialDrawing) {
      const initialImg = new Image();
      initialImg.onload = () => {
        ctx.drawImage(initialImg, 0, 0);
      };
      initialImg.src = initialDrawing;
    }

    // Save initial state
    saveToHistory();
  }, []);

  // Handle window resize to make canvas responsive
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Save current drawing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Resize canvas
      const containerWidth = container.offsetWidth - 2;
      const canvasHeight = Math.max(500, window.innerHeight * 0.5);
      
      canvas.width = containerWidth;
      canvas.height = canvasHeight;
      
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      
      // Redraw grid
      drawGrid(ctx);
      
      // Restore drawing (note: this will stretch/compress the image to new dimensions)
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCanvas.width = imageData.width;
        tempCanvas.height = imageData.height;
        tempCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    // Clear any existing grid
    const originalComposite = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = 'destination-over';

    // Draw vertical lines across entire canvas width
    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }

    // Draw horizontal lines across entire canvas height
    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = originalComposite;
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(dataUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const prevIndex = historyIndex - 1;
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[prevIndex];
      setHistoryIndex(prevIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const nextIndex = historyIndex + 1;
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[nextIndex];
      setHistoryIndex(nextIndex);
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, type: 'x' | 'triangle' | 'circle' | 'square') => {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const halfSize = size / 2;
    
    switch (type) {
      case 'x':
        // Draw X symbol (two diagonal lines)
        ctx.beginPath();
        ctx.moveTo(x - halfSize, y - halfSize);
        ctx.lineTo(x + halfSize, y + halfSize);
        ctx.moveTo(x + halfSize, y - halfSize);
        ctx.lineTo(x - halfSize, y + halfSize);
        ctx.stroke();
        break;
        
      case 'triangle':
        // Draw triangle (equilateral)
        ctx.beginPath();
        ctx.moveTo(x, y - halfSize); // Top point
        ctx.lineTo(x - halfSize, y + halfSize); // Bottom left
        ctx.lineTo(x + halfSize, y + halfSize); // Bottom right
        ctx.closePath();
        ctx.stroke();
        break;
        
      case 'circle':
        // Draw circle
        ctx.beginPath();
        ctx.arc(x, y, halfSize, 0, 2 * Math.PI);
        ctx.stroke();
        break;
        
      case 'square':
        // Draw square
        ctx.strokeRect(x - halfSize, y - halfSize, size, size);
        break;
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (currentTool === 'text') {
      setTextInputPos(pos);
      setShowTextInput(true);
      return;
    }

    if (currentTool === 'xsymbol' || currentTool === 'triangle') {
      // Place shape immediately
      const shapeType = currentTool === 'xsymbol' ? 'x' : 'triangle';
      drawShape(ctx, pos.x, pos.y, shapeSize, shapeType);
      
      const newShape: ShapeElement = {
        id: Date.now().toString(),
        x: pos.x,
        y: pos.y,
        size: shapeSize,
        type: shapeType
      };
      
      setShapeElements(prev => [...prev, newShape]);
      saveToHistory();
      return;
    }

    setIsDrawing(true);
    setStartPos(pos);

    if (currentTool === 'pen' || currentTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : strokeColor;
    ctx.lineWidth = currentTool === 'eraser' ? strokeWidth * 3 : strokeWidth;
    ctx.lineCap = 'round';

    if (currentTool === 'pen' || currentTool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;

    if (currentTool === 'rectangle') {
      const width = pos.x - startPos.x;
      const height = pos.y - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    } else if (currentTool === 'circle') {
      const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (currentTool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    setIsDrawing(false);
    saveToHistory();
  };

  const addText = () => {
    if (!textInputValue.trim()) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = strokeColor;
    ctx.fillText(textInputValue, textInputPos.x, textInputPos.y);

    const newTextElement: TextElement = {
      id: Date.now().toString(),
      x: textInputPos.x,
      y: textInputPos.y,
      text: textInputValue,
      fontSize,
      color: strokeColor
    };

    setTextElements(prev => [...prev, newTextElement]);
    setTextInputValue('');
    setShowTextInput(false);
    saveToHistory();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    setTextElements([]);
    setShapeElements([]);
    saveToHistory();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    onSave(dataUrl);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'job-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Job Drawing & Notes</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadDrawing}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Drawing Tools */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Tool Selection */}
          <div className="flex space-x-1">
            <Button
              variant={currentTool === 'pen' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('pen')}
              title="Pen"
            >
              <Pen className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('text')}
              title="Text"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('line')}
              title="Line"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'rectangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('rectangle')}
              title="Rectangle"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'circle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('circle')}
              title="Circle"
            >
              <Circle className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'triangle' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('triangle')}
              title="Triangle"
            >
              <Triangle className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'xsymbol' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('xsymbol')}
              title="X Mark"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'eraser' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('eraser')}
              title="Eraser"
            >
              <Eraser className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Color Picker */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="color" className="text-sm">Color:</Label>
            <input
              id="color"
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
          </div>

          {/* Stroke Width */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="width" className="text-sm">Width:</Label>
            <Select value={strokeWidth.toString()} onValueChange={(value) => setStrokeWidth(Number(value))}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1px</SelectItem>
                <SelectItem value="2">2px</SelectItem>
                <SelectItem value="3">3px</SelectItem>
                <SelectItem value="5">5px</SelectItem>
                <SelectItem value="8">8px</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Size (for text tool) */}
          {currentTool === 'text' && (
            <>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center space-x-2">
                <Label htmlFor="fontSize" className="text-sm">Font Size:</Label>
                <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(Number(value))}>
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="24">24px</SelectItem>
                    <SelectItem value="32">32px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Shape Size */}
          {(currentTool === 'xsymbol' || currentTool === 'triangle') && (
            <>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center space-x-2">
                <Label htmlFor="shapeSize" className="text-sm">Size:</Label>
                <Select value={shapeSize.toString()} onValueChange={(value) => setShapeSize(Number(value))}>
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15px</SelectItem>
                    <SelectItem value="20">20px</SelectItem>
                    <SelectItem value="25">25px</SelectItem>
                    <SelectItem value="30">30px</SelectItem>
                    <SelectItem value="40">40px</SelectItem>
                    <SelectItem value="50">50px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="relative border border-gray-300 rounded-lg overflow-hidden w-full"
      >
        <canvas
          ref={canvasRef}
          className="block cursor-crosshair w-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={() => setIsDrawing(false)}
        />

        {/* Text Input Overlay */}
        {showTextInput && (
          <div
            className="absolute bg-white border border-gray-300 rounded p-2 shadow-lg z-10"
            style={{
              left: textInputPos.x,
              top: textInputPos.y - 40
            }}
          >
            <div className="flex space-x-2">
              <Input
                value={textInputValue}
                onChange={(e) => setTextInputValue(e.target.value)}
                placeholder="Enter text..."
                className="w-32"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addText();
                  } else if (e.key === 'Escape') {
                    setShowTextInput(false);
                    setTextInputValue('');
                  }
                }}
                autoFocus
              />
              <Button size="sm" onClick={addText}>Add</Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setShowTextInput(false);
                  setTextInputValue('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Instructions:</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Use the pen tool to draw freehand</li>
          <li>Click the text tool, then click on the canvas to add text</li>
          <li>Use shape tools (line, rectangle, circle, triangle) for geometric shapes</li>
          <li>Click the X tool to place X marks on the canvas</li>
          <li>Use the eraser to remove parts of your drawing</li>
          <li>Grid lines help with accurate measurements and alignment</li>
        </ul>
      </div>

      {/* Save Button */}
      <div className="mt-4 flex justify-end">
        <Button onClick={saveDrawing} className="bg-blue-600 hover:bg-blue-700">
          Save Drawing
        </Button>
      </div>
    </div>
  );
}