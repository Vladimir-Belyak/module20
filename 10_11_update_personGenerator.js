const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Ирина",
            "id_4": "Алла",
            "id_5": "Дарья",
            "id_6": "Юлия",
            "id_7": "Татьяна",
            "id_8": "Варвара",
            "id_9": "Екатерина",
            "id_10": "Анастасия"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomFirstName: function(gender) { 
    
        return (gender === 'Мужчина')?this.randomValue(this.firstNameMaleJson):this.randomValue(this.firstNameFemaleJson);
/*         if (gender === 'Мужчина'){
            return this.randomValue(this.firstNameMaleJson);
        } else {
            return this.randomValue(this.firstNameFemaleJson);
        } */

    },

    randomSurname: function(gender) {
        
        let firstName = this.randomValue(this.surnameJson);
        return (gender === 'Мужчина')?firstName:firstName+'а';
/*         if (gender === 'Мужчина'){
            return firstName;
        } else {
            return firstName+'а';
        } */
    },

    randomGender: function(maleParse, femaleParse) {
        let randomIntGender = this.randomIntNumber();
        return randomIntGender?maleParse:femaleParse;

    },

    randomBirthYear: function() {
        var year = new Date().getFullYear();
        return this.randomIntNumber(year, year-100);

    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender(this.GENDER_MALE, this.GENDER_FEMALE);       
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.SurName = this.randomSurname(this.person.gender);
        this.person.BirthYear = this.randomBirthYear();
        return this.person;
    }
};