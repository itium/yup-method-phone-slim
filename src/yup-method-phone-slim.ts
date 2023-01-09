import * as yup from 'yup'

declare module 'yup' {

  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param {String} [errorMessage=''] The error message to return if the validation fails.
     */
    phone(
      errorMessage?: string,
    ): StringSchema;
  }
}

const YUP_PHONE_METHOD = 'phone'

yup.addMethod<yup.StringSchema>(yup.string, YUP_PHONE_METHOD, function (
  errorMessage
) {

  const errMsg =
    errorMessage
      ? errorMessage
      : '${path} must be a valid phone number.'

  return this.test(YUP_PHONE_METHOD, errMsg, (value?: string) => {
    const re = /^\+?\d{0,4}[-.\s]*\(?\d{0,3}\)?([-.\s]*\d{1,4}){2,3}[-.\s]*\d{1,9}$/;

    value = value ?? ''

    if (value.trim() === '')
      return true

    return re.test(value);
  })
})
