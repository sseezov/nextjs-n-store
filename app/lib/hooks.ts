'use client'

import { useEffect, useState } from "react"

export const useLocalCart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('n-store-cart')) {
      localStorage.setItem('n-store-cart', '[]')
    } else setCart(JSON.parse(localStorage.getItem('n-store-cart')))
  }, [])

  return [cart, setCart]
}