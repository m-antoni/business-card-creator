import http from '../../../Utils/api.trivia.http';

export const TriviaAPIService = {
    fetchTriviaAPIToken: () => http.get('/api_token.php?command=request'),
    resetTriviaAPIToken: (token) => http.get(`/api_token.php?command=reset&token=${token}`),
    fetchCategories: () => http.get('/api_category.php'),
    fetchQuestions: (formParam) => http.get(`/api.php?${formParam}`)
}
