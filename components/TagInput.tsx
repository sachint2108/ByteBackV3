"use client";
import React, { KeyboardEvent } from "react";
import { FaTimes } from "react-icons/fa";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim().toUpperCase();
      
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.currentTarget.value = ""; 
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full space-y-2">
   
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 block">
        Product Tags (Press Enter)
      </label>
      
    
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 ml-1">
          {tags.map((tag, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="hover:text-red-400 transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="e.g. BEST SELLER, GRADE A, SALE..."
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-black/5 transition-all outline-none placeholder:text-gray-300"
      />
    </div>
  );
};

export default TagInput;