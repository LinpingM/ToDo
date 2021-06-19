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
        button.disabled = input.value === ""
    })

    form.append(input)
    form.append(button)

    return {
        form,
        input,
    }
}

function createToDoList()
{
    let ul = document.createElement("ul")
    ul.classList.add("container__tasks-list")
    return ul
}

function createToDoItem(name)
{
    let item = document.createElement("li")
    let p = document.createElement("p")
    let buttons = document.createElement("div")
    let readyButton = document.createElement("button")
    let deleteButton = document.createElement("button")

    item.classList.add("tasks-list__item")
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

    readyButton.addEventListener("click", (event) =>
    {
        item.classList.toggle("complete-li")
    })

    deleteButton.addEventListener("click", (event) =>
    {
        item.remove()
    })
    
    return item
}

document.addEventListener("DOMContentLoaded", () =>
{
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

        let item = createToDoItem(form.input.value)
        form.input.value = ""
        list.prepend(item)
    })
})