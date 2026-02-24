"use client";
import React from "react";
import { useAdminTradeIns } from "@/hooks/useAdminTradeIn";
import { changeStatus } from "@/services/adminTradeIn";
import toast from "react-hot-toast";
import { DashboardSidebar } from "@/components";

const AdminTradeInPage = () =>{
    const { tradeIns, loading } = useAdminTradeIns();

    const handleAction = async (id: string, status: "Approved" | "Rejected") => {
  
        if (status === "Approved") {
            toast.success(`Trade In Approved`, {
            icon: '✅',
            duration: 4000
            });
        } else {
            toast.error(`Trade In Rejected`, {
            icon: '❌',
            duration: 4000
            });
        }
        {/* If there is time I will do this later, but for now it is out of  scope*/}

  console.log(`Admin Action Triggered: ${status} for ID: ${id}.`);
};

    if (loading) return <div className="p-20 text-center font-bold">Loading Trade-Ins</div>;

 return (
    <div className="bg-gray-50/30 flex justify-start mx-auto h-screen max-xl:flex-col font-san">
 
      <DashboardSidebar />

   
      <div className="flex-1 pb-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          
       
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trade-In Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage device buy-backs and AI valuation requests.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Requests:</span>
                <span className="text-sm font-bold text-gray-900">{tradeIns.length}</span>
              </div>
            </div>
          </div>

          {loading ? (
         
            <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <span className="loading loading-spinner loading-md text-gray-400"></span>
                <p className="text-sm font-medium text-gray-500 animate-pulse">Fetching records from Firebase...</p>
              </div>
            </div>
          ) : (
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  
                 
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Device Details
                      </th>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        AI Estimate
                      </th>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

              
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {tradeIns.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        
                     
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="font-semibold text-gray-900 text-sm">{item.userEmail}</div>
                            <div className="text-[10px] font-mono text-gray-400">{item.id.slice(0, 10)}...</div>
                          </div>
                        </td>

                     
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="text-sm font-bold text-gray-900">{item.deviceDetails.deviceType} {item.deviceDetails.model}</div>
                            <div className="text-xs text-gray-500">{item.deviceDetails.storage} • {item.deviceDetails.condition}</div>
                          </div>
                        </td>

                       
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          R {Number(item.estimate).toLocaleString()}
                        </td>

                     
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ring-1 ring-inset uppercase tracking-wide ${
                            item.status === 'Approved' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                            item.status === 'Rejected' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                            'bg-blue-50 text-blue-700 ring-blue-600/20'
                          }`}>
                            {item.status}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.status === "Pending Approval" ? (
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleAction(item.id, "Approved")}
                                className="bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-all active:scale-95"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleAction(item.id, "Rejected")}
                                className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all active:scale-95"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No Actions</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tradeIns.length === 0 && (
                  <div className="p-20 text-center text-gray-400 italic">No trade-ins found.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default AdminTradeInPage
