import * as yup from 'yup';
require('../dist/yup-method-phone-slim.cjs');

describe('yup-method-phone-slim validation', () => {
  it('validate empty phone numbers', () => {
    const phoneSchema = yup.string()
      .phone();
    expect(phoneSchema.isValidSync('')).toBe(true);
  });
  it('validate required empty phone numbers', () => {
    const phoneSchema = yup.string()
      .phone()
      .required();
    expect(phoneSchema.isValidSync('')).toBe(false);
  });

  it('validate all types of phone numbers', () => {
    const phoneSchema = yup.string()
      .phone()
      .required();
    expect(phoneSchema.isValidSync('9876543210')).toBe(true);
    expect(phoneSchema.isValidSync('+1-541-754-3010')).toBe(true);
    expect(phoneSchema.isValidSync('+49-89-636-48018')).toBe(true);
    expect(phoneSchema.isValidSync('+55 11 99999-5555')).toBe(true);
    expect(phoneSchema.isValidSync('+593 7 282-3889')).toBe(true);
    expect(phoneSchema.isValidSync('+44 871 222 1156')).toBe(true);
    expect(phoneSchema.isValidSync('+447911123456')).toBe(true);
    expect(phoneSchema.isValidSync('+1 345 9490088')).toBe(true);
    expect(phoneSchema.isValidSync('+1 284 852 5500')).toBe(true);
    expect(phoneSchema.isValidSync('+32 2 702-9200')).toBe(true);
    expect(phoneSchema.isValidSync('+86 21 2230 1000')).toBe(true);
    expect(phoneSchema.isValidSync('+821012345678')).toBe(true);
    expect(phoneSchema.isValidSync('+65 6511 9266')).toBe(true);
  });

  it('validate phone number with IN (India) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+919876543210')).toBe(true);
    expect(phoneSchema.isValidSync('9876543210')).toBe(true);
  });

  it('validate phone number with US (USA) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('(999) 974–2042')).toBe(false);
    expect(phoneSchema.isValidSync('+1-541-754-3010')).toBe(true); // International
    expect(phoneSchema.isValidSync('1-541-754-3010')).toBe(true); // Dialed in the US
    expect(phoneSchema.isValidSync('(212) 345-4567')).toBe(true);
  });

  it('validate phone number with AU (Australia) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('0404 999 999')).toBe(true);
  });

  it('validate phone number with DE (Germany) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('636-48018')).toBe(true); // Local
    expect(phoneSchema.isValidSync('+49-89-636-48018')).toBe(true); // International
    // expect(phoneSchema.isValidSync('19-49-89-636-48018')).toBe(true); // Dialed from France
  });

  it('validate phone number with BR (Brazil) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+55 11 99999-5555')).toBe(true);
  });

  it('validate phone number with EC (Ecuador) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+593 7 282-3889')).toBe(true);
  });

  it('validate phone number with GB (United Kingdom) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+44 871 222 1156')).toBe(true);
  });

  it('validate phone number with GG (Guernsey) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+447911123456')).toBe(true);
  });

  it('validate phone number with KY (Cayman Islands) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+1 345 9490088')).toBe(true);
  });

  it('validate phone number with VG (British Virgin Islands) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+1 284 852 5500')).toBe(true);
  });

  it('validate phone number with BE (Belgium) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+32 2 702-9200')).toBe(true);
  });

  it('validate phone number with CH (China) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+86 21 2230 1000')).toBe(true);
  });

  it('validate phone number with KR (South Korea) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+821012345678')).toBe(true);
  });

  it('validate phone number with SG (Singapore) region', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('+65 6511 9266')).toBe(true);
  });

  it('validate Mexican phone numbers', () => {
    const phoneSchema = yup.string()
      .phone('error')
      .required();
    expect(phoneSchema.isValidSync('(33) 38-15-17-34')).toBe(true);
    expect(phoneSchema.isValidSync('(777) 38.15.17.34')).toBe(true);
    expect(phoneSchema.isValidSync('777-3815.1734')).toBe(true);
    expect(phoneSchema.isValidSync('777.38.15.17.34')).toBe(true);
  });

  it('validate phone number strictly with IN (India) region with custom error message', () => {
    const phoneSchema = yup.string().phone('${path} is invalid').required();
    expect(() => {
      phoneSchema.validateSync('+1 345 9490088xx');
    }).toThrow('is invalid');
  });
});
