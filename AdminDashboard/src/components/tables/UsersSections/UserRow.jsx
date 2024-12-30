import React, { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios';
import { notifySuccess } from '../../../lib/Toasts/Toasts';
import { UserContext } from '../../../Contexts/UserContext';
import EmailButton from '../../common/Buttons/EmailButton';

function UserRow({ User }) {
    const queryClient = useQueryClient()
    // const {user, setUser} = useContext(UserContext)

    // const {mutate: deleteUser} = useMutation({
    //     mutationKey:['deleteEmployeeById'],
    //     mutationFn: async () => {
    //         try {
    //             const { data } = await axios.delete(`/users/delete-user-by-id/${User._id}`)
    //             console.log(data)
    //             return data
    //         } catch (error) {
    //             throw error
    //         }
    //     },
    //     onSuccess: (data) => {
    //         queryClient.invalidateQueries({queryKey: ['getAlleUsers']});
    //         console.log(data.msg)
    //         notifySuccess(data.msg)
    //     }
    // })





    return (
        <tr key={User._id} className="hover:bg-sky-100">
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{User.userName}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">{User.userEmail}</td>
            <td className="px-6 py-4 text-sm text-gray-900 text-center">----------</td>
            {/* <td className="px-6 py-4 text-sm text-center ">
                <div className="inline-flex gap-3">
                <EmailButton email={User.UserEmail} />

                    <button
                    onClick={() => {
                        setUser(User)
                        console.log("User", User)
                        // document.getUserById('addUserModal').showModal()
                    }}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                    <button
                    onClick={deleteUser}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </td> */}
        </tr>
    )
}

export default UserRow
