const todofrm = document.querySelector("#todo-form"); // Sumbit Yapılacak Form
const alertcontainer = document.querySelector("#alert-container"); // Uyarı Penceresinin kapsayıcı divi
const todoval = document.querySelector("#todo-value"); // todo degeri alacagımız input
const filtertd = document.querySelector("#filter-todo"); // filtreleme yapacagımız input
const listcontact = document.querySelector("#list-contact"); // liste elemanlarını kapsayan ul etiketi
const target = document.querySelector("#target-contact");
const btn = document.querySelector("#btn-task");
const btnreset = document.querySelector("#btn-reset");

// querySelector Her Zaman esnek bir şeçim saglar
todofrm.addEventListener("submit", todovalue); // sumbit olayı
todofrm.addEventListener("reset", todoreset); // reset olayı
target.addEventListener("click", selectdiv); // filter olayı
filtertd.addEventListener("keyup", filtertodo);
todoval.addEventListener("keyup", disablebtn);

function todovalue(e) {
  e.preventDefault(); // sayfanın yenilenmesini engelleyen method
  const todovalue = todoval.value.trim(); // inputa bulunan deger sagındaki ve solundaki boşlukları kaldırarak alır
  if (todovalue == "" || todovalue == null) {
    alertshow("warning", "Boş Bir Todo Degeri Girdiniz");
  } else {
    newtodo(todovalue);
    alertshow("success", "Todo Elemanı Eklendi");
  }
}

function newtodo(todonew) {
  // tek bir degerlik local stroge verisi
  localStorage.setItem("Todoİtem", todonew);

  const li = document.createElement("li");
  li.className = `list-group-item d-flex bg-light justify-content-between mb-3 rounded border`; // template strings kullanımı
  li.textContent = todonew;

  const a = document.createElement("a");
  a.href = "#";

  const i = document.createElement("i");
  i.className = `bi bi-trash`;

  a.appendChild(i);
  li.appendChild(a);
  listcontact.appendChild(li);

  btnreset.disabled = false;
  filtertd.disabled=false;

  setTimeout(function () {
    todoval.value = "";
  }, 100);

  // bu yöntem isterseniz kullanabilirsiniz

  // const list = document.querySelectorAll(".list-group-item");
  // list.forEach(function (colorlist) {
  //   const colorrandom = ["orange", "darkcyan", "green", "gray", "red", "grey"];
  //   const randomcolor = Math.floor(Math.random() * 6); //  0 ve 5 arası rastegele indeks degeri dönderir
  //   const selectcolor = colorrandom[randomcolor]; // random colorda bulunan degere karsılık gelen rengi şeçer
  //   colorlist.style.color = `${selectcolor}`; // şeçilen rengi yazı rengi ile degiştirir
  // });
}

function alertshow(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type} mt-3`;
  div.textContent = message;
  // append Child işlemi mutlaka her zaman oluşturma ve diger işlemlerden sonra yapılır
  alertcontainer.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 1500);
}

function todoreset() {
  const listtodo = document.querySelectorAll(".list-group-item");
  if (listtodo.length > 0) {
    // ilk yol
    // listtodo.forEach(function (list) {
    //   list.remove();
    // });

    // ikinci yol
    for (let i = 0; i < listtodo.length; i++) {
      listtodo[i].remove();
    }
    alertshow("success", "Tüm Todolar Temizlendi");
  } else {
    alertshow("warning", "Ekranda Herhangi Bir Todo Bulunmuyor");
  }
}

function selectdiv(e) {
  if (e.target.className == "bi bi-trash") {
    // eger tıklanan eleman bu class sahipse çalış
    const litodo = e.target.parentElement.parentElement; // i etiketinin evebeyni a onunda üstü onunda üstü li dir ve li elemanı yakalar remove ile kaldirır
    litodo.remove();
  }
}

function filtertodo(e) {
  const valuefltr = e.target.value.toLowerCase().trim();

  const todolist = document.querySelectorAll(".list-group-item");

  if (todolist.length > 0) {
    todolist.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(valuefltr)) {
        todo.setAttribute("style", "display: block");
      } else {
        todo.setAttribute("style", "display: none !important");
      }
    });
  } else {
    alertshow("warning", "Filtreleme İçin Lütfen Todo Giriniz");
  }
}

function disablebtn() {
  const val = todoval.value.trim();
  if (val == null || val == "") {
  } else if (val != null || val != "") {
    btn.disabled = false;
  }
}

