enum FilterDate {
  Asc = 'Asc',
  Desc = 'Desc',
}

type Task = {
  id: string
  title: string
  description: string
  date: string
  prioriti: string
}
type Tasks = Task[]

type Categorie = {
  id: string
  categorie: string
}
type categories = Categorie[]

const baseUrl = 'http://localhost:3000/'

const deleteTask = async (
  taskId: number,
  taskElement: HTMLElement
): Promise<void> => {
  const response = await fetch(`${baseUrl}tasks/${taskId}`, {
    method: 'DELETE',
  })

  if (!!response.ok) return

  taskElement.remove()
  fetchTasks()
  return
}

const fetchTasks = async (categoryId?: string): Promise<Tasks | null> => {
  let url = `${baseUrl}tasks`
  if (categoryId) url += `${categoryId}`

  const response = await fetch(url)
  if (!response.ok) return null

  const res = await response.json()

  const tasksList = document.getElementById('tasksList')
  if (!!!tasksList) return null
  tasksList.innerHTML = ''

  res.forEach((task: Task) => {
    const li = document.createElement('li')

    const title = document.createElement('h3')
    title.textContent = task.title
    li.appendChild(title)

    const date = document.createElement('p')
    date.textContent = `Date: ${task.date}`
    li.appendChild(date)

    const description = document.createElement('p')
    description.textContent = task.description
    li.appendChild(description)

    const priority = document.createElement('p')
    priority.textContent = `Priorité: ${task.prioriti}`
    li.appendChild(priority)

    const editButton = document.createElement('button')
    editButton.textContent = 'Modifier'
    editButton.onclick = () => editTask(task)
    li.appendChild(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Supprimer'
    deleteButton.onclick = () => deleteTask(parseInt(task.id), li)
    li.appendChild(deleteButton)

    tasksList.appendChild(li)
  })
  return res
}

const editTask = (task: Task) => {
  showModalEdit(true, task)
}

const showModalEdit = (show: boolean, task?: Task) => {
  const modal = document.getElementById('editModal')
  if (!!!modal) return null
  const title = document.getElementById('editTitle') as HTMLInputElement
  const description = document.getElementById(
    'editDescription'
  ) as HTMLTextAreaElement
  const date = document.getElementById('editDate') as HTMLInputElement
  const priority = document.getElementById('editPriority') as HTMLSelectElement

  if (show && task) {
    modal.style.display = 'block'
    title.value = task.title
    description.value = task.description
    date.value = task.date
    priority.value = task.prioriti

    document.getElementById('editForm')?.addEventListener('submit', (event) => {
      event.preventDefault()
      const taskUpdated: Task = {
        id: task.id,
        title: title.value,
        description: description.value,
        date: date.value,
        prioriti: priority.value,
      }

      updateTask(task.id, taskUpdated)
    })
  } else {
    modal.style.display = 'none'
  }
}

const updateTask = async (taskId: string, taskData: Task) => {
  const response = await fetch(`${baseUrl}tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (response.ok) {
    showModal('Tâche modifiée avec succès')
    fetchTasks()
  } else {
    showModal('Erreur lors de la modification de la tâche')
  }
}

document
  .getElementById('categoryFilter')
  ?.addEventListener('change', (event) => {
    const selectedCategory = (event.target as HTMLSelectElement).value
    const query = `?prioriti=${selectedCategory}`
    fetchTasks(query)
  })

document.getElementById('dateFilter')?.addEventListener('change', (event) => {
  const selectedCategory = (event.target as HTMLSelectElement).value
  const query = `?_sort=${selectedCategory === FilterDate.Desc && '-'}date`
  fetchTasks(query)
})

document
  .getElementById('searchForm')
  ?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const search = (document.getElementById('search') as HTMLInputElement)
      ?.value
    if (!typeof search || search?.length === 0) return null

    const query = `?title=${search}`
    fetchTasks(query)
  })

const fetchCategories = async (): Promise<categories | null> => {
  const response = await fetch(`${baseUrl}categories`)
  if (!response.ok) return null

  const res = await response.json()

  const categoryFilter = document.getElementById(
    'categoryFilter'
  ) as HTMLSelectElement
  if (!!!categoryFilter) return null
  categoryFilter.innerHTML = ''

  res.forEach((categorie: Categorie) => {
    const option = document.createElement('option')
    option.value = categorie.categorie
    option.textContent = categorie.categorie
    categoryFilter.appendChild(option)
  })

  const categorySelect = document.getElementById(
    'categorySelect'
  ) as HTMLSelectElement
  if (!!!categorySelect) return null
  categorySelect.innerHTML = ''

  res.forEach((categorie: Categorie) => {
    const option = document.createElement('option')
    option.value = categorie.categorie
    option.textContent = categorie.categorie
    categorySelect.appendChild(option)
  })

  return res
}

fetchCategories().then(() => {
  fetchTasks()
})

const checkCategorie = async (categorie: string): Promise<boolean> => {
  const response = await fetch(`${baseUrl}categories?categorie=${categorie}`)
  if (!response.ok) return false

  const res = await response.json()
  return res?.length > 0
}

document
  .getElementById('taskForm')
  ?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const title = (document.getElementById('title') as HTMLInputElement)?.value
    const description = (
      document.getElementById('description') as HTMLTextAreaElement
    )?.value
    const date = (document.getElementById('date') as HTMLInputElement)?.value
    const prioriti = (
      document.getElementById('categorySelect') as HTMLSelectElement
    )?.value

    if (!checkCategorie(prioriti)) {
      showModal('Error dans la categorie')
      return null
    }
    if (!typeof title || !typeof description || !typeof date) {
      showModal('Error dans les champs')
      return null
    }

    const task: Task = {
      id: Math.floor(Math.random() * 100).toString(),
      title,
      description,
      date,
      prioriti,
    }

    const response = await fetch(`${baseUrl}tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      showModal(`Erreur lors de l'ajout de la tâche`)
      return
    }

    showModal('Tâche ajoutée avec succès')
    fetchTasks()
  })

document
  .getElementById('categorieForm')
  ?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const categorie = (document.getElementById('categorie') as HTMLInputElement)
      ?.value
    if (!typeof categorie || categorie?.length === 0) return null

    const task: Categorie = {
      id: Math.floor(Math.random() * 100).toString(),
      categorie,
    }

    const response = await fetch(`${baseUrl}categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      showModal(`Erreur lors de l'ajout de la categorie`)
      return
    }

    showModal('Categorie ajoutée avec succès')
    fetchCategories()
  })

const showModal = (text: string) => {
  const modal = document.getElementById('myModal')
  if (!!!modal) return null
  const modalText = document.getElementById('modalText')
  if (!!!modalText) return null

  modal.style.display = 'block'
  modalText.textContent = text

  setTimeout(function () {
    modal.style.display = 'none'
  }, 3000)
}

document.querySelector('.close')?.addEventListener('click', function() {
    const close = document.getElementById('editModal')
    if (!!!close) return null
    close.style.display = 'none';
})