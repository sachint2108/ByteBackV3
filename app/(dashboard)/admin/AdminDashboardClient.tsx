"use client";
import React from "react";
import { DashboardSidebar, ActiveUsersChart } from "@/components";
import { useAdminStats } from "@/hooks/useAdminStats";

const AdminDashboardClient = () => {
  // 1. Destructure topProducts from your hook
  const { 
    chartData, 
    earningsData, 
    totalEarnings, 
    topProducts, 
    loading, 
    loadingEarnings, 
    totalVisitors 
  } = useAdminStats();

  return (
    <div className="bg-[#fbfbfd] flex min-h-screen text-gray-900 font-sans">
      <DashboardSidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <header className="mb-10">
            <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
              Management Intelligence
            </nav>
            <h1 className="text-4xl font-black tracking-tighter">Business Overview</h1>
          </header>

          {/* TOP ROW: Revenue & Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* REVENUE INSIGHTS (Vertical Bar Chart) */}
            <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-sm flex flex-col">
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Net Revenue (30d)
                </p>
                <h3 className="text-4xl font-black tracking-tighter">
                  {loadingEarnings ? "..." : `R ${totalEarnings.toLocaleString()}`}
                </h3>
              </div>

              <div className="flex-1 min-h-[250px]">
                {loadingEarnings ? (
                  <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-3xl" />
                ) : (
                  <ActiveUsersChart 
                    data={earningsData} 
                    type="bar" 
                    dataKey="revenue" 
                    color="#22c55e" 
                  />
                )}
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-black">Paystack Sandbox Mode</span>
              </div>
            </div>

            {/* TRAFFIC INSIGHTS (Line Chart) */}
            <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-sm flex flex-col">
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Total Visitors (30d)
                </p>
                <h3 className="text-4xl font-black tracking-tighter">
                  {loading ? "..." : totalVisitors}
                </h3>
              </div>

              <div className="flex-1 min-h-[250px]">
                {loading ? (
                  <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-3xl" />
                ) : (
                  <ActiveUsersChart 
                    data={chartData} 
                    type="line" 
                    dataKey="count" 
                    color="#000" 
                  />
                )}
              </div>
              
              <div className="mt-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-black">Firestore Activity Logs</span>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: TOP 5 PRODUCTS (Horizontal Bar Chart) */}
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-sm">
            <header className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                Inventory Performance
              </p>
              <h2 className="text-2xl font-black tracking-tighter">Top 5 Selling Products</h2>
            </header>
            
            <div className="min-h-[350px]">
              {loadingEarnings ? (
                <div className="w-full h-[300px] bg-gray-50/50 animate-pulse rounded-3xl" />
              ) : (
                <ActiveUsersChart 
                  data={topProducts} 
                  type="horizontal-bar" 
                  dataKey="revenue" 
                  color="#111" 
                />
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardClient;