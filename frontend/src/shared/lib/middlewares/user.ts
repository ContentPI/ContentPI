// Lib
import { getUserData } from '../jwt'

export const isConnected = (isLogged = true, privileges = ['user'], redirectTo = '/') => async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  const user = await getUserData(req.cookies.at)

  if (!user && !isLogged) {
    return next()
  }

  if (user && isLogged) {
    if (privileges.includes('god') && user.privilege === 'god') {
      return next()
    }

    if (privileges.includes('admin') && user.privilege === 'admin') {
      return next()
    }

    if (privileges.includes('editor') && user.privilege === 'editor') {
      return next()
    }

    if (privileges.includes('user') && user.privilege === 'user') {
      return next()
    }

    res.redirect(redirectTo)
  } else {
    res.redirect(redirectTo)
  }
}
