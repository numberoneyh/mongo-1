import { body } from 'express-validator'

export const userValidator = [
  body('email', "Неверный формат электронной почты").isEmail(),
  body('password', 'Пароль должен быть не мене 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите полное имя мин.букв(3)').isLength({ min: 3 }),
  body('avatar', "Неверная ссылка").optional().isURL()
]