import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../styles/Home.module.css'
const url = 'http://localhost:261/tasks'
interface Task{
  id:number;
	taskName:string;
}
//************************************* */
const loadData = async () => {
  const { data } = await axios.get(url)
  // console.log(data);
  return {
      props: { row: data as Task[] },
  }
}
const t0:Task={id:-1,taskName:''}

export const getStaticProps = loadData
const Home: NextPage = (props:any) => {
  const [task,setTask]= useState(props.row)
  const reload = () => {
    console.log('reload ....')
    loadData().then(
        (d: any) => {
          setTask(d.props.row)
        },
        (err: any) => {
            console.log(err)
        }
    )
}
const { register, handleSubmit, setValue,reset } = useForm<Task>({
  defaultValues: t0,
})

const save = (data: Task) => {
  axios.post(url, data).then((response) => {
      setTimeout(() => {
          reload()
      }, 500)
      setTimeout(() => {
          reset()
      }, 1000)
  })
}
const remove = (data: Task) => {
  if (confirm('do you want delete line number =' + data.id + ' ?'))
      axios.delete(url + '/' + data.id).then(() => {
          setTimeout(() => {
              reload()
          }, 500)
      })
  // console.log(data)
}
  return (
    <div>
    <h1>EXEMPLE CRUD</h1>  
    <form onSubmit={handleSubmit(save)}>
                <input
                    type="hidden"
                    className={styles.input}
                    placeholder="name"
                    {...register('id')}
                />
                <input
                    type="text"
                    className={styles.input}
                    placeholder="name"
                    {...register('taskName')}
                />
                <input type="submit" className={styles.submit} value="save" />
            </form>
            <button className={styles.submit} onClick={()=>reset(t0)}>init</button>
    <table className={styles.myTab}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>edit</th>
                        <th>del</th>
                    </tr>
                </thead>
                <tbody>
                    {' '}
                    {task.map((p: Task) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.taskName}</td>
                            <td>
                                <button
                                    className={styles.submit}
                                    onClick={() => {
                                       reset(p)
                                    }}
                                >
                                    edit
                                </button>
                            </td>
                            <td>
                            <form onSubmit={handleSubmit(remove)}>
                <input
                    type="hidden"
                    className={styles.input}
                    {...register('id')}
                />
                <input type="submit" className={styles.submit} value="del" />
            </form>
                            </td>
                        </tr>
                    ))}{' '}
                </tbody>
            </table>
    </div>
  )
}

export default Home
