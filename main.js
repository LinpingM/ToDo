function begin()
{
    let form = document.querySelector(".container__add-form")
    form.addEventListener("submit", function(event)
    {
        event.preventDefault()
        let input = document.querySelector(".add-form__input")
        if (input.value)
        {
            createTask()
        }    
    }
    )
}

function createTask()
{
    let li = document.createElement("li")
    let p = document.createElement("p")
    let buttons = document.createElement("div")
    let readyButton = document.createElement("button")
    let deleteButton = document.createElement("button")

    li.append(p)
    li.append(buttons)
    buttons.append(readyButton, deleteButton)

    li.classList.add("tasks-list__item")
    p.classList.add("item__task")
    buttons.classList.add("item__buttons")
    readyButton.classList.add("buttons__button", "ready")
    deleteButton.classList.add("buttons__button", "delete")

    p.textContent = document.querySelector(".add-form__input").value
    document.querySelector(".add-form__input").value = ""
    readyButton.textContent = "Готово"
    deleteButton.textContent = "Удалить"

    readyButton.addEventListener("click", function(event) {complete(event)})
    deleteButton.addEventListener("click", function(event) {deleteTask(event)})

    ul = document.querySelector(".container__tasks-list")
    ul.prepend(li)
}

function complete(event)
{
    let li = event.target.parentNode.parentNode
    let p = li.firstChild

    li.classList.toggle("complete-li")
    p.classList.toggle("complete-p")
}

function deleteTask(event)
{
    if (confirm("Вы уверены?"))
    {
        let li = event.target.parentNode.parentNode
        li.remove()
    }
    
}

begin()