import { useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { type FormData, FormDataDefaultValues } from './types'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(FormDataDefaultValues)

  function handleFormDataChange(newData: Partial<FormData>) {
    const key = Object.keys(newData)

    if (typeof newData[key] === 'object' && !Array.isArray(newData[key])) {
      setFormData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          ...newData[key],
        },
      }))
      return
    }

    setFormData((prevData) => ({ ...prevData, ...newData }))
  }
  function handleSubmit() {
    console.log('Form Data Submitted:')
    console.log(formData)
  }

  function changeStep(step: number) {
    if (step < 1 || step > 5) return

    setCurrentStep(step)
  }

  return (
    <div className='flex h-screen w-screen flex-col lg:flex-row lg:justify-evenly'>
      <div className='hidden lg:block'>
        <Sidebar currentStep={currentStep} />
      </div>

      <div className='flex grow flex-col lg:p-8'>
        <div className=''>
          <Header step={currentStep} changeStep={changeStep} />
        </div>

        <Form
          step={currentStep}
          changeStep={changeStep}
          formData={formData}
          setFormData={handleFormDataChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default App
