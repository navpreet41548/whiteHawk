const images = document.getElementsByClassName(
  "NotesSection_notesImage__vI__7"
);
if (images) {
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    element.style.webkitAnimationPlayState = "paused";
  }

  document.addEventListener("scroll", (e) => {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 700;
    if (currentScroll + modifier > documentHeight) {
      for (let i = 0; i < images.length; i++) {
        const element = images[i];
        element.style.webkitAnimationPlayState = "running";
      }
    }
  });
}
