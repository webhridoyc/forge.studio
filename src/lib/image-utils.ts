export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
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