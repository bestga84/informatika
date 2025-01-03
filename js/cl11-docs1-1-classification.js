// Массив всех элементов с их "правильной" категорией
const itemsData = [
    { id: "categ11",  label: "з адміністративних питань",   category: "category-1" },
    { id: "categ12",  label: "з бухгалтерського обліку",   category: "category-1" },
    { id: "categ13", label: "з планування", category: "category-1" },

    { id: "categ21", label: "службові", category: "category-2" },
    { id: "categ22", label: "особисті",  category: "category-2" },

    { id: "categ31", label: "термінові", category: "category-3" },
    { id: "categ32", label: "нетермінові",  category: "category-3" },

    { id: "categ41", label: "секретні", category: "category-4" },
    { id: "categ42", label: "особливо секретні",  category: "category-4" },
    { id: "categ43", label: "для службового використання (за секретністю)", category: "category-4" },
    { id: "categ44", label: "несекретні",  category: "category-4" },

    { id: "categ51", label: "типові", category: "category-5" },
    { id: "categ52", label: "індивідуальні",  category: "category-5" },

    { id: "categ61", label: "паперові", category: "category-6" },
    { id: "categ62", label: "електронні",  category: "category-6" },

    { id: "categ71", label: "тимчасового зберігання (до 10 років)",  category: "category-7" },
    { id: "categ72", label: "довготермінового зберігання (понад 10 років)", category: "category-7" },
    { id: "categ73", label: "постійного зберігання",  category: "category-7" },

    { id: "categ81", label: "вхідні",  category: "category-8" },
    { id: "categ82", label: "вихідні", category: "category-8" },
    { id: "categ83", label: "внутрішні",  category: "category-8" },
    
    { id: "categ91", label: "«акти»",  category: "category-9" },
    { id: "categ92", label: "«інструкції»", category: "category-9" },
    { id: "categ93", label: "«протоколи»",  category: "category-9" },
    { id: "categ94", label: "«накази»",  category: "category-9" },
    { id: "categ95", label: "«звернення»", category: "category-9" },
  ];
  
  // Общее количество элементов
  const totalItems = itemsData.length;
  
  // Текущее количество элементов, стоящих в правильной категории
  let correctCount = 0;
  
  // Функция для перемешивания массива (Fisher–Yates shuffle)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Перемешиваем элементы
  shuffle(itemsData);
  

    // Создаем блоки в случайном порядке в divContainer
    const divContainer = document.getElementById("divContainer");
    itemsData.forEach(item => {
      const div = document.createElement("div");
      div.id = item.id;
      div.textContent = item.label;
      div.className = "draggable-item";
      div.draggable = true;
      div.ondragstart = drag;
      divContainer.appendChild(div);
    });
  
  // Функция, разрешающая сброс элементов
  function allowDrop(event) {
    event.preventDefault();
  }
  
  // Запоминаем, какой элемент начал перетаскиваться
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  // При отпускании элемента в зону
  function drop(event) {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text");
    const draggedItem = document.getElementById(itemId);
    const dropZoneId = event.currentTarget.id; // ID контейнера, куда бросили
  
    // Добавляем элемент в целевую категорию
    event.currentTarget.appendChild(draggedItem);
  
    // Найдем объект с данными по itemId
    const itemData = itemsData.find(item => item.id === itemId);
  
    // Проверим, правильно ли элемент помещён
    if (itemData.category === dropZoneId) {
      // Если до этого блок не был "correct" — увеличим счётчик
      if (!draggedItem.classList.contains("correct")) {
        correctCount++;
      }
      draggedItem.classList.remove("incorrect");
      draggedItem.classList.add("correct");
    } else {
      // Если раньше блок стоял верно, а теперь нет, уменьшим счётчик
      if (draggedItem.classList.contains("correct")) {
        correctCount--;
      }
      draggedItem.classList.remove("correct");
      draggedItem.classList.add("incorrect");
    }
  
    // Если все элементы на своих местах — показываем сообщение
    if (correctCount === totalItems) {
      const messageElem = document.getElementById("message-classification");
      messageElem.style.display = "block"; // Делаем <p> видимым
    }
  }
  



/*
=============================================================================
Массив itemsData содержит 9 элементов: каждому присвоены уникальный id, отображаемый текст (label) и правильная категория (category).
Функция shuffle(array) перемешивает массив по алгоритму Фишера–Йетса, тем самым каждый раз выводя элементы в случайном порядке.
Создание элементов в HTML:
В цикле itemsData.forEach(...) для каждого объекта создаётся <div> с классом draggable-item, в который записывается текст.
Каждый такой элемент добавляется в itemsContainer.
Drag & Drop:
При начале перетаскивания (ondragstart) сохраняется id элемента (event.dataTransfer.setData("text", ...)).
В контейнерах категорий включена поддержка сброса (ondrop="drop(event)" и ondragover="allowDrop(event)").
В drop(event) мы получаем id перетаскиваемого элемента, перемещаем его и проверяем правильность категории.
Подсчёт правильных ответов:
Переменная correctCount увеличивается или уменьшается при каждом движении, в зависимости от того, является ли новое положение элемента правильным или нет.
Если correctCount равен общему количеству элементов (totalItems), значит все стоят правильно, и появляется сообщение «Правильно!».
=============================================================================
*/