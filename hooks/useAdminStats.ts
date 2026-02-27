import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { reportService } from "@/services/reportService";

export const useAdminStats = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [earningsData, setEarningsData] = useState<any[]>([]);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEarnings, setLoadingEarnings] = useState(true);

  useEffect(() => {
   
    const fetchTraffic = async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activityRef = collection(db, "user_activity");
        const q = query(activityRef, where("timestamp", ">=", thirtyDaysAgo));
        const querySnapshot = await getDocs(q);

        const counts: { [key: string]: number } = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.timestamp) {
            const date = data.timestamp.toDate().toLocaleDateString("en-US", {
              month: "short", day: "2-digit",
            });
            counts[date] = (counts[date] || 0) + 1;
          }
        });

        const formattedData = Object.keys(counts)
          .map((date) => ({ date, count: counts[date] }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setChartData(formattedData);
      } catch (error) { console.error("Traffic Error:", error); } 
      finally { setLoading(false); }
    };

    
    const fetchEarnings = async () => {
      try {
        const rawData = await reportService.getRawEarnings(); 
        
       
        const CLEAR_DATA_BEFORE = new Date("2026-02-27T23:10:00").getTime();

        if (rawData && rawData.status) {
          const dailyMap: { [key: string]: number } = {};
          const productTally: { [key: string]: number } = {};
          let grandTotal = 0;

          rawData.data.forEach((trx: any) => {
            const trxTime = new Date(trx.paid_at).getTime();

            
            if (trxTime < CLEAR_DATA_BEFORE) return;

            const dateStr = new Date(trx.paid_at).toLocaleDateString("en-US", {
              month: "short", day: "2-digit",
            });
            const amount = trx.amount / 100;
            
            
            dailyMap[dateStr] = (dailyMap[dateStr] || 0) + amount;
            grandTotal += amount;

            
            const detailedMetadata = trx.metadata?.product_metadata;

            if (detailedMetadata) {
           
              const productEntries = detailedMetadata.split(",").map((p: string) => p.trim());

              productEntries.forEach((entry: string) => {
                const [name, price, qty] = entry.split(":");
                
                if (name && price) {
                  
                  const productRevenue = parseFloat(price) * (parseInt(qty) || 1);
                  productTally[name] = (productTally[name] || 0) + productRevenue;
                }
              });
            }
          });

        
          const formattedEarnings = Object.keys(dailyMap)
            .map((date) => ({ date, revenue: dailyMap[date] }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

         
          const formattedProducts = Object.keys(productTally)
            .map((name) => ({ name, revenue: productTally[name] }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5); 

          setEarningsData(formattedEarnings);
          setTotalEarnings(grandTotal);
          setTopProducts(formattedProducts);
        }
      } catch (error) { console.error("Earnings Error:", error); } 
      finally { setLoadingEarnings(false); }
    };

    fetchTraffic();
    fetchEarnings();
  }, []);

  return {
    chartData,
    earningsData,    
    totalEarnings,  
    topProducts, 
    loading,
    loadingEarnings,
    totalVisitors: chartData.reduce((acc, curr) => acc + (curr.count || 0), 0),
  };
};