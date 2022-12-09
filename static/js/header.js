const userIcon = document.querySelector('[data-name="userIcon"]');

if (userIcon) {
  userIcon.addEventListener("click", () => {
    console.log("Clicked");
  });
}
