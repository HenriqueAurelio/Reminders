import { Trash } from "@phosphor-icons/react";
import axios from "axios"

export const Reminder = ({ updated, setUpdated, id, date, children }) => {

    async function deleteItem() {
        const response = await axios.delete(`${import.meta.env.VITE_API_HOST}/api/reminder/${id}`, {
        })

        if (response.status === 200) {
            setUpdated(!updated)
        }
    }

    return (
        <>

            <div className="flex space-x-3 p-4 border-b border-silver ">
                <div className="flex w-full h-full">
                    <div>
                        <span className="font-bold text-sm">{date}</span> {' '}
                        <p>
                            {children}
                        </p>
                    </div>
                    <div>
                        <button className="w-full flex justify-end mt-5" onClick={() => deleteItem()}>
                            <Trash size={30} color="#b85151" />
                        </button>
                    </div>
                </div>
            </div>
        </>)
}


