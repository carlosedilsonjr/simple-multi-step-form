import { useState } from 'react'
import type { FormData } from '../types'

interface PersonalInfoFormProps {
  formData: FormData
  setFormData: (data: Partial<FormData>) => void
  nextStep: (step: number) => void
}

const emptyErrors = {
  fullName: '',
  email: '',
  phone: '',
  dateBirth: '',
}

export function PersonalInfoForm({ formData, setFormData, nextStep }: PersonalInfoFormProps) {
  const [errors, setErrors] = useState(emptyErrors)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors(emptyErrors)
    const { name, value } = e.target
    setFormData({ [name]: value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formData.fullName) setErrors((prev) => ({ ...prev, fullName: 'Full name is required' }))
    if (!formData.email) setErrors((prev) => ({ ...prev, email: 'Email is required' }))
    if (!formData.phone) setErrors((prev) => ({ ...prev, phone: 'Phone is required' }))
    if (!formData.dateBirth) setErrors((prev) => ({ ...prev, dateBirth: 'Birth date is required' }))

    if (!formData.fullName || !formData.email || !formData.phone || !formData.dateBirth) return

    nextStep(2)
  }

  return (
    <form onSubmit={handleSubmit} className='mt-8 flex h-full flex-col justify-between lg:h-fit'>
      <h1 className='font-bold text-lg lg:mb-8'>Personal Information</h1>

      <div className='flex w-full flex-col items-start gap-1 px-4'>
        <label htmlFor='fullName' className='text-sm'>
          Full name
        </label>
        <input
          type='text'
          name='fullName'
          value={formData.fullName || ''}
          onChange={handleChange}
          className='h-9 w-full rounded border shadow lg:mb-6'
        />
        {errors.fullName && <p className='text-red-500 text-xs'>{errors.fullName}</p>}

        <label htmlFor='email' className='text-sm'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={formData.email || ''}
          onChange={handleChange}
          className='h-9 w-full rounded border shadow lg:mb-6'
        />
        {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}

        <label htmlFor='phone' className='text-sm'>
          Phone
        </label>
        <input
          type='tel'
          name='phone'
          value={formData.phone || ''}
          onChange={handleChange}
          className='h-9 w-full rounded border shadow lg:mb-6'
        />
        {errors.phone && <p className='text-red-500 text-xs'>{errors.phone}</p>}

        <label htmlFor='dateBirth' className='text-sm'>
          Date of Birth
        </label>
        <input
          type='date'
          name='dateBirth'
          value={formData.dateBirth || ''}
          onChange={handleChange}
          className='h-9 w-full rounded border shadow lg:mb-6'
        />
        {errors.dateBirth && <p className='text-red-500 text-xs'>{errors.dateBirth}</p>}
      </div>

      <button type='submit' className='mt-4 mb-10 w-[90%] self-center rounded-full bg-green-500 py-2 text-white'>
        Next
      </button>
    </form>
  )
}
