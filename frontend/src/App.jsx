import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { useFormik } from 'formik'
import { Reminder } from './components/Reminder'

function App() {

  const [updated, setUpdated] = useState(false)

  const [data, setData] = useState([])
  const Formik = useFormik({
    onSubmit: async (values, form) => {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/reminder`, {
        description: values.description,
        date: values.date,
      })

      if (response.status === 201) {
        getData()
      }

      form.setFieldValue('description', '')
      form.setFieldValue('date', '')
    },

    initialValues: {
      description: '',
      date: '',
      filterByDate: ''
    }
  })


  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/api/reminder`, {
    })
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [updated])


  async function filterByDate() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/api/reminder/${Formik.values.filterByDate}`, {
    })
    setData(res.data)
  }

  async function deleteByDate() {
    await axios.delete(`${import.meta.env.VITE_API_HOST}/api/reminder/deleteBy/${Formik.values.filterByDate}`, {
    })
    Formik.values.filterByDate = ''
    getData()
  }

  return (
    <>
      <main className="h-full w-full">
        <div className="flex flex-col justify-center items-center bg-black mb-5">
          <h1>Crie seu reminder</h1>
          <form className="flex flex-col w-4/5 p-5 items-center justify-center  mt-5" onSubmit={Formik.handleSubmit} autoComplete="off">
            <textarea
              className="p-4 w-3/5 rounded-md  bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-300"
              type="text"
              id="description"
              name="description"
              placeholder="Digite a descrição de seu reminder"
              value={Formik.values.description}
              onChange={Formik.handleChange}
              disabled={Formik.isSubmitting}
              required
            />
            <input
              className="p-4 w-3/5 rounded-md mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-300"
              type="date"
              id="date"
              name="date"
              placeholder="Digite a data de seu reminder"
              value={Formik.values.date}
              onChange={Formik.handleChange}
              disabled={Formik.isSubmitting}
              required
            />
            <button
              type="submit"
              className="mt-6 w-3/5 rounded-md p-4 text-white flex items-center justify-center font-semibold bg-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-lightPurple focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Criar um novo reminder
            </button>
          </form>
          <div className="flex flex-col  items-center w-4/5 justify-center mb-5">
            <h2 className="text-emerald-300 font-semibold text-3xl">
              Ou
            </h2>
            <input
              className="p-4 w-3/5 rounded-md mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-300"
              type="date"
              id="filterByDate"
              name="filterByDate"
              placeholder="Digite a data de seu reminder"
              value={Formik.values.filterByDate}
              onChange={Formik.handleChange}
              disabled={Formik.isSubmitting}
              required
            />
            <div className="flex gap-5 w-full justify-center">
              <button
                className="mt-6 w-[100px] rounded-md p-4 text-white flex items-center justify-center font-semibold bg-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-lightPurple focus:ring-offset-2 focus:ring-offset-zinc-900"
                onClick={filterByDate}
              >
                Filtrar
              </button>
              <button
                className="mt-6 w-[100px] rounded-md p-4 text-white flex items-center justify-center font-semibold bg-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-lightPurple focus:ring-offset-2 focus:ring-offset-zinc-900"
                onClick={deleteByDate}
              >
                Deletar
              </button>
            </div>
          </div>
        </div >

        <div>
          {data.length > 0 ? data.map(reminder => (
            <Reminder key={reminder.id} id={reminder.id} date={reminder.date} updated={updated} setUpdated={setUpdated}>{reminder.description} </Reminder>
          )) : (
            <h2 className="text-3xl font-semibold text-center">
              Crie seu primeiro reminder
            </h2>
          )}
        </div>

      </main >
    </>
  )
}

export default App
