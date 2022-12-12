import { ref } from 'vue'
import { isValidPhoneNumber } from 'libphonenumber-js'

export function useValidate() {
  interface ValidatorResponse {
    hasErrors: boolean
    message: string
  }

  const hasErrors = ref<boolean>(false)
  const errors = ref<Record<string, string>>({})

  function validateLetters(value: string, message: string): ValidatorResponse {
    const regex = /^[а-яА-Яa-zA-Z]+$/
    return value.length && !regex.test(value)
      ? { hasErrors: true, message }
      : { hasErrors: false, message: '' }
  }

  function validatePhone(phone: string, message: string): ValidatorResponse {
    return phone.length && !isValidPhoneNumber(phone, 'RU')
      ? { hasErrors: true, message }
      : { hasErrors: false, message: '' }
  }

  function validateRequired(
    value: string | File,
    message: string
  ): ValidatorResponse {
    if (value instanceof File) {
      if (value.size < 1) {
        return { hasErrors: true, message }
      }
      return { hasErrors: false, message: '' }
    }

    return !value.length
      ? { hasErrors: true, message }
      : { hasErrors: false, message: '' }
  }

  function validateImage(
    value: string | File,
    message: string
  ): ValidatorResponse {
    if (value instanceof File) {
      if (value.type === 'image/jpeg' || value.type === 'image/png') {
        return { hasErrors: false, message: '' }
      }
      return { hasErrors: true, message }
    }
    return { hasErrors: false, message: '' }
  }

  function validateEmail(value: string, message: string): ValidatorResponse {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    return value.length && !regex.test(value)
      ? { hasErrors: true, message }
      : { hasErrors: false, message: '' }
  }

  function isDate(dateStr: string): boolean {
    return Number.isNaN(new Date(dateStr).getDate())
  }

  function validateDate(value: string, message: string): ValidatorResponse {
    if (!value.length) {
      return { hasErrors: false, message: '' }
    }
    if (isDate(value)) {
      return { hasErrors: true, message }
    }
    const date = new Date(value)
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
      return { hasErrors: true, message: 'Неверно указан год или месяц' }
    }
    return { hasErrors: false, message: '' }
  }

  function validationType(rule: Array<string>, value: string | File) {
    let response = {} as ValidatorResponse
    const ruleName: string = rule[0]
    const message = rule[1]
    switch (ruleName) {
      case 'image':
        response = validateImage(value, message)
        break
      case 'date':
        response = validateDate(String(value), message)
        break
      case 'email':
        response = validateEmail(String(value), message)
        break
      case 'phone':
        response = validatePhone(String(value), message)
        break
      case 'letters':
        response = validateLetters(String(value), message)
        break
      case 'required':
        response = validateRequired(value, message)
        break
      default:
    }
    return response
  }

  function validate(
    fields: Record<string, string | File>,
    rules: Record<string, Array<Array<string>>>
  ): boolean {
    hasErrors.value = false
    errors.value = {}
    const rulesArray = Object.entries(rules)
    for (let i = 0; i < rulesArray.length; i++) {
      const fieldName = rulesArray[i][0]
      const value = fields[fieldName] ? fields[fieldName] : ''
      const fieldRules = rulesArray[i][1]
      for (let j = 0; j < fieldRules.length; j++) {
        const valid = validationType(fieldRules[j], value)
        if (valid.hasErrors) {
          hasErrors.value = true
          errors.value[fieldName] = valid.message
        }
      }
    }
    if (hasErrors.value) {
      return false
    }
    return true
  }

  return { errors, validate }
}
