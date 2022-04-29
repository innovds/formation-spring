import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Remove from '../components/Remove'
import styles from '../styles/Home.module.css'
import { t0, Task } from '../utils/Types'
const url = 'http://localhost:261/tasks'

//************************************* */
const loadData = async () => {
  const { data } = await axios.get(url)
  // console.log(data);
  return {
      props: { row: data as Task[] },
  }
}


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
                           <Remove refresh={reload} task={p} url={url} />
                            </td>
                        </tr>
                    ))}{' '}
                </tbody>
            </table>
    </div>
  )
}

export default Home
