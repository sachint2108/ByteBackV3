"use client";
import React from "react";
import { useTradeIn } from "@/hooks/useTradeIn";

const TradeInPage = () => {
    const {
    formData,
    setFormData,
    estimate,
    setEstimate,
    isSubmitting,
    handleEstimate,
    tradeInConfirm,
  } = useTradeIn();

  return (
    <div className="bg-white min-w-screen py-16 px-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200">
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Apple Trade-In Portal</h1>
        <p className="text-gray-500 mb-8">Get an instant AI-powered estimate and turn your old Apple tech into cash or store credit.</p>

        {!estimate ? (
          <form onSubmit={handleEstimate} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              {/* Device Type Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Device Type</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-black focus:border-black"
                  value={formData.typeDevice}
                  onChange={(e) => setFormData({ ...formData, typeDevice: e.target.value })}
                >
                  <option value="iPhone">iPhone</option>
                  <option value="iPad">iPad</option>
                  <option value="MacBook">MacBook</option>
                  <option value="Apple Watch">Apple Watch</option>
                </select>
              </div>

              
              
              
              {/* Storage Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Storage / Size</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-black focus:border-black"
                  value={formData.storage}
                  onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                >
                  <option value="64GB">64GB / Standard</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB+</option>
                </select>
              </div>
            </div>

            
            
            
            {/* Exact Model */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Exact Model</label>
              <input 
                type="text" 
                placeholder="e.g., iPhone 13 Pro, MacBook Air M1" 
                required
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-black focus:border-black"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>

            
            
            {/* Condition */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Condition</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-black focus:border-black"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              >
                <option value="Flawless">Flawless (No scratches, perfect battery)</option>
                <option value="Good">Good (Minor scratches, normal wear)</option>
                <option value="Fair">Fair (Deep scratches, heavy wear)</option>
                <option value="Cracked">Cracked (Broken screen or severe damage)</option>
              </select>
            </div>

            
            
            
            
            {/* Serial Number / IMEI */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Serial Number / IMEI</label>
              <input 
                type="text"
                required
                maxLength={15}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-black focus:border-black font-mono uppercase"
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value.toUpperCase() })}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] mt-4"
            >
              {isSubmitting ? "Validating..." : "Get AI Estimate"}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="bg-green-50 text-green-800 border border-green-200 rounded-2xl p-6 mb-8 inline-block w-full">
              <p className="text-sm font-bold uppercase tracking-widest mb-2 text-green-600">AI Estimated Value</p>
              <p className="text-6xl font-black">R {estimate.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-3 font-medium">Device Verified • AI Price Locked</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setEstimate(null)}
                className="flex-1 bg-gray-100 text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={tradeInConfirm}
                disabled={isSubmitting}
                className="flex-1 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Confirm Trade-In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeInPage