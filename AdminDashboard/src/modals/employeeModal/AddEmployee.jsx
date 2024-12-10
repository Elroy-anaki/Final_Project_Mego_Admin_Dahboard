import React from "react";
import daisyui from "daisyui";
import AddEmployeeForm from "./AddEmployeeForm";
import SignIn from "../../forms/Auth/SignIn/SignIn";

export default function AddEmployee() {
  // שם הפונקציה צריך להתחיל באות גדולה
  return (
    <>
      <dialog id="addEmployeeModal" className="modal w-[35%] py-10  rounded-xl">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() =>
                {document.getElementById("addEmployeeForm").reset()
                document.getElementById("addEmployeeModal").close()
                }
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <AddEmployeeForm />
        </div>
      </dialog>
    </>
  );
}
