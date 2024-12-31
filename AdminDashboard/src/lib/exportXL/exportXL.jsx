import * as XLSX from "xlsx";
import axios from "axios";
import { notifyError, notifySuccess } from '../Toasts/Toasts'
import { LucideChartGantt } from "lucide-react";

export function exportXL(json, exelName) {
    // Generate XL Page
    const wb = XLSX.utils.book_new();
    // Convert Json To CheetSheet
    const ws = XLSX.utils.json_to_sheet(json)

    const colWidths = Object.keys(json[0]).map(() => ({ wch: 20 }));
    ws['!cols'] = colWidths;

    // Create New Xl Page With Data
    XLSX.utils.book_append_sheet(wb, ws, exelName);
    XLSX.writeFile(wb, `${exelName}.xlsx`)
};

export async function downloadEmployees(premission, count) {
    try {
        if (!count) return;
        const { data } = await axios.get(`/employees/get-all-employees?page=1&search=${premission}&limit=${count}`);
        if (!data?.data) return;
        const employees = data.data.map(emp => ({
            "Full Name": emp.employeeName,
            "Email": emp.employeeEmail,
            "Role": emp.premission,
            "Created At": new Date(emp.createdAt).toLocaleDateString('he-IL'),
            "Last Update": new Date(emp.updatedAt).toLocaleDateString('he-IL')
        }));
        exportXL(employees, "EmployeesSheet");
        notifySuccess("Download Excel File")
    } catch (error) {
        console.log("Failed to download excel:", error);
        notifyError("Download Failed")
    }
};  
export async function downloadMeals(sort, field, count) {
    try {
        if (!count) return;
        const { data } = await axios.get(`/meals/get-all-meals?page=1&search=${field}&sortBy=${sort}&limit=${count}`)
        if (!data?.data) return;
        const meals = data.data.map(meal => ({
            "Name": meal.mealName,
            "Price": `$${meal.mealPrice}`,
            "Calories": meal.amoutnOfCalories,
            "Categories": (Array.isArray(meal.mealCategories) 
                        ? meal.mealCategories.map(cat => cat.categoryName).join(', ') 
                        : meal.mealCategories.categoryName),
            "Created": new Date(meal.createdAt).toLocaleDateString('he-IL'),
            "Last Update": new Date(meal.updatedAt).toLocaleDateString('he-IL')
        }));
        exportXL(meals, "MealsSheet");
        notifySuccess("Download Excel File")
    } catch (error) {
        console.log("Failed to download excel:", error);
        notifyError("Download Failed")
    }
};  
export async function downloadOrders(status) {
    try {
        if (!status) return;
        const { data } = await axios.get(`/orders/get-all-orders-tables?status=${status}`)
        if (!data?.data) return;
        console.log(data.data)

        const orders = data.data.map(order => ({
        "Order ID": order._id,
        "User Name": order.user?.userName,
        "Number of Guests": order.numberOfGuests,
        "Date": order.dateTime?.date,
        "Time": order.dateTime?.time,
        "Payment Status": order.status,
        "Table": {
            "Shared With": order.table?.sharedWith?.length || 0,
            "Total Price": `$${order.table?.totalPrice?.toFixed(2) || '0.00'}`,
            "Meals": order.table?.meals?.map(meal => meal.mealName).join(', ') || "None"
        },
        "Created At": new Date(order.createdAt).toLocaleDateString('he-IL'),
        "Last Updated": new Date(order.updatedAt).toLocaleDateString('he-IL'),
    }));
        exportXL(orders, "OrdersSheet");
        notifySuccess("Download Excel File")
    } catch (error) {
        console.log("Failed to download excel:", error);
        notifyError("Download Failed")
    }
};  
