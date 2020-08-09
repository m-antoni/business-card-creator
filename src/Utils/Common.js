// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('firebase:auth');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }

export const getUID = () => {
  return localStorage.getItem('firebase:uid') || null;
}

export const removeUserSession = () => {
  localStorage.removeItem('firebase:auth');
  localStorage.removeItem('firebase:uid');
}

export const setUserSession = (param) => {
  localStorage.setItem('firebase:auth', JSON.stringify(param));
  localStorage.setItem('firebase:uid', param.uid);
}
  

// display current date
export const displayDate = () => {
  const today = new Date();
  var dd = ("0" + today.getDate()).slice(-2)
  var mm = ("0" + (today.getMonth() + 1)).slice(-2)
  var yyyy = today.getFullYear();

  const dateToday = `${mm}-${dd}-${yyyy}`;

  return dateToday;
}


const date = new Date();
// days
const days = [];
for (let day = 1; day <= 31; day++) {
  let dateFormat = { value: day, label: day, name: 'day'};
  days.push(dateFormat);
}
// months
export const numToMonth = (num) => {
    var months = [
        'Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
    ];
    return months[num - 1];
}
// years
const years = [];
for (let year = 1905; year <= date.getFullYear(); year++) {
  let yearFormat = {value: year, label: year, name: 'year'};
  years.push(yearFormat);
}

// is Today 
export const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
};

// random shuffle array
export const randomArrayShuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// set questions to local storage
export const setQuestionsToLocalStorage = questions => {
    localStorage.setItem('questions:data', JSON.stringify(questions));
}

// get questions from local storage
export const getQuestionsFromLocalStorage = () => { 
    let questions = localStorage.getItem('questions:data')
    if(questions) return JSON.parse(questions)
    else return null;
}

// set trivia api token to local storage
export const setTriviaAPIToken = token => {
   localStorage.setItem('trivia_api:token', token);
}

// fetch trivia api token from local storage
export const getTriviaAPIToken = () => {
    return localStorage.getItem('trivia_api:token') || null;
}