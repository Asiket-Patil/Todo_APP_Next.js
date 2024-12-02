import React from 'react'

const Todo = ({id,title,description,mongoId,complete,deleteTodo,completeTodo}) => {
    return (

        <tr class="bg-white border-b text-black">
            <th scope="row" class="px-6 py-4 font-medium ">
                {id+1}
            </th>
            <td class="px-6 py-4">
                {title}
            </td>
            <td class="px-6 py-4">
                {description}
            </td>
            <td class="px-6 py-4">
                {complete?"complete":"pending"}
            </td>
            <td class="px-6 py-4 flex gap-1">
                <button className='py-2 px-2 bg-red-500 text-white' onClick={()=>deleteTodo(mongoId)}>Delete</button>
                <button className='py-2 px-4 bg-green-500 text-white'onClick={()=>completeTodo(mongoId)}>Done</button>
            </td>
           
        </tr>

    )
}

export default Todo
