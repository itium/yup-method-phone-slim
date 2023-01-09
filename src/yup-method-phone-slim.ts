import * as yup from 'yup'
import gPhoneNumber from 'google-libphonenumber'

const phoneUtil = gPhoneNumber.PhoneNumberUtil.getInstance()

declare module 'yup' {

  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param {String} [errorMessage=''] The error message to return if the validation fails.
     * @param {Boolean} [strict=false] How strictly should it check.
     * @param {String} [countryCode=MX] The country code to check against.
     */
    phone(
      errorMessage?: string,
      strict?: boolean,
      countryCode?: string,
    ): StringSchema;
  }
}

const YUP_PHONE_METHOD = 'phone'
const CLDR_REGION_CODE_SIZE = 2

const isValidCountryCode = (countryCode: string): boolean =>
  countryCode.length === CLDR_REGION_CODE_SIZE

yup.addMethod<yup.StringSchema>(yup.string, YUP_PHONE_METHOD, function (
  errorMessage = '',
  strict = false,
  countryCode?: string,
) {
  countryCode = (countryCode === undefined) ? '' : countryCode

  const errMsg =
    errorMessage
      ? errorMessage
      : isValidCountryCode(countryCode)
        ? `\${path} must be a valid phone number for region ${countryCode}`
        : '${path} must be a valid phone number.'

  return this.test(YUP_PHONE_METHOD, errMsg, (value?: string) => {
    countryCode = (countryCode === undefined) ? '' : countryCode
    value = (value === undefined) ? '' : value

    if (value.trim() === '')
      return true

    if (!isValidCountryCode(countryCode)) {
      countryCode = 'MX'
      strict = false
    }

    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(value, countryCode)

      if (!phoneUtil.isPossibleNumber(phoneNumber)) {
        return false
      }

      const regionCodeFromPhoneNumber = phoneUtil.getRegionCodeForNumber(
        phoneNumber
      )

      /* check if the countryCode provided should be used as
       default country code or strictly followed
     */
      return strict
        ? phoneUtil.isValidNumberForRegion(phoneNumber, countryCode)
        : phoneUtil.isValidNumberForRegion(
          phoneNumber,
          regionCodeFromPhoneNumber
        )
    } catch {
      return false
    }
  })
})
