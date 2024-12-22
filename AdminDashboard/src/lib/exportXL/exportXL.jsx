import * as XLSX from "xlsx";
import axios from "axios";
import { notifyError, notifySuccess } from '../Toasts/Toasts'

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
