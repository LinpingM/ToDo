function createHeader(header)
{
    let h1 = document.createElement("h1")
    h1.textContent = header
    return h1
}

function createToDoForm()
{
    let form = document.createElement("form")
    let input = document.createElement("input")
    let button = document.createElement("button")

    form.classList.add("container__add-form")
    input.classList.add("add-form__input")
    button.classList.add("add-form__button")

    input.type = "text"
    input.placeholder = "Введите название нового дела"

    button.textContent = "Добавить дело"
    button.type = "submit"
    button.disabled = "true"

    input.addEventListener("keyup", () =>
    {
        button.disabled = input.value.trim() === ""
    })

    form.append(input)
    form.append(button)

    return {
        form,
        input,
        button,
    }
}

function createToDoList()
{
    let ul = document.createElement("ul")
    ul.classList.add("container__tasks-list")
    return ul
}

function createToDoItem(name, done=null)
{
    let item = document.createElement("li")
    let p = document.createElement("p")
    let buttons = document.createElement("div")
    let readyButton = document.createElement("button")
    let deleteButton = document.createElement("button")

    item.classList.add("tasks-list__item", done)
    p.classList.add("item__task")
    buttons.classList.add("item__buttons")
    readyButton.classList.add("buttons__button", "ready")
    deleteButton.classList.add("buttons__button", "delete")

    p.textContent = name
    readyButton.textContent = "Готово"
    deleteButton.textContent = "Удалить"

    item.append(p)
    buttons.append(readyButton, deleteButton)
    item.append(buttons)

    return {
        item,
        name,
        readyButton,
        deleteButton,

    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    //localStorage.clear()
    let container = document.querySelector(".container")

    let header = createHeader("Список дел")
    let form = createToDoForm()
    let list = createToDoList()

    container.append(header)
    container.append(form.form)
    container.append(list)

    form.form.addEventListener("submit", (event) =>
    {
        event.preventDefault()
        if (form.input.value)
        {
            let toDoItem = createToDoItem(form.input.value)
            form.input.value = ""
            form.button.disabled = "true"
            list.prepend(toDoItem.item)

            let localStoragesToDoItems = JSON.parse(localStorage.getItem("toDoItems"))
            localStoragesToDoItems.push({name: toDoItem.name, done: false})
            localStorage.setItem("toDoItems", JSON.stringify(localStoragesToDoItems))

            toDoItem.readyButton.addEventListener("click", (event) =>
            {
                let containsComplete = toDoItem.item.classList.contains("complete-li")
                let localStoragesToDoItems = localStorage.getItem("toDoItems")
                localStoragesToDoItems = localStoragesToDoItems.replace(JSON.stringify({name: toDoItem.name, done: containsComplete}), JSON.stringify({name: toDoItem.name, done: !containsComplete}))
                localStorage.setItem("toDoItems", localStoragesToDoItems)
                
                toDoItem.item.classList.toggle("complete-li")
            })

            toDoItem.deleteButton.addEventListener("click", (event) =>
            {
                let containsComplete = toDoItem.item.classList.contains("complete-li")
                let localStoragesToDoItems = localStorage.getItem("toDoItems")
                if (JSON.parse(localStoragesToDoItems).length === 1)
                {
                    localStoragesToDoItems = localStoragesToDoItems.replace(JSON.stringify({name: toDoItem.name, done: containsComplete}), "")
                } else if (localStoragesToDoItems.startsWith("[" + JSON.stringify({name: toDoItem.name, done: containsComplete})))
                {
                    localStoragesToDoItems = localStoragesToDoItems.replace(JSON.stringify({name: toDoItem.name, done: containsComplete}) + ",", "")
                } else {
                    localStoragesToDoItems = localStoragesToDoItems.replace("," + JSON.stringify({name: toDoItem.name, done: containsComplete}), "")
                }

                localStorage.setItem("toDoItems", localStoragesToDoItems)

                toDoItem.item.remove()
            })
        }
    })

    let localStoragesToDoItems = localStorage.getItem("toDoItems")
    if (localStoragesToDoItems === null)
    {
        localStorage.setItem("toDoItems", "[]")
        localStoragesToDoItems = []
    } else {
        localStoragesToDoItems = JSON.parse(localStoragesToDoItems)
        for (let localStoragesToDoItem of localStoragesToDoItems)
        {
            let done
            if (localStoragesToDoItem.done)
            {
                done = "complete-li"
            }

            let toDoItem = createToDoItem(localStoragesToDoItem.name, done)
            list.prepend(toDoItem.item)

            toDoItem.readyButton.addEventListener("click", (event) =>
            {
                let containsComplete = toDoItem.item.classList.contains("complete-li")
                let localStoragesToDoItems = localStorage.getItem("toDoItems")
                localStoragesToDoItems = localStoragesToDoItems.replace(JSON.stringify({name: toDoItem.name, done: containsComplete}), JSON.stringify({name: toDoItem.name, done: !containsComplete}))
                localStorage.setItem("toDoItems", localStoragesToDoItems)

                toDoItem.item.classList.toggle("complete-li")
            })

            toDoItem.deleteButton.addEventListener("click", (event) =>
            {
                let containsComplete = toDoItem.item.classList.contains("complete-li")
                let localStoragesToDoItems = localStorage.getItem("toDoItems")

                if (JSON.parse(localStoragesToDoItems).length === 1)
                {
                    localStoragesToDoItems = localStoragesToDoItems.replace(JSON.stringify({name: toDoItem.name, done: containsComplete}), "")
                } else if (localStoragesToDoItems.startsWith("[" + JSON.stringify({name: toDoItem.name, done: containsComplete})))
                {
                    localStoragesToDoItems = localStoragesToDoItems.replace(JSON.stringify({name: toDoItem.name, done: containsComplete}) + ",", "")
                } else {
                    localStoragesToDoItems = localStoragesToDoItems.replace("," + JSON.stringify({name: toDoItem.name, done: containsComplete}), "")
                }

                localStorage.setItem("toDoItems", localStoragesToDoItems)

                toDoItem.item.remove()
            })
        }
    }
})