function logoff(){
    document.cookie = 'x-access-token=; Max-Age=-99999999; path=/';
    console.log(document.cookie);
    document.location.href = "/admin";
}