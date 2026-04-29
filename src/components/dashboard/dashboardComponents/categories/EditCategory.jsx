import React, { useEffect, useState,useRef } from "react";
import HeadingComponent from "../../headingcomponent/HeadingComponent";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import InputFile from "../../inputs/InputFile";
import EditorInput from "../../inputs/EditorInput";
import { axiosInstance } from "../../../../config/axios";
import toast from "react-hot-toast";

const EditCategory = () => {
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleArrow = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getCategory = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/category/get-all-categories`,
        );
        const allcategories = response.data;

        const foundCategory = allcategories.find((cat) => cat.id === id);

        if (foundCategory) {
          setCategory({
            categoryName: foundCategory.name || "",
            description: foundCategory.description || "",
          });
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Error fetching category";
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!category.categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `/category/update-category?id=${id}&categoryName=${category.categoryName}&description=${category.description}`,
        {
          categoryName: category.categoryName.trim(),
          description: category.description.trim(),
        },
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Category updated successfully");
        navigate("/admin/categories");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Error adding category";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit_categories">
      <HeadingComponent
        heading="Edit Category"
        Icon={FaArrowRightLong}
        click_arrow={handleArrow}
      />
      <form onSubmit={handleSubmit} className="form">
        <div className="edit_category_container">
          <InputFile
            type="text"
            label="Category Name"
            name="categoryName"
            value={category.categoryName}
            onChange={(e) =>
              setCategory({ ...category, categoryName: e.target.value })
            }
          />

          <button className="submit_category" type="submit" disabled={loading}>
            update category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
