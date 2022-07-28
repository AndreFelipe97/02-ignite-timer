import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Cycle } from '../pages/Home/models/Cycle'
import { NewCycleFormData } from '../pages/Home/models/NewCycleFormData'

interface CycleContextData {
  cycles: Array<Cycle>
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  addNewCycles: (data: NewCycleFormData) => void
  interruptCycle: () => void
}

interface CycleProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextData)

export function CycleProvider({ children }: CycleProviderProps) {
  const [cycles, setCycles] = useState<Array<Cycle>>([])
  const [activeCycle] = useState<Cycle | undefined>(undefined)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const markCurrentCycleAsFinished = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }, [])

  const addNewCycles = useCallback((data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }, [])

  const interruptCycle = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }, [])

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        addNewCycles,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
