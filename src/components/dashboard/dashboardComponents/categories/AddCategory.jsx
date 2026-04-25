import React, { useState } from "react";
import HeadingComponent from "../../headingcomponent/HeadingComponent";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InputFile from "../../inputs/InputFile";
import EditorInput from "../../inputs/EditorInput";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../../config/axios";

const AddCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleArrow = () => {
    navigate("/admin/categories/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!category.categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/category/add-category?categoryName=${category.categoryName}&description=${category.description}`,
        {
          categoryName: category.categoryName.trim(),
          description: category.description.trim(),
        },
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Category added successfully");
        setCategory({
          categoryName: "",
          description: "",
        });
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
    <div className="add_new_category">
      <HeadingComponent
        heading="Add Category"
        Icon={FaArrowRightLong}
        click_arrow={handleArrow}
      />

      <form onSubmit={handleSubmit} className="form">
        <div className="category_container">
          <InputFile
            type="text"
            label="Category Name"
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
          />

          <div className="editor">
            <EditorInput
              value={category.description}
              onChange={(content) =>
                setCategory((prev) => ({
                  ...prev,
                  description: content,
                }))
              }
            />
          </div>

          <button className="submit_category" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
