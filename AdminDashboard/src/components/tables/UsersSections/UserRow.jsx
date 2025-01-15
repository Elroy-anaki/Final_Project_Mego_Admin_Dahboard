import React, { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios';
import { notifySuccess } from '../../../lib/Toasts/Toasts';
import EmailButton from '../../common/Buttons/EmailButton';

function UserRow({ user }) {

    return (
        <tr key={user._id} className="hover:bg-sky-100">
            <td className="px-6 py-4 text-base font-semibold text-gray-900 text-center">{user.userName}</td>
            <td className="px-6 py-4 text-base text-gray-900 text-center">{user.userEmail}</td>
            <td className="px-6 py-4 text-base text-gray-900 text-center">{user.ordersQuantity}</td>
        </tr>
    )
}

export default UserRow