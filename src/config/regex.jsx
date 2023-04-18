const REGEX = {
  ACCENTED_LETTER_REGEX: /^[a-zA-z0-9]+$/i,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
  CONTAIN_A_LETTER: /.*[a-zA-Z].*/,
  CONTAIN_A_UPPERCASE: /.*[A-Z].*/,
  CONTAIN_A_NUMBER: /.*\d.*/,
  CONTAIN_A_SPECIAL_CHARACTER: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
};

export { REGEX };
