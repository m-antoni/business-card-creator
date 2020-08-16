import React from 'react';
import { SwalSuccess } from './SweetAlert';

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
export const setQuestionsToLocalStorage = (questions) => {

  questions.map((question, i) => {
      let incorrect_answers = question.incorrect_answers
      incorrect_answers.push(question.correct_answer)
      let combine_answers = randomArrayShuffle(incorrect_answers);
      
      question['incorrect_answers'] = combine_answers;
  })

  localStorage.setItem('questions:data', JSON.stringify(questions));
  localStorage.setItem('current:question', JSON.stringify(questions[0]));
  localStorage.setItem('quiz:index', 0);
  localStorage.setItem('quiz:start', true);
}

// set to another question
export const setAnotherQuestionToLocalStorage = (index) => {
    let questions = getQuestionsFromLocalStorage();
    localStorage.setItem('current:question', JSON.stringify(questions[index]));
    localStorage.setItem('quiz:index', index);
}



// get the quiz start
export const getQuizStart = () => {
  return JSON.parse(localStorage.getItem('quiz:start')) || localStorage.setItem('quiz:start', false);
}

// get questions from local storage
export const getQuestionsFromLocalStorage = () => { 
    let questions = localStorage.getItem('questions:data')
    if(questions) return JSON.parse(questions)
    else return null;
}

export const getQuestionIndex = () => {
    let index = localStorage.getItem('quiz:index');
    return JSON.parse(index) || null;
}

// set trivia api token to local storage
export const setTriviaTokenToLocalStorage = token => {
   localStorage.setItem('trivia_api:token', token);
}

// fetch trivia api token from local storage
export const getTriviaTokenFromLocalStorage = () => {
    return localStorage.getItem('trivia_api:token') || null;
}

// get current question
export const getCurrentQuestionFromLocalStorage = () => {
  let current = localStorage.getItem('current:question');
  if(current) return JSON.parse(current)
  else return null;
}

// decode string with HTML entities
export const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
