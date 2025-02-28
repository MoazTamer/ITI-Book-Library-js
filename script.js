    let numOfBooks = 0;
    let bookCounter = 0;
    let books = [];

    // Book and Author Classes

    function Author(name, email) {
        this.name = name;
        this.email = email;
    }

    function Book(name, price, author) {
        this.name = name;
        this.price = price;
        this.author = author;
    }

    // Handle Submit for Number of Books
    function handleSubmit() {
        const input = document.getElementById("numBooks");
        const errorMessage = document.getElementById("error-message");
        const value = parseInt(input.value);

        if (!value || value < 1 || value > 100 || isNaN(value)) {
            input.style.borderColor = "#ef4444";
            errorMessage.textContent = "Please enter a number between 1 and 100.";
            errorMessage.style.display = "inline";
            return;
        }

        errorMessage.style.display = "none";
        toggleContainers("no-container", "book-container");
        numOfBooks = value;
        input.value='';
        document.getElementById("next").textContent = `Add Book ${bookCounter + 1}`;
    }

    // Function to Toggle Containers
    function toggleContainers(hideClass, showClass) {
        const hideElements = document.getElementsByClassName(hideClass);
        const showElements = document.getElementsByClassName(showClass);

        for (let i = 0; i < hideElements.length; i++) {
            hideElements[i].style.display = "none";
        }

        for (let i = 0; i < showElements.length; i++) {
            showElements[i].style.display = "flex";
        }
    }

    // Validate Input Fields
    function validateField(inputId, errorId, regex, emptyMessage, invalidMessage) {
        const value = document.getElementById(inputId).value.trim();
        const errorMessage = document.getElementById(errorId);

        if (!value) {
            errorMessage.textContent = emptyMessage;
            errorMessage.style.display = "inline";
            return false;
        } else if (!regex.test(value)) {
            errorMessage.textContent = invalidMessage;
            errorMessage.style.display = "inline";
            return false;
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            return true;
        }
    }

    // Event Listeners for Input Validation
    document.getElementById("bookName").addEventListener("input", function () {
        validateField(
            "bookName",
            "nameError",
            /^[A-Za-z][A-Za-z0-9\s.,'\-!?]{2,30}$/,
            "Please enter book name",
            "Please enter a valid name"
        );
    });

    document.getElementById("bookPrice").addEventListener("input", function () {
        validateField(
            "bookPrice",
            "priceError",
            /^[1-9][0-9]{0,3}$/,
            "Please enter book price",
            "Please enter a valid price (1-9999)"
        );
    });

    document.getElementById("authorName").addEventListener("input", function () {
        validateField(
            "authorName",
            "authorNameError",
            /^[A-Za-z\s'\-]{3,30}$/,
            "Please enter author name",
            "Please enter a valid name"
        );
    });

    document.getElementById("authorEmail").addEventListener("input", function () {
        validateField(
            "authorEmail",
            "authorEmailError",
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter author email",
            "Please enter a valid email"
        );
    });

    // Add Book
    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();

        const isBookNameValid = validateField(
            "bookName",
            "nameError",
            /^[A-Za-z][A-Za-z0-9\s.,'\-!?]{3,30}$/,
            "Please enter book name",
            "Please enter a valid name"
        );

        const isBookPriceValid = validateField(
            "bookPrice",
            "priceError",
            /^[1-9][0-9]{0,3}$/,
            "Please enter book price",
            "Please enter a valid price"
        );

        const isAuthorNameValid = validateField(
            "authorName",
            "authorNameError",
            /^[A-Za-z\s'\-]{3,30}$/,
            "Please enter author name",
            "Please enter a valid name"
        );

        const isAuthorEmailValid = validateField(
            "authorEmail",
            "authorEmailError",
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter author email",
            "Please enter a valid email"
        );

        if (
            isBookNameValid &&
            isBookPriceValid &&
            isAuthorNameValid &&
            isAuthorEmailValid
        ) {
            const authorName = document.getElementById("authorName").value.trim();
            const authorEmail = document.getElementById("authorEmail").value.trim();
            const author = new Author(authorName, authorEmail);

            const bookName = document.getElementById("bookName").value.trim();
            const bookPrice = document.getElementById("bookPrice").value.trim();
            const book = new Book(bookName, bookPrice, author);

            books.push(book);
            bookCounter++;

            document.getElementById("bookName").value = "";
            document.getElementById("bookPrice").value = "";
            document.getElementById("authorName").value = "";
            document.getElementById("authorEmail").value = "";

            document.getElementById("next").textContent = `Add Book ${bookCounter + 1}`;

            if (bookCounter === numOfBooks) {
                toggleContainers("book-container", "table-container");
                renderTable();
            }
        }
    });

    // Render Table
    function renderTable() {
        const tbody = document.getElementById("body");
        tbody.innerHTML = "";

        books.forEach((book, index) => {
            const row = document.createElement("tr");

            const bookNameCell = document.createElement("td");
            bookNameCell.textContent = book.name;
            row.appendChild(bookNameCell);

            const bookPriceCell = document.createElement("td");
            bookPriceCell.textContent = book.price;
            row.appendChild(bookPriceCell);

            const authorNameCell = document.createElement("td");
            authorNameCell.textContent = book.author.name;
            row.appendChild(authorNameCell);

            const authorEmailCell = document.createElement("td");
            const emailLink = document.createElement("a");
            emailLink.href = `mailto:${book.author.email}`;
            emailLink.textContent = book.author.email;
            authorEmailCell.appendChild(emailLink);
            row.appendChild(authorEmailCell);

            const actionsCell = document.createElement("td");
            const actionButtons = document.createElement("div");
            actionButtons.className = "action-buttons";

            const editButton = document.createElement("button");
            editButton.className = "btn-edit";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editBook(index, row));
            actionButtons.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn-delete";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteBook(index));
            actionButtons.appendChild(deleteButton);

            actionsCell.appendChild(actionButtons);
            row.appendChild(actionsCell);

            tbody.appendChild(row);
        });

        const check = document.getElementsByClassName("table-container")[0];
        if (check.style.display != "none") {
            const m = document.getElementById("particles-js");
            if (m.classList.contains("hidden")) {
                m.classList.remove("hidden");
            }
        }
    }
    // Edit Book
    function editBook(index, row) {
        const book = books[index];

        const bookNameCell = row.cells[0];
        const bookPriceCell = row.cells[1];
        const authorNameCell = row.cells[2];
        const authorEmailCell = row.cells[3];

        const originalName = bookNameCell.textContent;
        const originalPrice = bookPriceCell.textContent;
        const originalAuthorName = authorNameCell.textContent;
        const originalAuthorEmail = authorEmailCell.querySelector("a").textContent;

        bookNameCell.innerHTML = `<input type="text" id="editBookName" value="${originalName}" />`;
        bookPriceCell.innerHTML = `<input type="text" id="editBookPrice" value="${originalPrice}" />`;
        authorNameCell.innerHTML = `<input type="text" id="editAuthorName" value="${originalAuthorName}" />`;
        authorEmailCell.innerHTML = `<input type="text" id="editAuthorEmail" value="${originalAuthorEmail}" />`;

        const editButton = row.querySelector(".btn-edit");
        editButton.textContent = "Save";
        editButton.removeEventListener("click", () => editBook(index, row));
        editButton.addEventListener("click", () => saveBook(index, row));
    }

    // Save Book
    function saveBook(index, row) {
        const book = books[index];

        const newName = row.cells[0].querySelector("input").value.trim();
        const newPrice = row.cells[1].querySelector("input").value.trim();
        const newAuthorName = row.cells[2].querySelector("input").value.trim();
        const newAuthorEmail = row.cells[3].querySelector("input").value.trim();

        const isBookNameValid = /^[A-Za-z][A-Za-z0-9\s.,'\-!?]{3,30}$/.test(newName);
        const isBookPriceValid = /^[1-9][0-9]{0,3}$/.test(newPrice);
        const isAuthorNameValid = /^[A-Za-z\s'\-]{3,30}$/.test(newAuthorName);
        const isAuthorEmailValid =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(newAuthorEmail);

        if (
            isBookNameValid &&
            isBookPriceValid &&
            isAuthorNameValid &&
            isAuthorEmailValid
        ) {
            book.name = newName;
            book.price = newPrice;
            book.author.name = newAuthorName;
            book.author.email = newAuthorEmail;

            renderTable();
        } else {
            renderTable();
        }
    }

    // Delete Book
    async function deleteBook(index) {
        const confirmed = await showConfirm(
            "Are you sure you want to delete this book?"
        );

        if (confirmed) {
            books.splice(index, 1);
            renderTable();
        }

        if (books.length < 1) {
            toggleContainers("table-container", "no-container");
            const m = document.getElementById("particles-js");
            m.classList.add("hidden");
        }
    }

    async function showConfirm(str) {
        const result = await Swal.fire({
            title: str,
            text: "You can't undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "Cancel",
        });
        return result.isConfirmed;
    }
