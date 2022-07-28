import React, { ReactNode } from 'react'
import { CycleProvider } from './CyclesContext'

interface IAppProvider {
  children: ReactNode
}

function AppProvider({ children }: IAppProvider) {
  return <CycleProvider>{children}</CycleProvider>
}

export default AppProvider
