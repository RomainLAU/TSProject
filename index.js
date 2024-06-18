var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e, _f;
var _this = this;
var FilterDate;
(function (FilterDate) {
    FilterDate["Asc"] = "Asc";
    FilterDate["Desc"] = "Desc";
})(FilterDate || (FilterDate = {}));
var baseUrl = 'http://localhost:3000/';
var deleteTask = function (taskId, taskElement) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(baseUrl, "tasks/").concat(taskId), {
                    method: 'DELETE',
                })];
            case 1:
                response = _a.sent();
                if (!!response.ok)
                    return [2 /*return*/];
                taskElement.remove();
                fetchTasks();
                return [2 /*return*/];
        }
    });
}); };
var fetchTasks = function (categoryId) { return __awaiter(_this, void 0, void 0, function () {
    var url, response, res, tasksList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(baseUrl, "tasks");
                if (categoryId)
                    url += "".concat(categoryId);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    return [2 /*return*/, null];
                return [4 /*yield*/, response.json()];
            case 2:
                res = _a.sent();
                tasksList = document.getElementById('tasksList');
                if (!!!tasksList)
                    return [2 /*return*/, null];
                tasksList.innerHTML = '';
                res.forEach(function (task) {
                    var li = document.createElement('li');
                    var title = document.createElement('h3');
                    title.textContent = task.title;
                    li.appendChild(title);
                    var date = document.createElement('p');
                    date.textContent = "Date: ".concat(task.date);
                    li.appendChild(date);
                    var description = document.createElement('p');
                    description.textContent = task.description;
                    li.appendChild(description);
                    var priority = document.createElement('p');
                    priority.textContent = "Priorit\u00E9: ".concat(task.prioriti);
                    li.appendChild(priority);
                    var editButton = document.createElement('button');
                    editButton.textContent = 'Modifier';
                    editButton.onclick = function () { return editTask(task); };
                    li.appendChild(editButton);
                    var deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Supprimer';
                    deleteButton.onclick = function () { return deleteTask(parseInt(task.id), li); };
                    li.appendChild(deleteButton);
                    tasksList.appendChild(li);
                });
                return [2 /*return*/, res];
        }
    });
}); };
var editTask = function (task) {
    showModalEdit(true, task);
};
var showModalEdit = function (show, task) {
    var _a;
    var modal = document.getElementById('editModal');
    if (!!!modal)
        return null;
    var title = document.getElementById('editTitle');
    var description = document.getElementById('editDescription');
    var date = document.getElementById('editDate');
    var priority = document.getElementById('editPriority');
    if (show && task) {
        modal.style.display = 'block';
        title.value = task.title;
        description.value = task.description;
        date.value = task.date;
        priority.value = task.prioriti;
        (_a = document.getElementById('editForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
            event.preventDefault();
            var taskUpdated = {
                id: task.id,
                title: title.value,
                description: description.value,
                date: date.value,
                prioriti: priority.value,
            };
            updateTask(task.id, taskUpdated);
        });
    }
    else {
        modal.style.display = 'none';
    }
};
var updateTask = function (taskId, taskData) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(baseUrl, "tasks/").concat(taskId), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                })];
            case 1:
                response = _a.sent();
                if (response.ok) {
                    showModal('Tâche modifiée avec succès');
                    fetchTasks();
                }
                else {
                    showModal('Erreur lors de la modification de la tâche');
                }
                return [2 /*return*/];
        }
    });
}); };
(_a = document
    .getElementById('categoryFilter')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) {
    var selectedCategory = event.target.value;
    var query = "?prioriti=".concat(selectedCategory);
    fetchTasks(query);
});
(_b = document.getElementById('dateFilter')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
    var selectedCategory = event.target.value;
    var query = "?_sort=".concat(selectedCategory === FilterDate.Desc && '-', "date");
    fetchTasks(query);
});
(_c = document
    .getElementById('searchForm')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var search, query;
    var _a;
    return __generator(this, function (_b) {
        event.preventDefault();
        search = (_a = document.getElementById('search')) === null || _a === void 0 ? void 0 : _a.value;
        if (!typeof search || (search === null || search === void 0 ? void 0 : search.length) === 0)
            return [2 /*return*/, null];
        query = "?title=".concat(search);
        fetchTasks(query);
        return [2 /*return*/];
    });
}); });
var fetchCategories = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, res, categoryFilter, categorySelect;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(baseUrl, "categories"))];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    return [2 /*return*/, null];
                return [4 /*yield*/, response.json()];
            case 2:
                res = _a.sent();
                categoryFilter = document.getElementById('categoryFilter');
                if (!!!categoryFilter)
                    return [2 /*return*/, null];
                categoryFilter.innerHTML = '';
                res.forEach(function (categorie) {
                    var option = document.createElement('option');
                    option.value = categorie.categorie;
                    option.textContent = categorie.categorie;
                    categoryFilter.appendChild(option);
                });
                categorySelect = document.getElementById('categorySelect');
                if (!!!categorySelect)
                    return [2 /*return*/, null];
                categorySelect.innerHTML = '';
                res.forEach(function (categorie) {
                    var option = document.createElement('option');
                    option.value = categorie.categorie;
                    option.textContent = categorie.categorie;
                    categorySelect.appendChild(option);
                });
                return [2 /*return*/, res];
        }
    });
}); };
fetchCategories().then(function () {
    fetchTasks();
});
var checkCategorie = function (categorie) { return __awaiter(_this, void 0, void 0, function () {
    var response, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(baseUrl, "categories?categorie=").concat(categorie))];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    return [2 /*return*/, false];
                return [4 /*yield*/, response.json()];
            case 2:
                res = _a.sent();
                return [2 /*return*/, (res === null || res === void 0 ? void 0 : res.length) > 0];
        }
    });
}); };
(_d = document
    .getElementById('taskForm')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var title, description, date, prioriti, task, response;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                event.preventDefault();
                title = (_a = document.getElementById('title')) === null || _a === void 0 ? void 0 : _a.value;
                description = (_b = document.getElementById('description')) === null || _b === void 0 ? void 0 : _b.value;
                date = (_c = document.getElementById('date')) === null || _c === void 0 ? void 0 : _c.value;
                prioriti = (_d = document.getElementById('categorySelect')) === null || _d === void 0 ? void 0 : _d.value;
                if (!checkCategorie(prioriti)) {
                    showModal('Error dans la categorie');
                    return [2 /*return*/, null];
                }
                if (!typeof title || !typeof description || !typeof date) {
                    showModal('Error dans les champs');
                    return [2 /*return*/, null];
                }
                task = {
                    id: Math.floor(Math.random() * 100).toString(),
                    title: title,
                    description: description,
                    date: date,
                    prioriti: prioriti,
                };
                return [4 /*yield*/, fetch("".concat(baseUrl, "tasks"), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    })];
            case 1:
                response = _e.sent();
                if (!response.ok) {
                    showModal("Erreur lors de l'ajout de la t\u00E2che");
                    return [2 /*return*/];
                }
                showModal('Tâche ajoutée avec succès');
                fetchTasks();
                return [2 /*return*/];
        }
    });
}); });
(_e = document
    .getElementById('categorieForm')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var categorie, task, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                event.preventDefault();
                categorie = (_a = document.getElementById('categorie')) === null || _a === void 0 ? void 0 : _a.value;
                if (!typeof categorie || (categorie === null || categorie === void 0 ? void 0 : categorie.length) === 0)
                    return [2 /*return*/, null];
                task = {
                    id: Math.floor(Math.random() * 100).toString(),
                    categorie: categorie,
                };
                return [4 /*yield*/, fetch("".concat(baseUrl, "categories"), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    })];
            case 1:
                response = _b.sent();
                if (!response.ok) {
                    showModal("Erreur lors de l'ajout de la categorie");
                    return [2 /*return*/];
                }
                showModal('Categorie ajoutée avec succès');
                fetchCategories();
                return [2 /*return*/];
        }
    });
}); });
var showModal = function (text) {
    var modal = document.getElementById('myModal');
    if (!!!modal)
        return null;
    var modalText = document.getElementById('modalText');
    if (!!!modalText)
        return null;
    modal.style.display = 'block';
    modalText.textContent = text;
    setTimeout(function () {
        modal.style.display = 'none';
    }, 3000);
};
(_f = document.querySelector('.close')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
    var close = document.getElementById('editModal');
    if (!!!close)
        return null;
    close.style.display = 'none';
});
