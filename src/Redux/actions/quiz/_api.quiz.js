import http from '../../../Utils/api.trivia.http';

export const TriviaAPIService = {
    getTriviaAPIToken: () => http.get('/api_token.php?command=request'),
    resetTriviaAPIToken: (token) => http.get(`/api_token.php?command=reset&token=${token}`),
    getCategories: () => http.get('/api_category.php'),
    getQuestions: (formParam) => http.get(`/api.php?${formParam}`)
}
