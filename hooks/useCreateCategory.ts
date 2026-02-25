import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { categoryService } from "@/services/categoryService";

export const useCreateCategory = () => {
  const [name, setName] = useState("");
  const route = useRouter();


  const createNewCategory = async () => {
    if (!name.trim()) {
      toast.error("Enter a Category Name");
      return;

    }

    const toastId = toast.loading("Creating Category");
    try {
      const slug = name.trim().toLowerCase().replace(/\s+/g, '-');
      
      await categoryService.createCategory({ 
        name: name.trim(),
        slug: slug 
      });
    toast.success("Category Created Successfully", { id: toastId });
      route.push("/admin/categories"); 
    } catch (error) {
      toast.error("Error Creating Category", { id: toastId });
    }

  };

  return { name, setName, createNewCategory };
};

