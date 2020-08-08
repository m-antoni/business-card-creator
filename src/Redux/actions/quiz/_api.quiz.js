import http from '../../../Utils/api.trivia.http';

export const TriviaAPIService = {
    fetchCategories: () => http.get('/api_category.php'),
    fetchQuestions: (formParam) => http.get(`/api.php?${formParam}`)
}
