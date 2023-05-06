const formElement = document.querySelector('.form1');
const formId = document.getElementById('idForm');
var dataBases = openDatabase("DB", "0.1", "Was wollen", 200000);
if (dataBases) {
    console.log('Соединение с базой данных успешно установлено');
} else {
    console.log('Ошибка соединения с базой данных');
}
dataBases.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS `auto`(id INT PRIMARY KEY , mark TEXT, ser TEXT, address TEXT, naz TEXT, date TEXT, color TEXT )", [], function (result) {
        console.log('Таблица auto успешно создана');
    },
        function (tx, error) {
            console.log('Ошибка при создании таблицы');
        })
});
class dasAuto {
    mySet = new Set();
    myMap = new Map();
    teplates = [];
    constructor(btn1, btn2, btn3, btn4) {
        this.mySet.add('show').add('Delete').add('AddColor').add('shAd');
        let iterator = this.mySet.values();
        this.myMap.set(iterator.next().value, btn1).set(iterator.next().value, btn2).set(iterator.next().value, btn3).set(iterator.next().value, btn4);
        console.log(this.myMap);
    }

    makeElement(type, clas, text, url) {
        let element = document.createElement(type);
        element.classList.add(clas);
        if (url) {
            element.src = url;
            element.alt = text;
        }
        else {
            if (text) { element.textContent = text; }
        }
        return (element)
    }

    addAdd() {
        this.myMap.get('AddColor').addEventListener('click', (e) => {
            e.preventDefault();
            var sel = document.getElementById('sel');
            if (sel.children.length != 0) {
                var idVal = document.getElementById('sel').value;
                var color = document.getElementById('color').value;
                console.log(color);
                console.log(color);
                dataBases.transaction(function (tx) {
                    tx.executeSql("UPDATE  `auto` SET color=? WHERE id=?", [color, idVal], function (result) {
                        console.log('Данные в таблице обновлены');

                    }, function (tx, error) {
                        console.log('Произошла ошибка при обновлении', error);

                    });
                });
            }
            else {
                alert('Нет записей!');
            }
        })
    }

    addDel() {
        this.myMap.get('Delete').addEventListener('click', (e) => {
            e.preventDefault();
            var sel = document.getElementById('sel');
            if (sel.children.length != 0) {
                var idVal = document.getElementById('sel').value;
                console.log(idVal);
                dataBases.transaction(function (tx) {
                    tx.executeSql("DELETE  FROM `auto` WHERE id=?", [idVal], function (tx, result) {
                        console.log('Удалена строчка из таблицы user');
                    }, function () {
                        console.log('Произошла ошибка при удалении');
                    })
                });
                makeSelect();
            } else {
                alert('Нет записей!');
            }
        })
    }
    addTable() {
        console.log(this.myMap.get('show'));
        let Make = this.makeElement;
        this.teplates.push(document.getElementById('tal'));
        let temp = this.teplates[0];
        this.myMap.get('show').addEventListener('click', (e) => {
            e.preventDefault();
            var clone = temp.content.cloneNode(true);
            while (document.getElementById('MT').firstChild) {
                document.getElementById('MT').removeChild(document.getElementById('MT').firstChild);
            }
            document.getElementById('MT').appendChild(clone);
            dataBases.transaction(function (tx) {
                tx.executeSql("SELECT * FROM `auto`", [], function (tx, result) {

                    for (var i = 0; i < result.rows.length; i++) {
                        console.log(result.rows);
                        let resul = result.rows[i];
                        
                        let TableCard = Make("tr", "goodTr");
                        for (let key in resul) {
                            TableCard.appendChild(Make("td", "good", resul[key]));
                        }
                        document.getElementById('MT').appendChild(TableCard);
                        
                    }
                }, function () {
                    console.log('Произошла ошибка при выборке');
                })
            });
        })
    }

    addAddr() {
        this.myMap.get('shAd').addEventListener('click', (e) => {
            e.preventDefault();
            let n = document.getElementById('nz').value;
            while (document.getElementById('adreses').firstChild) {
                document.getElementById('adreses').removeChild(document.getElementById('adreses').firstChild);
            }
            dataBases.transaction(function (tx) {
                tx.executeSql("SELECT address FROM `auto` WHERE naznachenie=?", [n], function (tx, result) {
                    console.log(result.rows, 'fsdf');
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        let adr = document.createElement('b');
                        adr.textContent = (i+1) + '. ' + result.rows[i].address;
                        document.getElementById('adreses').appendChild(adr);
                        document.getElementById('adreses').appendChild(document.createElement('br'));
                    }
                }, function () {
                    console.log('Произошла ошибка при выборке');
                })
            });
        })
    }

}
let btn = document.getElementById('tbl');
const add = document.getElementById('add');
const delBut = document.getElementById('del');
const showC = document.getElementById('show');
const autoKnop = new dasAuto(btn, delBut, add, showC);
// Использование:
autoKnop.addTable();
autoKnop.addDel();
autoKnop.addAdd();
autoKnop.addAddr();
function handleFormSubmit(event) {
    // Просим форму не отправлять данные самостоятельно
    event.preventDefault()
    console.log('Отправка!')
}



let makeSelect = function () {
    
    let select = document.getElementById("sel");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    dataBases.transaction(function (tx) {
        tx.executeSql("SELECT id FROM `auto`", [], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {
                console.log(result.rows);
                let elem = autoKnop.makeElement("option", "goodOption", result.rows[i].id);
                elem.setAttribute('value', result.rows[i].id)
                select.appendChild(elem);
            }
        }, function () {
            console.log('Произошла ошибка при выборке');
        })
    });


}
makeSelect();






function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(formElement);
    let ser = formData.get("ser");
    let mark = formData.get("mark");
    let addr = formData.get("addr");
    let date = formData.get("birthday");
    let naz = formData.get("naz");
    let id = getRandomInt(10000);
    dataBases.transaction(function (tx) {
        tx.executeSql("INSERT INTO `auto` (id, mark, ser, date, naznachenie, address) values(?, ?, ?, ?, ?,?)", [id, mark, ser, date, naz, addr], function (result) {
            console.log('Были добавлены новые данные в таблицу auto');
        }, function (tx, error) {
            console.log('Произошла ошибка при добавлении данных в таблицу user', error);
        });
    });
    document.getElementById('id02').style.display = 'block';
    let table = document.getElementById("MT");
    makeSelect();
    makeTableTr();
    console.log("Форма отправлена");
});



let forma = document.getElementById("sel");


formId.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(formId);
    console.log(formData.get('id'), 'sub')
})




