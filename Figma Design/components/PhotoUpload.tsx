import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Upload, 
  X, 
  Camera, 
  ImageIcon, 
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface PhotoData {
  id: string;
  file: File;
  url: string;
  category: 'before' | 'after';
  filename: string;
  size: number;
  uploadDate: string;
  description?: string;
}

interface PhotoUploadProps {
  initialPhotos?: PhotoData[];
  onPhotosChange: (photos: PhotoData[]) => void;
}

export function PhotoUpload({ initialPhotos = [], onPhotosChange }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<PhotoData[]>(initialPhotos);
  const [dragOver, setDragOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'before' | 'after'>('before');
  const [previewPhoto, setPreviewPhoto] = useState<PhotoData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: PhotoData[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoData: PhotoData = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            url: e.target?.result as string,
            category: selectedCategory,
            filename: file.name,
            size: file.size,
            uploadDate: new Date().toISOString(),
            description: ''
          };
          
          newPhotos.push(photoData);
          
          if (newPhotos.length === files.length) {
            const updatedPhotos = [...photos, ...newPhotos];
            setPhotos(updatedPhotos);
            onPhotosChange(updatedPhotos);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const updatePhotoCategory = (photoId: string, category: 'before' | 'after') => {
    const updatedPhotos = photos.map(photo =>
      photo.id === photoId ? { ...photo, category } : photo
    );
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadPhoto = (photo: PhotoData) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.filename;
    link.click();
  };

  const beforePhotos = photos.filter(photo => photo.category === 'before');
  const afterPhotos = photos.filter(photo => photo.category === 'after');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Job Photos</h3>
          <p className="text-sm text-gray-600">Upload before and after photos to document the work</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="category" className="text-sm font-medium text-gray-700">
            Upload to:
          </Label>
          <Select value={selectedCategory} onValueChange={(value: 'before' | 'after') => setSelectedCategory(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="before">Before</SelectItem>
              <SelectItem value="after">After</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              Drop photos here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, GIF up to 10MB each
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 && (
        <div className="mt-8 space-y-6">
          {/* Before Photos */}
          {beforePhotos.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h4 className="text-base font-medium text-gray-900">Before Photos</h4>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {beforePhotos.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beforePhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img
                          src={photo.url}
                          alt={photo.filename}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                onClick={() => setPreviewPhoto(photo)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{photo.filename}</DialogTitle>
                              </DialogHeader>
                              <div className="flex justify-center">
                                <img
                                  src={photo.url}
                                  alt={photo.filename}
                                  className="max-w-full max-h-[70vh] object-contain"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                            onClick={() => downloadPhoto(photo)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-white/80 hover:bg-red-50 text-red-600"
                            onClick={() => removePhoto(photo.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {photo.filename}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(photo.size)} • {new Date(photo.uploadDate).toLocaleDateString()}
                        </p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <Select
                            value={photo.category}
                            onValueChange={(value: 'before' | 'after') => updatePhotoCategory(photo.id, value)}
                          >
                            <SelectTrigger className="w-20 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="before">Before</SelectItem>
                              <SelectItem value="after">After</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                            onClick={() => removePhoto(photo.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* After Photos */}
          {afterPhotos.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h4 className="text-base font-medium text-gray-900">After Photos</h4>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {afterPhotos.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {afterPhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img
                          src={photo.url}
                          alt={photo.filename}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                onClick={() => setPreviewPhoto(photo)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{photo.filename}</DialogTitle>
                              </DialogHeader>
                              <div className="flex justify-center">
                                <img
                                  src={photo.url}
                                  alt={photo.filename}
                                  className="max-w-full max-h-[70vh] object-contain"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                            onClick={() => downloadPhoto(photo)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-white/80 hover:bg-red-50 text-red-600"
                            onClick={() => removePhoto(photo.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {photo.filename}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(photo.size)} • {new Date(photo.uploadDate).toLocaleDateString()}
                        </p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <Select
                            value={photo.category}
                            onValueChange={(value: 'before' | 'after') => updatePhotoCategory(photo.id, value)}
                          >
                            <SelectTrigger className="w-20 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="before">Before</SelectItem>
                              <SelectItem value="after">After</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                            onClick={() => removePhoto(photo.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {photos.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Total: {photos.length} photos
            </span>
            <div className="flex space-x-4">
              <span className="text-red-600">
                Before: {beforePhotos.length}
              </span>
              <span className="text-green-600">
                After: {afterPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}