// Dependencies
import React, { FC, ReactElement, createContext } from 'react'

// Interfaces
interface iFormContext {
  onChange(e: any, setState: any): any
  setValue(name: string, value: any, setState: any): any
}

interface iProps {
  children: ReactElement
  initialValues?: any
}

export const FormContext = createContext<iFormContext>({
  onChange: () => null,
  setValue: () => null
})

const FormProvider: FC<iProps> = ({ children }): ReactElement => {
  function onChange(e: any, setState: any): void {
    const {
      target: { name, value }
    } = e

    if (name) {
      setState((prevState: any) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  function setValue(name: string, value: any, setState: any): void {
    setState((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }

  const context = {
    onChange,
    setValue
  }

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}

export default FormProvider
