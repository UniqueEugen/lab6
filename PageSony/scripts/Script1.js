
const formElement = document.querySelector('.form1');
let catalogData = [
    {
        surname:0,
        name:0,
        secname:0,
        sex:0,
        birth:0,
        tel:0,
        kol:0,
        summa:0,
        product:0,
        ot:0,
        recl:0
    }
]
console.log(catalogData);
function handleFormSubmit(event) {
    // Просим форму не отправлять данные самостоятельно
    event.preventDefault()
    console.log('Отправка!')
}
console.log(formElement);
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(formElement);
    catalogData[catalogData.length] = JSON.parse(JSON.stringify(catalogData[0]));
    console.log(catalogData);
    catalogData[catalogData.length - 1].name = formData.get("name");
    catalogData[catalogData.length - 1].surname = formData.get("surname");
    catalogData[catalogData.length - 1].secname = formData.get("secname");
    catalogData[catalogData.length - 1].sex = formData.get("sex");
    catalogData[catalogData.length - 1].birth = formData.get("birthday");
    catalogData[catalogData.length - 1].tel = formData.get("telephone");
    catalogData[catalogData.length - 1].kol = formData.get("kol");
    catalogData[catalogData.length - 1].summa = formData.get("summa");
    catalogData[catalogData.length - 1].product = formData.get("products");
    catalogData[catalogData.length - 1].ot = formData.get("ot");
    catalogData[catalogData.length - 1].recl = formData.get("recl");
    console.log(catalogData);
    console.log("Форма отправлена");
});
