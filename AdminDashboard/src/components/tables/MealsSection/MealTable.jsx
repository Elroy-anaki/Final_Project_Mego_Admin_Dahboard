import React from "react";
import MealRow from "./MealRow";
import TableHeader from "./TableHeader";

const MealTable = ({ meals, sortFn }) => {


  return (
    <div className=" bg-gray-100">
      <div className="overflow-hidden  shadow-lg border-2 border-sky-800">
        <table className="w-full text-left bg-white">
          <thead className="bg-sky-800">
            <tr>
              <TableHeader
                title="Name"
                sort={sortFn}
                field={"mealName"}
                needToSort={true}
                />
              <TableHeader
                title="Price"
                sort={sortFn}
                field={"mealPrice"}
                needToSort={true}
                />
              <TableHeader
                title="Image"
                
              />
              <TableHeader
                title="Reviews"
                needToSort={false}
              />
              <TableHeader
                title="Actions"
                sort={sortFn}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {meals && meals.map((meal) => (
              <MealRow key={meal._id} Meal={meal} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealTable;
