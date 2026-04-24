export type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'original';

export interface ProcessedAsset {
  id: string;
  name: string;
  originalSize: number;
  base64: string;
  optimizedSize: number;
  format: string;
  dimensions: { width: number; height: number };
}

/**
 * Optimized image synthesis engine.
 * Supports 'Original' mode for 1:1 quality and 'Optimized' modes for performance.
 */
export const optimizeImage = (
  file: File, 
  targetFormat: OutputFormat = 'original',
  maxWidth = 1200, 
  quality = 0.8
): Promise<ProcessedAsset> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // --- MODE 1: ORIGINAL QUALITY (Lossless) ---
    // Directly read the file to preserve 1:1 pixel data and bypass canvas limitations.
    if (targetFormat === 'original') {
      reader.onload = (event) => {
        const b64 = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            originalSize: file.size,
            base64: b64,
            optimizedSize: Math.round(b64.length * 0.75),
            format: file.type,
            dimensions: { width: img.width, height: img.height }
          });
        };
        img.onerror = () => reject(new Error('Could not read image dimensions.'));
        img.src = b64;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
      return;
    }

    // --- MODE 2: OPTIMIZED SYNTHESIS (Canvas-based) ---
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // High-performance resizing logic
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Enable premium smoothing for better optimized quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, width, height);
        
        // Default to WebP if not specified, as it offers the best Base64 length/quality ratio
        const outputMime = targetFormat === 'original' ? 'image/webp' : targetFormat;
        const b64 = canvas.toDataURL(outputMime, quality);
        
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          originalSize: file.size,
          base64: b64,
          optimizedSize: Math.round(b64.length * 0.75),
          format: outputMime,
          dimensions: { width: Math.round(width), height: Math.round(height) }
        });
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const formatBase64Code = (base64: string, type: 'raw' | 'html' | 'css' | 'uri') => {
  const rawString = base64.split(',')[1] || base64;
  
  switch (type) {
    case 'html':
      return `<img src="${base64}" alt="Base64 Image" />`;
    case 'css':
      return `background-image: url("${base64}");`;
    case 'uri':
      return base64;
    case 'raw':
    default:
      return rawString;
  }
};

export const downloadTextFile = (content: string, filename: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadImageFromBase64 = (base64: string, filename: string) => {
  const element = document.createElement('a');
  element.href = base64;
  element.download = filename || 'forged-image.png';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
