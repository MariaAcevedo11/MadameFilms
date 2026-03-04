// External imports
import { useUserStore } from '@/stores/userstore'

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface'

export class UserService {

  static login(email: string, password: string): UserInterface | null {
    const store = useUserStore()

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    const user = store.users.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail &&
        u.password === normalizedPassword
    )

    if (!user) return null

    localStorage.setItem('loggedUser', JSON.stringify(user))

    return user
  }

  static getLoggedUser(): UserInterface | null {
    const user = localStorage.getItem('loggedUser')
    return user ? JSON.parse(user) : null
  }

  static logout(): void {
    localStorage.removeItem('loggedUser')
  }

  static isAdmin(): boolean {
    const user = this.getLoggedUser()
    return user?.type === 'admin'
  }
}