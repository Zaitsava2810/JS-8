class Validator {
  constructor(email, domain, date, phone) {
    this.email = email;
    this.domain = domain;
    this.date = date;
    this.phone = phone;
  }
}

class EmailValidator extends Validator {
  constructor(email) {
    super(email);
  }

  isEmail(str) {
    str = this.email;
    if (str.indexOf("@") !== -1) {
      console.log("Email введен корректно!");
    } else {
      console.log("Email введен некорректно!");
    }
  }
}

class DomainAndPhoneAndDateValidator extends Validator {
  constructor(email, domain, date, phone) {
    super(email, domain, date, phone);
  }

  isDomain() {
    if (
      this.domain.indexOf(".com") !== -1 ||
      this.domain.indexOf(".ru") !== -1 ||
      this.domain.indexOf(".by") !== -1
    ) {
      console.log("Домен введен корректно!");
    } else {
      console.log("Введен некорректный домен!");
    }
  }

  isDate() {
    let arr = this.date.split(".");
    let date = new Date(arr[2], arr[1], arr[0]);
    if (
      date.getDate() == arr[0] &&
      date.getMonth() == arr[1] &&
      date.getFullYear() == arr[2]
    ) {
      console.log("Дата введена корректно!");
    } else {
      console.log("Введена некорректная дата!");
    }
  }

  isPhone() {
    if (typeof this.phone == "number") {
      console.log("Телефон введен правильно!");
    } else {
      console.log("Некорректно набран номер!");
    }
  }
}

// User Marina
let userMarina = new DomainAndPhoneAndDateValidator(
  "marina555@mail.ru",
  "https://vk.com/marinka555",
  "02.11.2003",
  375441234456
);

let emailMarina = new EmailValidator(userMarina.email);

console.log(emailMarina);
console.log(userMarina);

emailMarina.isEmail();
userMarina.isDomain();
userMarina.isDate();
userMarina.isPhone();

// User Ivan
let userIvan = new DomainAndPhoneAndDateValidator(
  "vankalol/yandex.by",
  "https://vk.net/vankalol777",
  "4.12.2000",
  375298887456
);
let emailIvan = new EmailValidator(userIvan.email);

console.log(emailIvan);
console.log(userIvan);

emailIvan.isEmail();
userIvan.isDomain();
userIvan.isDate();
userIvan.isPhone();

// 8 пунктов с this
// №1. this равен глобальному объекту
console.log(this);

// №2. this внутри стрелочной функции
const person = {
  name: "Петя",
  sayHello() {
    console.log("Привет");
    let say = () => console.log(`Меня зовут ${this.name}`);
    say();
  },
};
person.sayHello();

// №3. функция вызвана как конструктор
function student(name, age) {
  this.name = name;
  this.age = age;
}

let dima = new student("Дима", 20);
console.log(dima.name);
console.log(dima.age);

// №4. функция создана с помощью метода bind
const cat = {
  name: "Барсик",
};

function infoCat(age, color) {
  console.log(
    `Моего кота зовут ${this.name}, ему ${age} лет и он ${color} цвета`
  );
}
infoCat.bind(cat, 10, "белого")();

// №5. функция передана куда-то в качестве колбэка или обработчика
const elements = document.querySelectorAll("a");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("mouseover", addTextHref);
}

function addTextHref() {
  this.innerHTML = this.innerHTML + `(${this.href})`;
}

// №6. функция вызвана с помощью метода apply или call
function logInfo(job, phone) {
  console.log(
    `Мое имя ${this.name}, фамилия ${this.surname}, я работаю ${job}, мой телефон ${phone}`
  );
}

const fedor = {
  name: "Федор",
  surname: "Петров",
};

logInfo.call(fedor, "в строительной компании", "375441112233");
logInfo.apply(fedor, ["на мойке", "375256669988"]);

// №7.  функция получена как значение свойства объекта и сразу же вызвана
const car = {
  model: "bmv",
  color: "green",
  modelCar() {
    return this.model;
  },
  colorCar() {
    return this.color;
  },
};
console.log(car.modelCar());
console.log(car.colorCar());

// №8. Код выполняется в строгом режиме
function HelloThis() {
  "use strict";
  return this;
}
console.log(HelloThis());
