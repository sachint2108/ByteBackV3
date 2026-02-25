import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { categoryService } from "@/services/categoryService";

export const useSingleCategory = (id: string) => {
  const [name, setName] = useState("");
  const [load, setLoading] = useState(true);
  const route = useRouter();


  useEffect(() => {
    const readCategory = async () => {
      try {
        const data = await categoryService.readCategoryById(id) as any;
        setName(data.name);
      } catch (error) {
        toast.error("Could not Load Category Details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) readCategory();
  }, [id]);


  const updateCategory = async () => {
    if (!name.trim()) {
      toast.error("Category Name Cannot be Empty");
      return;


    }

    const toastId = toast.loading("Updating Category");
    try {
      const fSlug = name.trim().toLowerCase().replace(/\s+/g, '-');
      
      await categoryService.updateCategory(id, { 
        name: name.trim(),
        slug: fSlug 
      });
      
      toast.success("Category Updated Successfully", { id: toastId });
      route.refresh();
    } catch (error) {
      toast.error("Error Updating Category", { id: toastId });
    }
  };

  const deleteCategory = async () => {
    const cDelete = window.confirm("Are you sure? This Will Permanently Delete this Category.");
    if (!cDelete) return;

    const toastId = toast.loading("Deleting Category");
    try {
      await categoryService.deleteCategory(id);
      
      toast.success("Category Deleted", { id: toastId });
      route.push("/admin/categories");
    } catch (error) {
      toast.error("Error Deleting Category", { id: toastId });
    }
  };

  return { name, setName, load, updateCategory, deleteCategory };
};
