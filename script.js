const Modal = {
  Modalspan: document.querySelector('.modal-span'),
  span:document.querySelector('.span'),
  modal(){
    document
            .querySelector(".modal-overlay")
            .classList
            .toggle("active")
  },
  addSpan(error){
    Modal.span.innerHTML = error.message
    Modal.Modalspan.classList.toggle('active')
    Modal.modal()
  },
  removeSpan(){
    Modal.Modalspan.classList.toggle('active')
    Modal.modal()
  }
}

const Alerts = {
  preparing(){
   alert("Meu Github está sendo preparado ;)")
  }
}

const Tasks = {
  all: [],
  
  add(value){
    Tasks.all.push(value)
    // console.log(Tasks.all)
    App.reload()
  },

  remove(index){
    Tasks.all.splice(index, 1)
    // console.log(Tasks.all)
    // DOM.removeTask()
    App.reload()
  },

  VerifyArray(){
    if(Tasks.all.length === 0){
      // console.log("Zerado")
      const initialMessage = document.createElement('li')
      initialMessage.setAttribute('class','initialMessage')
      initialMessage.innerHTML = 'Adicione uma tarefa'
      DOM.list.appendChild(initialMessage)
      DOM.cardBody.appendChild(DOM.list)
    }
  },
}

const Theme = {
  theme: document.querySelector('#Theme'),
  toggleButton: document.querySelector('#toggleTheme'),
  newTaskButton: document.querySelector('#newTask'),
  logo: document.querySelector('#logo'),
  imgWarning: document.querySelector('.warning'),

  darkTheme(){
    Theme.theme.href = "darkStyle.css"
    Theme.toggleButton.src = "./assets/toggle_on_white_24dp.svg"
    Theme.newTaskButton.src = "./assets/note_add_white_24dp.svg"
    Theme.logo.src = "./assets/task_white_24dp.svg"
    Theme.imgWarning.src = "./assets/error_outline_white_24dp.svg"
    Theme.removeTaskButtonTheme()
    App.reload()
  },

  lightTheme(){
    Theme.theme.href = "style.css"
    Theme.toggleButton.src ="./assets/toggle_off_black_24dp.svg"
    Theme.newTaskButton.src ="./assets/note_add_black_24dp.svg"
    Theme.logo.src ="./assets/task_black_24dp.svg"
    Theme.imgWarning.src = "/assets/error_outline_black_24dp.svg"
    Theme.removeTaskButtonTheme()
    App.reload()
  },

  removeTaskButtonTheme(){
    let href = Theme.theme.getAttribute("href")
    if(href=="style.css"){
      return "./assets/cancel_black_24dp.svg"
    }else{
      return "./assets/cancel_white_24dp.svg"
    }    
  },
  
  alterTheme(){
    let href = Theme.theme.getAttribute("href")
    
    if(href=="style.css"){
      return Theme.darkTheme()
    }else{
      return Theme.lightTheme()
    }
  },
}

const DOM = {
  cardBody: document.getElementById("cardBody"),
  list: document.getElementById("list"),
  form: document.querySelector(".modal-overlay"),

  addTask(task,index){
    const li = document.createElement("li")
    li.innerHTML = DOM.innerHTMLTask(task,index)
    // console.log(li)
    li.dataset.index = index
    DOM.list.appendChild(li)
    DOM.cardBody.appendChild(DOM.list)
  },

  removeTask(){
    // DOM.list.removeChild(DOM.addTask.li)
  },

  innerHTMLTask(task, index){
    const html = `
      <li class="itemList">
        ${task} <img src="${Theme.removeTaskButtonTheme()}" onclick = "Tasks.remove(${index})" alt="" class="removeTaskButton">
      </li>
      `
     return html
  },

  clearTasks(){
    DOM.list.innerHTML = ""
  },

  clearInput(){
    Input.input.value = ''
  },
}

const Input = {
  input: document.getElementById("tarefa"),
  // date: document.getElementById('date'),
  getValue(){
    return value = Input.input.value
  },

  formatValue(){
    let value = Input.getValue()
    value = value.toUpperCase()



    return value
  },

  validateData(){
    const value = Input.formatValue()

    if(value.trim() === ""){
      DOM.clearInput()
      throw new Error("Por favor, insira uma tarefa.")
    }
    
    for(tasks of Tasks.all){
      if(tasks.trim() === value){
        DOM.clearInput()
        throw new Error("Tarefa já adicionada!")
      }
    }
  },

  saveTasks(value){
    Tasks.add(value)
  },

  submit(event){
    event.preventDefault()
    try {
      Input.getValue()
      Input.validateData()
      const task = Input.formatValue()
      Input.saveTasks(task)
      DOM.clearInput()
      App.reload()
      Modal.modal()
    } catch (error) {
      Modal.addSpan(error)
    }
  }

}

const App = {
  init(){
    Theme.removeTaskButtonTheme()
    Tasks.all.forEach(DOM.addTask)
    Tasks.VerifyArray()
  },

  reload(){
    DOM.clearTasks()
    DOM.cardBody.innerHTML=''
    App.init()
  }
}
App.init()