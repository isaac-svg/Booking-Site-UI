const movieSelect = document.querySelector("#movie");
const container = document.querySelector(".container ");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".number");
const totalPrice = document.querySelector(".price ");
populateUI();
let moviePrice = movieSelect.value;

// function to update the count of seats and total price
function updateCount() {
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  let selectedSeatCount = selectedSeats.length;
  let seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("seatIndex", JSON.stringify(seatIndex));
  console.log(seatIndex);
  count.innerText = selectedSeatCount;
  totalPrice.innerText = selectedSeatCount * moviePrice;
}
// function to store movie data

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("movieIndex", JSON.stringify(movieIndex));
  localStorage.setItem("moviePrice", JSON.stringify(moviePrice));
  updateCount();
}
// function to change movie select option that is the price
movieSelect.addEventListener("change", (e) => {
  moviePrice = e.target.value;
  console.log(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCount();
});
// function call to local storage to populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
      const selectedMovieIndex = JSON.parse(localStorage.getItem("movieIndex"));
      if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
      }
    });
  }
}
//  adding event listerners to all seats

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateCount();
});
updateCount();
/*
this function also adds event listeners to the seats

seats.forEach((seat) => {
  if (!seat.classList.contains("occupied")) {
    seat.addEventListener("click", (e) => {
      e.target.classList.toggle("selected");
    });
  }
}); */
