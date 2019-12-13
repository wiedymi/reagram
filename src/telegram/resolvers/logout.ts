import { api } from '../helpers'
import { editPhone } from '../editors'

export const logout = async function(): void {
  localStorage.removeItem('isLogged')
  await api.logOut()

  editPhone()
}
