"use client";
import React from "react";
import Link from "next/link";
import { useImageSearch } from "@/hooks/useImageSearch";


const ImageSearchPage = () => {
  const {
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
  } = useImageSearch();


  return (
    <div className="min-h-screen bg-white pt-24 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-4">
            Visual Search
          </h1>
          <p className="text-lg text-gray-500">
            Looking for a Specific Device? Snap a photo or upload an image, and our AI will Find the Closest Matches in the ByteBack inventory.
          </p>
        </div>

        
        
        
        
        {/* Upload & Preview Zone */}
        {!hasSearched && (
          <div className="max-w-xl mx-auto">
            <div 
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !isAnalyzing && imagefileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center flex flex-col items-center justify-center transition-all bg-white overflow-hidden ${
                isAnalyzing ? "opacity-70 pointer-events-none border-gray-200" : 
                previewUrl ? "border-black bg-gray-50" : "border-gray-300 hover:border-black hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <input 
                type="file" 
                ref={imagefileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />

              {previewUrl ? (
                <div className="flex flex-col items-center gap-6">
                  <img src={previewUrl} alt="Preview" className="h-48 object-contain rounded-xl shadow-sm" />
                  {!isAnalyzing && <p className="text-sm font-bold text-gray-500">Click or drag to change image</p>}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-900">Upload a photo</p>
                  <p className="text-sm text-gray-500">Drag and drop, or Click to Browse</p>
                </div>
              )}
            </div>

           
           
           
           
           
           
            {/* Action Button */}
            {previewUrl && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto px-12 h-14 bg-black text-white text-lg font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Scanning...
                    </>
                  ) : (
                    "Find My Device"
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        
        
        
        {/* Results Section */}
        {hasSearched && (
          <div className="animate-fade-in-up">
            
            
            
            
            
            {/* AI Guess Banner */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <img src={previewUrl!} alt="Analyzed" className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm" />
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">AI Analysis Result</p>
                  <h2 className="text-2xl font-black text-gray-900">{aiPrediction}</h2>
                </div>
              </div>
              <button 
                onClick={resetSearch}
                className="px-6 py-3 rounded-lg border-2 border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Scan Another Item
              </button>
            </div>

            
            
            
            
            
            
            {/* Matching Products Grid */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {matchedProducts.length > 0 ? "Closest Matches in Stock" : "No exact matches found."}
              </h3>
              {matchedProducts.length === 0 && (
                <p className="text-gray-500 mt-2">We couldn't find an exact match in our inventory right now. Try searching our general categories!</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchedProducts.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:border-black/10 transition-all h-full flex flex-col">
                    <div className="aspect-square w-full bg-gray-50 rounded-xl mb-4 p-4 flex items-center justify-center overflow-hidden relative">
                      <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="text-gray-900 font-bold leading-tight mb-2 line-clamp-2">{product.name}</h3>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <p className="text-lg font-black text-gray-900">R {Number(product.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ImageSearchPage;