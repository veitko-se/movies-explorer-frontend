const NAME_REGEXP = /^[a-zA-Zа-яА-Я\sё-]+$/;
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const validateName = (name) => {
  if (name !== undefined) {
    if (name.length === 0) {
      return {
        error: 'Это обязательное поле',
        activeButton: false,
      };
    } else if (NAME_REGEXP.test(name.toLowerCase())) {
      return {
        error: '',
        activeButton: true,
      };
    } else if (!NAME_REGEXP.test(name.toLowerCase())) {
      return {
        error:
          'Имя должно содержать только латиницу, кириллицу, пробел или дефис',
        activeButton: false,
      };
    }
  } else if (name === undefined) {
    return {
      error: '',
      activeButton: false,
    };
  }
};

export const validateEmail = (email) => {
  if (email !== undefined) {
    if (email.length === 0) {
      return {
        error: 'Это обязательное поле',
        activeButton: false,
      };
    } else if (EMAIL_REGEXP.test(email.toLowerCase())) {
      return {
        error: '',
        activeButton: true,
      };
    } else if (!EMAIL_REGEXP.test(email.toLowerCase())) {
      return {
        error: 'Введенный текст не соответствует шаблону электронной почты',
        activeButton: false,
      };
    }
  } else if (email === undefined) {
    return {
      error: '',
      activeButton: false,
    };
  }
};

export const validateSearch = (searchText) => {
  if (searchText) {
    return {
      error: '',
      activeButton: true,
    };
  } else if (!searchText) {
    return {
      error: 'Нужно ввести ключевое слово',
      activeButton: false,
    };
  }
};
