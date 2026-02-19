"use client";

import React, { useState } from "react";


interface ProductTabProps{
  product: {
    description?: string;
    category?: string;
    condition?: string;
  };
}

const ProductTabs = ({ product}: ProductTabProps ) => {
  const [currentProductTab, setCurrentProductTab] = useState<number>(0);

  return (
    <div className="px-5 text-black font-sans">
      
      
      
      {/* Tab Headers */}
      <div role="tablist" className="tabs tabs-bordered border-b border-gray-200">
        <button
          role="tab"
          className={`tab text-lg pb-4 transition-colors ${
            currentProductTab === 0 
              ? "tab-active font-semibold border-black text-black" 
              : "text-gray-500 hover:text-gray-700 border-transparent"
          }`}
          onClick={() => setCurrentProductTab(0)}
        >
          Description
        </button>
        <button
          role="tab"
          className={`tab text-lg pb-4 transition-colors ${
            currentProductTab === 1 
              ? "tab-active font-semibold border-black text-black" 
              : "text-gray-500 hover:text-gray-700 border-transparent"
          }`}
          onClick={() => setCurrentProductTab(1)}
        >
          Additional Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-8 min-h-[200px]">
        
        {/* Tab 0: Description */}
        {currentProductTab === 0 && (
          <div className="text-gray-700 text-base leading-relaxed max-w-3xl">
            {/* React renders strings safely by default, no need for dangerouslySetInnerHTML */}
            <p className="whitespace-pre-wrap">
              {product?.description || "No description provided for this product."}
            </p>
          </div>
        )}

        {/* Tab 1: Additional Info */}
        {currentProductTab === 1 && (
          <div className="overflow-x-auto max-w-2xl">
            <table className="table-auto w-full text-left text-base text-gray-700">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="py-4 font-semibold w-1/3 text-gray-900">Category</th>
                  <td className="py-4 uppercase tracking-wider text-sm">
                    {product?.category || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="py-4 font-semibold text-gray-900">Condition</th>
                  <td className="py-4 capitalize">
                    {product?.condition || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="py-4 font-semibold text-gray-900">Authenticity</th>
                  <td className="py-4">100% Genuine Apple Product</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductTabs;
