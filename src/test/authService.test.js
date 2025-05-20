import { describe, it, expect, beforeEach } from 'vitest'
import { isAuthenticated, logout } from '../services/authService'

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('isAuthenticated()', () => {
    it('debe devolver false si no hay token', () => {
      expect(isAuthenticated()).toBe(false)
    })

    it('debe devolver true si hay token', () => {
      localStorage.setItem('token', 'mi-token')
      expect(isAuthenticated()).toBe(true)
    })
  })

  describe('logout()', () => {
    it('debe borrar solo el token del localStorage', () => {
      localStorage.setItem('token', 'mi-token')
      logout()
      expect(localStorage.getItem('token')).toBeNull()
    })
  })
})
