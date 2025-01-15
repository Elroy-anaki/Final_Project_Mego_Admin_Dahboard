import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { notifySuccess } from '../../../../lib/Toasts/Toasts';
import { useNavigate } from 'react-router-dom';

function CategoryModal() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        categoryImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setCategoryData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        }
    };

    const { mutate: addCategory } = useMutation({
        mutationKey: ['addCategory'],
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("categoryName", categoryData.categoryName);
            formData.append("categoryImage", categoryData.categoryImage);
            const { data } = await axios.post(`/categories/add-category`, formData);
            return data
        },
        onSuccess: () => {
            notifySuccess('Category Added!')
            queryClient.invalidateQueries({queryKey: "getAllCategories"})
            queryClient.invalidateQueries({queryKey: "getCategories"})
            queryClient.refetchQueries({queryKey: "getAllCategories"})
            queryClient.refetchQueries({queryKey: "getCategories"})
            navigate('/dashboard/meals')
            
            },
    });

    return (
        <dialog id="categoryModal" className="modal w-[40%] px-10 py-10 bg-white rounded-xl ">
            <div className="modal-box">
                <div className="flex justify-between mb-6">
                    <h2 className="text-3xl text-gray-800">Add New Category</h2>
                    <button
                        onClick={() => {
                            document.getElementById('categoryModalForm').reset();
                            document.getElementById('categoryModal').close();
                            setCategoryData({ categoryName: "", categoryImage: null });
                        }}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </div>
                <form
                    id="categoryModalForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addCategory();
                        document.getElementById('categoryModalForm').reset();
                        document.getElementById('categoryModal').close();
                    }}
                    className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-lg"
                >
                    <div>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="categoryName"
                            id="categoryName"
                            onChange={handleInputChange}
                            placeholder="Enter category name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700 mb-1">
                            Category Image
                        </label>
                        <input
                            type="file"
                            name="categoryImage"
                            id="categoryImage"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Category +
                    </button>
                </form>
            </div>
        </dialog>
    );
}



export default CategoryModal
