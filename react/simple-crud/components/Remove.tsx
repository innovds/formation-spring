import axios from 'axios'
import React from 'react'
import { t0, Task } from '../utils/Types'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'
interface RemoveParam{
    task:Task 
    url:string
    refresh:()=>void
}
const Remove = ({task,url,refresh}:RemoveParam) => {
    const { register, handleSubmit, setValue,reset } = useForm<Task>({
        defaultValues: task,
      })
    const remove = (data: Task) => {
        if (confirm('do you want delete line number =' + data.id + ' ?'))
            axios.delete(url + '/' + data.id).then(() => {
                setTimeout(() => {
                    refresh()
                }, 500)
            })
        // console.log(data)
      }
  return (
    <form onSubmit={handleSubmit(remove)}>
    <input
        type="hidden"
        {...register('id')}
    />
    <input type="submit" className={styles.submit} value="del" />
</form>
  )
}

export default Remove