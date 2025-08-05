const allBooks = {
  101: "Python Crash Course",
  102: "JavaScript: The Good Parts",
  103: "Clean Code",
  104: "You Don't Know JS",
  105: "Learn Java in One Day",
  106: "HTML & CSS: Design and Build Websites",
  107: "The Pragmatic Programmer",
  108: "C++ Primer",
  109: "Introduction to Algorithms",
  110: "AI for Web Developers"
};


const loginModal = document.getElementById("loginModal");
const issueModal = document.getElementById("issueModal");
const bookListModal = document.getElementById("bookListModal");
const returnModal = document.getElementById("returnModal");
const confirmationModal = document.getElementById("confirmationModal");
const loginLink = document.getElementById("loginLink");
const viewBooks = document.getElementById("viewBooks");
const loginBtn = document.getElementById("loginBtn");
const issueBookBtn = document.getElementById("issueBookBtn");
const calculateFineBtn = document.getElementById("calculateFineBtn");
const confirmOkBtn = document.getElementById("confirmOkBtn");
const closeButtons = document.getElementsByClassName("close");


loginLink.addEventListener("click", function(e) {
  e.preventDefault();
  loginModal.style.display = "block";
});

viewBooks.addEventListener("click", function(e) {
  e.preventDefault();
  showBookList();
  bookListModal.style.display = "block";
});

for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function() {
    loginModal.style.display = "none";
    issueModal.style.display = "none";
    bookListModal.style.display = "none";
    returnModal.style.display = "none";
    confirmationModal.style.display = "none";
  });
}


window.addEventListener("click", function(event) {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === issueModal) {
    issueModal.style.display = "none";
  }
  if (event.target === bookListModal) {
    bookListModal.style.display = "none";
  }
  if (event.target === returnModal) {
    returnModal.style.display = "none";
  }
  if (event.target === confirmationModal) {
    confirmationModal.style.display = "none";
  }
});


loginBtn.addEventListener("click", function() {
  const cardId = document.getElementById("cardId").value;
  const password = document.getElementById("password").value;
  
  if (cardId && password) {
    alert("Login Successful!");
    loginModal.style.display = "none";
  } else {
    alert("Please enter both Card ID and Password");
  }
});


const issueButtons = document.querySelectorAll(".issue-btn");
issueButtons.forEach(button => {
  button.addEventListener("click", function() {
    const bookId = this.getAttribute("data-id");
    const bookName = allBooks[bookId];
    
    document.getElementById("bookInfo").innerHTML = `
      <p><strong>Book ID:</strong> ${bookId}</p>
      <p><strong>Book Name:</strong> ${bookName}</p>
    `;
    
  
    document.getElementById("issueBookBtn").setAttribute("data-book-id", bookId);
    
    issueModal.style.display = "block";
  });
});


issueBookBtn.addEventListener("click", function() {
  const bookId = this.getAttribute("data-book-id");
  const bookName = allBooks[bookId];
  const studentName = document.getElementById("studentName").value;
  const department = document.getElementById("department").value;
  const branch = document.getElementById("branch").value;
  const libraryId = document.getElementById("libraryId").value;
  
  if (studentName && department && branch && libraryId) {

    document.getElementById("confirmationDetails").innerHTML = `
      <p><strong>Book Issued:</strong> ${bookName} (ID: ${bookId})</p>
      <p><strong>Issued To:</strong> ${studentName}</p>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>Library ID:</strong> ${libraryId}</p>
      <p><strong>Due Date:</strong> ${getDueDate(10)}</p>
      <p>Please return the book on or before the due date to avoid fines.</p>
    `;
    
    issueModal.style.display = "none";
    confirmationModal.style.display = "block";
    
  
    document.getElementById("studentName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("libraryId").value = "";
  } else {
    alert("Please fill all student details");
  }
});


confirmOkBtn.addEventListener("click", function() {
  confirmationModal.style.display = "none";
});


calculateFineBtn.addEventListener("click", function() {
  const bookId = this.getAttribute("data-book-id");
  const bookName = allBooks[bookId];
  const returnDays = parseInt(document.getElementById("returnDays").value);
  
  if (isNaN(returnDays)) {
    alert("Please enter a valid number of days");
    return;
  }
  
  const allowedDays = 10;
  let message = "";
  
  if (returnDays > allowedDays) {
    const daysLate = returnDays - allowedDays;
    const fine = daysLate * 5;
    message = `
      You returned the book ${daysLate} days late.
      Fine to be paid: ₹${fine}
    `;
  } else {
    message = "No fine. Thank you for returning on time!";
  }
  
  document.getElementById("fineResult").innerHTML = `
    <div class="confirmation">
      <p>${message}</p>
      <p>Thank you for using the Library System!</p>
    </div>
  `;
});


function getDueDate(days) {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + days);
  return dueDate.toLocaleDateString();
}

function showBookList() {
  const bookListElement = document.getElementById("bookList");
  bookListElement.innerHTML = "";
  
  for (const [id, name] of Object.entries(allBooks)) {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
      <p><strong>Book ID:</strong> ${id}</p>
      <p><strong>Book Name:</strong> ${name}</p>
      <hr>
    `;
    bookListElement.appendChild(bookDiv);
  }
}
