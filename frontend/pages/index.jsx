
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'

const Home = () => {
  const [data, setData] = useState([])
  const [collegeId, setCollegeId] = useState('')
  const [collegeData, setCollegeData] = useState()
  const [newCollege, setNewCollege] = useState({
    name: '',
    totalStudents: '',
    address: '',
    departments: ''
  })
  const [newCollegeResponse, setNewCollegeResponse] = useState();
  const [editCollege, setEditCollege] = useState({
    _id: '',
    name: '',
    totalStudents: '',
    address: '',
    departments: ''
  })
  const [editCollegeResponse, setEditCollegeResponse] = useState();
  const [deleteResponse, setDeleteResponse] = useState();

  const onEditCollege = async () => {
    console.log('editing college', editCollege);
    const departments = editCollege.departments.split(',');
    console.log(departments)
    let body = {
      name: editCollege.name,
      totalStudents: editCollege.totalStudents,
      address: editCollege.address,
      departments: departments
    }
    if (body.totalStudents === "")
      delete body.totalStudents;
    if (body.address === "")
      delete body.address;
    if (body.name === "")
      delete body.name;
    if (body.departments === "")
      delete body.departments;
    const data = await fetch(`${BACKEND_URL}/college/${editCollege._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const res = await data.json()
    console.log(res)
    setEditCollegeResponse(res);
  }

  const onFindCollege = async () => {
    console.log('finding college id');
    let data = await fetch(`${BACKEND_URL}/college/${collegeId}`)
    data = await data.json()
    console.log(data)
    setCollegeData(data)
  }
  const onDeleteCollege = async () => {
    console.log('finding college id');
    let data = await await fetch(`${BACKEND_URL}/college/${collegeId}`, {
      method: 'DELETE'
    })
    data = await data.json()
    console.log(data)
    setDeleteResponse(data)
  }

  const onAddCollege = async () => {
    console.log('adding college', newCollege);
    const departments = newCollege.departments.split(',');
    console.log(departments)
    const data = await fetch(`${BACKEND_URL}/college`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCollege.name,
        totalStudents: newCollege.totalStudents,
        address: newCollege.address,
        departments: departments
      })
    })
    const res = await data.json()
    console.log(res)
    setNewCollegeResponse(res);
  }

  useEffect(() => {
    const fetchFucntion = async () => {
      let data = await fetch(`${BACKEND_URL}/colleges`)
      data = await data.json()
      console.log(data)
      setData(data)
    }
    fetchFucntion()
  }, [])
  return (
    <div className="text-4xl font-sans bg-black flex flex-col items-center px-40 justify-center pt-20">
      <h3 className="text-[200px] text-left text-white font-bold mb-6 ml-3" > ST2 - BEE project</h3 >
      <div className='w-full mt-20'>
        <li className="">
          <div className="md:flex flex-start">
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-full ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <p className="font-medium text-rose-600 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">All College data</p>
                <a href={`${BACKEND_URL}/colleges`} target="_blank" className="font-medium text-rose-600 bg-gray-200 rounded-md px-2 py-1 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">GET:{'  '} /colleges</a>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        College Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Total Students
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Address
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Departments
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        College ID
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {data.map((ele) => {
                      return (<tr>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {ele.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 ">
                          {ele.totalStudents}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0  whitespace-nowrap p-4">
                          {ele.address}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap space-x-2 p-4">
                          {ele.departments.map((ele) => {
                            return (<span>{ele}</span>)
                          })}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {ele._id}
                        </td>
                      </tr>)
                    })}


                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </li>
        <li className="">
          <div className="md:flex flex-start">
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-full ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-rose-600 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">Find College by ID</a>
                <a href={`${BACKEND_URL}/colleges`} target="_blank" className="font-medium text-rose-600 bg-gray-200 rounded-md px-2 py-1 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">GET: /college/:id
                </a>
              </div>

              <div className="flex justify-around w-full">
                <input type="text" onChange={(e) => {
                  setCollegeId(e.target.value)
                }} placeholder="enter college id" autoComplete='id'
                  className="block px-2 w-[800px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <button onClick={onFindCollege} className="w-full py-2 px-4 rounded-sm font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                  Find
                </button>

              </div>
              {collegeData &&
                <pre className='bg-gray-200 mt-4 overflow-x-scroll px-2 py-2 rounded-md'>
                  {JSON.stringify(collegeData, null, 2)}
                </pre>
              }
            </div>
          </div>
        </li>
        <li className="">
          <div className="md:flex flex-start">

            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-full ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-rose-600 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">Add College</a>
                <a href={`${BACKEND_URL}/colleges`} target="_blank" className="font-medium text-rose-600 bg-gray-200 rounded-md px-2 py-1 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">POST: /college
                </a>
              </div>

              <div className="w-full">
                <label >College Name</label>
                <input type="text" onChange={(e) => {
                  setNewCollege((prev) => ({ ...prev, name: e.target.value }))
                }} placeholder="College Name" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >Total Students</label>
                <input type="number" onChange={(e) => {
                  setNewCollege((prev) => ({ ...prev, totalStudents: e.target.value }))
                }} placeholder="Total Students" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >Address</label>
                <input type="text" onChange={(e) => {
                  setNewCollege((prev) => ({ ...prev, address: e.target.value }))
                }} placeholder="Address" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >Departments</label>
                <input type="text" onChange={(e) => {
                  setNewCollege((prev) => ({ ...prev, departments: e.target.value }))
                }} placeholder="Departments eg:- BE,CSE" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <button onClick={onAddCollege} className="w-full py-2 px-4 rounded-sm font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                  Add College
                </button>

              </div>
              {newCollegeResponse &&
                <pre className='bg-gray-200 mt-4 overflow-x-scroll px-2 py-2 rounded-md'>
                  {JSON.stringify(newCollegeResponse, null, 2)}
                </pre>
              }
            </div>
          </div>
        </li>
        <li className="">
          <div className="md:flex flex-start">

            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-full ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-rose-600 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">Edit College</a>
                <a href={`${BACKEND_URL}/colleges`} target="_blank" className="font-medium text-rose-600 bg-gray-200 rounded-md px-2 py-1 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">PATCH: /college/:id
                </a>
              </div>

              <div className="w-full">
                <label >College ID</label>
                <input type="text" onChange={(e) => {
                  setEditCollege((prev) => ({ ...prev, _id: e.target.value }))
                }} placeholder="College Id" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >College Name</label>
                <input type="text" onChange={(e) => {
                  setEditCollege((prev) => ({ ...prev, name: e.target.value }))
                }} placeholder="College Name" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >Total Students</label>
                <input type="number" onChange={(e) => {
                  setEditCollege((prev) => ({ ...prev, totalStudents: e.target.value }))
                }} placeholder="Total Students" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >Address</label>
                <input type="text" onChange={(e) => {
                  setEditCollege((prev) => ({ ...prev, address: e.target.value }))
                }} placeholder="Address" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <label >Departments</label>
                <input type="text" onChange={(e) => {
                  setEditCollege((prev) => ({ ...prev, departments: e.target.value }))
                }} placeholder="Departments eg:- BE,CSE" autoComplete='id'
                  className="block px-2 my-2 w-[400px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <button onClick={onEditCollege} className="w-full py-2 px-4 rounded-sm font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                  Add College
                </button>

              </div>
              {editCollegeResponse &&
                <pre className='bg-gray-200 mt-4 overflow-x-scroll px-2 py-2 rounded-md'>
                  {JSON.stringify(editCollegeResponse, null, 2)}
                </pre>
              }
            </div>
          </div>
        </li>
        <li className="">
          <div className="md:flex flex-start">
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-full ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-rose-600 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">Delete College by ID</a>
                <a href={`${BACKEND_URL}/colleges`} target="_blank" className="font-medium text-rose-600 bg-gray-200 rounded-md px-2 py-1 hover:text-rose-700 focus:text-rose-800 duration-300 transition ease-in-out ">DELETE: /college/:id
                </a>
              </div>

              <div className="flex justify-around w-full">
                <input type="text" onChange={(e) => {
                  setCollegeId(e.target.value)
                }} placeholder="enter college id" autoComplete='id'
                  className="block px-2 w-[800px] py-0 h-[60px] text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                <button onClick={onDeleteCollege} className="w-full py-2 px-4 rounded-sm font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                  Delete
                </button>

              </div>
              {deleteResponse &&
                <pre className='bg-gray-200 mt-4 overflow-x-scroll px-2 py-2 rounded-md'>
                  {JSON.stringify(deleteResponse, null, 2)}
                </pre>
              }
            </div>
          </div>
        </li>
      </div>
    </div >
  )
}

export default Home
