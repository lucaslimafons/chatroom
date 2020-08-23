window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = 'http://localhost:3000/api/';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.axios.interceptors.request.use(function (config) {
    if (!authService.isLoggedIn()) {
        console.log('Usuário não está logado');
        return config;
    }

    const user = authService.getUser();
    config.headers = {
      'Authorization': 'Bearer ' + user.token,
      Accept: 'application/json'
    };

    return config;
}, function (error) {
    return Promise.reject(error);
});

window.axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        authService.logout();
        window.location.href = '/';
        return;
    }

    return Promise.reject(error)
})

Vue.use(window.vuelidate.default);
