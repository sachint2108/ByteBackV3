"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { checkStatus } from "@/services/imeiORsnService";

const CheckDpage = () => {
    const [imei, setImei] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [deviceData, setDeviceData] = useState<any>(null);


    const handleDeviceCheck = async (e: React.FormEvent) =>{
        e.preventDefault();""


        if (imei.trim().length<8){
            toast.error("Please Enter a Valid IMEI or Serial Number");
            return
        }

        const toastId = "device-scan";

        setIsChecking(true);
        setDeviceData(null);
        toast.loading("Scanning Global Telecom Databases", {id: toastId});

        try{
            const data = await checkStatus(imei);
            setDeviceData(data);
            toast.success("Device Scan Complete", {id: toastId});
        }catch(err:any){
            toast.error(err.message);
        }finally{
            setIsChecking(false);
        }
    };

    return (
    <div className="bg-white min-w-screen py-16 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        
        
        {/* Search Box Card */}
        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-200 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Free Device Status Check</h1>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto">
            Check if your device is Blacklisted, Reported Stolen, or iCloud locked before you buy or sell it.
          </p>

          <form onSubmit={handleDeviceCheck} className="flex gap-4 max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Enter 15-digit IMEI or Serial Number" 
              required
              className="flex-1 bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-black focus:border-black font-mono uppercase"
              value={imei}
              onChange={(e) => setImei(e.target.value.toUpperCase())}
            />
            <button 
              type="submit" 
              disabled={isChecking}
              className="bg-black text-white font-bold px-8 rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isChecking ? "Checking" : "Check Status"}
            </button>
          </form>
        </div>

        
        
        
        
        
        {/* Results Card */}
        {deviceData && (
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Scan Results for {deviceData.deviceName || "Device"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              
              
              
              {/* Status Indicators */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-600">Blacklist Status</span>
                  {deviceData.usaBlockStatus === "Clean" ? (
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">CLEAN</span>
                  ) : (
                     <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">FLAGGED</span>
                  )}
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-600">Find My iPhone (iCloud)</span>
                  {deviceData.fmiOn ? (
                     <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">LOCKED (ON)</span>
                  ) : (
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">UNLOCKED (OFF)</span>
                  )}
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-600">Network Lock</span>
                  {deviceData.simLock ? (
                     <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">LOCKED</span>
                  ) : (
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">UNLOCKED</span>
                  )}
                </div>
              </div>

              
              
              
              
              {/* Technical Details */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-sm space-y-3">
                <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wider text-xs">Device Info</h3>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">IMEI</span>
                  <span className="font-mono font-medium">{deviceData.imei || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Serial Number</span>
                  <span className="font-mono font-medium">{deviceData.serial || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Warranty</span>
                  <span className="font-medium text-right max-w-[150px] truncate">{deviceData.warrantyStatus || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Replaced Device</span>
                  <span className="font-medium">{deviceData.replaced ? "Yes" : "No"}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );


};

export default CheckDpage;