const formElement = document.querySelector('.form1');
const formId = document.getElementById('idForm');
var dataBases = openDatabase("DB", "0.1", "Was wollen", 200000);
if (dataBases) {
    console.log('Соединение с базой данных успешно установлено');
} else {
    console.log('Ошибка соединения с базой данных');
}
/*dataBases.transaction(function (tx) {
    tx.executeSql("DROP TABLE `auto`", [], function (result) {
        console.log('Таблица auto успешно удалена');
    },
        function (tx, error) {
            console.log('Ошибка при удалении таблицы');
        })
});*/
dataBases.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS `auto`(id INT PRIMARY KEY , mark TEXT, ser TEXT, address TEXT, naznachenie TEXT, date DATE)", [], function (result) {
        console.log('Таблица auto успешно создана');
    },
        function (tx, error) {
            console.log('Ошибка при создании таблицы');
        })
});
let makeElement =function(type, clas, text, url) {
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

let btn = document.getElementById('tbl');
const add = document.getElementById('add');
const delBut = document.getElementById('del');
const showC = document.getElementById('show');
function handleFormSubmit(event) {
    // Просим форму не отправлять данные самостоятельно
    event.preventDefault()
    console.log('Отправка!')
}










function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}




let forma = document.getElementById("sel");


formId.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(formId);
    console.log(formData.get('id'), 'sub')
})



let newSt = new Set();
class auto {
    mySet1 = new Set();
    myMap1 = new Map();
    constructor(id, mark, ser, addr, naz, date) {
        this.mySet1.add('id').add('mark').add('ser').add('addr').add('naz').add('date');
        let iterator = this.mySet1.values();
        this.myMap1.set(iterator.next().value, id).set(iterator.next().value, mark).set(iterator.next().value, ser).set(iterator.next().value, addr).set(iterator.next().value, naz).set(iterator.next().value, date);
        console.log(this.myMap1);
    }

    addDop(dop, dopVal) {
        this.mySet1.add(dop);
        this.myMap1.set(dop, dopVal);
    }

    insert() {
        let td = Mustache.render(temp, {
            id: this.myMap1.get('id'),
            mark: this.myMap1.get('mark'),
            ser: this.myMap1.get('ser'),
            addr: this.myMap1.get('addr'),
            naz: this.myMap1.get('naz'),
            date: this.myMap1.get('date'),
        });
        let tr = makeElement('tr', 'good-tr');
        tr.innerHTML = td;
        let arr = Array.from(newSt);
        for (let i = 0; i < arr.length; i++) {
            if (this.mySet1.has(arr[i])) {
                tr.appendChild(makeElement("td", "good", this.myMap1.get(arr[i])));
            } else {
                tr.appendChild(makeElement("td", "good"));
            }
        }
        return tr;
    }
    insAdr(naz) {
        console.log(this.myMap1);
        if (this.myMap1.get('naz') == naz) {
            return (this.myMap1.get('addr'));
        }
        else { return 'no'; }
    }

    addCol(par, val, idV) {
        this.myMap1.set(par, val);
        this.mySet1.add(par);
        let strU = "UPDATE  `auto` SET " + par;
        if (!newSt.has(par)) {
            newSt.add(par);
            let str = "ALTER TABLE `auto` ADD " + par + " TEXT DEFAULT '' ";
            dataBases.transaction(function (tx) {
                tx.executeSql(str, [], function (tx, result) {
                    console.log('success');
                }, function (tx, err) {
                    console.log('Произошла ошибка при выборке', err);
                })

            });
        }
        dataBases.transaction(function (tx) {
            tx.executeSql(strU + "=? WHERE id=?", [val, idV], function (result) {
                console.log('Данные в таблице обновлены');

            }, function (tx, error) {
                console.log('Произошла ошибка', error);

            });
        });


    }


    get showId() {
        return this.myMap1.get('id');
    }

    delAuto() {
        let id = this.myMap1.get('id')
        dataBases.transaction(function (tx) {
            tx.executeSql("DELETE  FROM `auto` WHERE id=?", [id], function (tx, result) {
                console.log('Удалена строчка из таблицы user');
            }, function () {
                console.log('Произошла ошибка при удалении');
            })
        });
    }
}

let mas = [];
let makeSelect = function () {
    let select = document.getElementById("sel");
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    for (var i = 0; i < mas.length; i++) {
        let elem = makeElement("option", "goodOption", mas[i].showId);
        elem.setAttribute('value', mas[i].showId)
        select.appendChild(elem);
    }
}

