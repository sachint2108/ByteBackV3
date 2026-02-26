import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { analyzeProductImage } from "@/services/imageUploadService";

export const useImageSearch = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [aiPrediction, setPrediction] = useState<string>(""); 
  const [matchedProducts, setMatchedProducts] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const imagefileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => e.preventDefault();


  

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUserFile(e.dataTransfer.files[0]);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUserFile(e.target.files[0]);
    }
  };


  //This handles the image file the user is Uploading
  const handleUserFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please Upload a Valid Image File.");
      return;
    }
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setHasSearched(false);
  };

  
  
  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    const toastId = toast.loading("AI is Analysing the Image Uploaded");

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await analyzeProductImage(formData);

      if (response.success) {
        toast.success("Match found", { id: toastId });
        setPrediction(response.keyword || "Unknown Device");
        setMatchedProducts(response.matchedProducts || []);
        setHasSearched(true);
      } else {
        toast.error(response.error || "Failed to Analyze Image.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something Went Wrong.", { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // After the search is done, this will resest it.
  const resetSearch = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setHasSearched(false);
    setPrediction("");
    setMatchedProducts([]);
  };

  return {
    previewUrl,
    isAnalyzing,
    aiPrediction,
    matchedProducts,
    hasSearched,
    imagefileInputRef,
    handleDrag,
    handleDrop,
    handleFileChange,
    analyzeImage,
    resetSearch
  };

  


}