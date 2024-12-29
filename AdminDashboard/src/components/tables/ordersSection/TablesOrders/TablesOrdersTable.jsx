import React, { useState } from 'react';
import TablesOrdersRow from './TablesOrdersRow';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



const TablesOrdersTable = () => {

  const { data } = useQuery({
    queryKey: ['getAllTablesOrders'],
    queryFn: async () => {
      const response = await axios.get('/orders/get-all-orders-tables');
      console.log(response.data);
      return response.data; 
    },
    select: (data) => data.data ,
    staleTime: 1000 * 6000
  });


  return (
    <div>
      <div className="w-full border-2 border-sky-800 ">
        
        <table className="w-full text-left ">
          <thead className="rounded-lg bg-sky-800 text-center">
            <tr>
              <th className="px-6 py-3 text-lg font-medium text-white">Order Id</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Client</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Number Of Guests</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Meals</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Total Price</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Time</th>
              <th className="px-6 py-3 text-lg font-medium text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data && data?.map((orderTable, index) => <TablesOrdersRow key={index} orderTable={orderTable}/>)}
            
          </tbody>
        </table>
        
      </div>
      

    </div>
  );
};

export default TablesOrdersTable;