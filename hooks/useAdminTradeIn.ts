import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useAdminTradeIns = ()=>{
    const [tradeIns, setTradeIns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "TradeIns"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTradeIns(docs);
        setLoading(false);
    });

    return () => unsubscribe();
}, []);

    return {tradeIns, loading};

};