dataBases.transaction(function (tx) {
    tx.executeSql("SELECT * FROM `auto`", [], function (tx, result) {

        for (var i = 0; i < result.rows.length; i++) {
            console.log(result.rows);
            let resul = result.rows[i];
            mas.push(new auto(result.rows[i].id, result.rows[i].mark, result.rows[i].ser, result.rows[i].address, result.rows[i].naznachenie, result.rows[i].date));
            let cc = 0;
            console.log(resul);
            for (let key in result.rows[i]) {
                console.log(cc);
                if (cc > 5) {
                    console.log(key);
                    console.log(resul[key])
                    mas[mas.length - 1].addDop(key, resul[key]);
                    newSt.add(key);
                }
                cc++;
            }
            console.log(mas);
            makeSelect();
            
        }
    }, function () {
        console.log('Произошла ошибка при выборке');
    })

});

console.log(mas);


showC.addEventListener('click', (e) => {
    e.preventDefault();
    let n = document.getElementById('nz').value;
    console.log(n);
    while (document.getElementById('adreses').firstChild) {
        document.getElementById('adreses').removeChild(document.getElementById('adreses').firstChild);
    }
    let counter = 1;
    let st = new Set();
    for (var i = 0; i < mas.length; i++) {
        
        let gg = mas[i].insAdr(n);
        
        console.log(gg, 'df');
        if (gg != 'no') {
            st.add(gg);
            console.log(gg);
            
        }
    }
    let adrs = Array.from(st);
    for (let i = 0; i < adrs.length; i++) {
        let adr = document.createElement('b');
        adr.textContent = counter + '. ' + adrs[i];
        document.getElementById('adreses').appendChild(adr);
        document.getElementById('adreses').appendChild(document.createElement('br'));
        counter++;
    }
        
})

    add.addEventListener('click', (e) => {
        e.preventDefault();
        var sel = document.getElementById('sel');
        if (sel.children.length != 0) {
            var idVal = document.getElementById('sel').value;
            var par = document.getElementById('par').value;
            var val = document.getElementById('valla').value;
            console.log(par);
            console.log(val);
            for (let i = 0; i < mas.length; i++) {
                console.log('Я зашел');
                if (mas[i].showId == idVal) {
                    
                    mas[i].addCol(par, val, idVal);
                    console.log(mas[i]);
                    return;
                }
            }
        }
        else {
            alert('Нет записей!');
        }
    })

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(formElement);
    let ser = formData.get("ser");
    let mark = formData.get("mark");
    let addr = formData.get("addr");
    let date = formData.get("birthday");
    let naz = formData.get("naz");
    let id = getRandomInt(10000);
    mas.push(new auto(id, mark, ser, addr, naz, date));
    dataBases.transaction(function (tx) {
        tx.executeSql("INSERT INTO `auto` (id, mark, ser, date, naznachenie, address) values(?, ?, ?, ?, ?,?)", [id, mark, ser, date, naz, addr], function (result) {
            console.log('Были добавлены новые данные в таблицу auto');
        }, function (tx, error) {
            console.log('Произошла ошибка при добавлении данных в таблицу user', error);
        });
    });
    document.getElementById('id02').style.display = 'block';
    makeSelect();
    console.log("Форма отправлена");
});

delBut.addEventListener('click', (e) => {
    e.preventDefault();
    var sel = document.getElementById('sel');
    if (sel.children.length != 0) {
        var idVal = document.getElementById('sel').value;
        for (let i = 0; i < mas.length; i++) {
            if (mas[i].showId == idVal) {
                mas[i].delAuto();
                mas.splice(i, 1);
            }
        }
        makeSelect();
    } else {
        alert('Нет записей!');
    }
})



btn.addEventListener('click', (e) => {
    e.preventDefault();
    const temp = document.getElementById('tal');
    var clone = temp.content.cloneNode(true);
    while (document.getElementById('MT').firstChild) {
        document.getElementById('MT').removeChild(document.getElementById('MT').firstChild);
    }
    let arr = Array.from(newSt);
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        console.log(clone);
        clone.querySelector('tr').appendChild(makeElement("td", "good", arr[i]));
    }
    document.getElementById('MT').appendChild(clone);
    document.getElementById('MT').appendChild(temp);


    for (var i = 0; i < mas.length; i++) {

        let resul = mas[i];
        console.log(resul);
        let TableCard = resul.insert(document.getElementById('MT'));
        console.log(TableCard);
        document.getElementById('MT').appendChild(TableCard);

    }



})