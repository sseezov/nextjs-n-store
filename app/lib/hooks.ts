'use client'

import { useEffect, useState } from "react"
import { CartItem } from "./definitions"

export const useLocalCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    if (!localStorage.getItem('n-store-cart')) {
      localStorage.setItem('n-store-cart', '[]')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    } else setCart(JSON.parse(localStorage.getItem('n-store-cart') as string))
  }, [])

  return [cart, setCart] as const;
}